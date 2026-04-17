---
name: 3d-asset-generator
description: Use when preparing the scroll-driven hero video for SKILL3D, when the user mentions nano banana 2 / seedance, when a scroll-stop site needs a source asset, or when a video exists but fails SKILL3D's input contract (non-white first frame, wrong duration, weak focal subject)
---

# 3D Asset Generator — Nano Banana 2 + Seedance Pipeline

Produces the **source video** that `SKILL3D.md` consumes. The entire scroll-stop website hinges on this asset being built to spec.

## Input Contract (what SKILL3D needs)

| Requirement | Spec | Why |
|---|---|---|
| Container | `.mp4` (H.264) preferred; `.mov` / `.webm` acceptable | FFmpeg frame extraction |
| Duration | **3–6 s optimal**, hard cap 10 s | Scroll maps to 60–150 frames; longer = choppy |
| Resolution | 1920×1080 (landscape) or 1080×1920 (portrait) | Scales to `-vf scale=1920:-2` |
| Framerate | 24–30 fps source | FFmpeg downsamples to a target fps for 60–150 frames |
| **First frame** | **Pure white background, subject centred** | Hard requirement — loader and hero blend white→dark |
| Focal subject | One clear transformation arc (assemble, unfold, open, reveal) | Scroll scrubs a single beat, not a montage |
| Camera | Static or slow dolly; no cuts | Cuts break the scroll scrub illusion |
| Last frame | Fully composed reveal (product, scene, text overlay optional) | Bottom of scroll = the payoff |

If a supplied video fails any row above, **regenerate — do not ship**.

## The Two-Model Pipeline

```
      ┌─────────────────────┐          ┌────────────────────────┐
      │ Nano Banana 2       │          │ Seedance                │
      │ (stills)            │──────────▶│ (image-to-video motion) │
      └─────────────────────┘          └──────────┬──────────────┘
           first frame + last frame                │
                                                   ▼
                                            hero.mp4 (3–6s)
                                                   │
                                                   ▼
                                           SKILL3D ingests
```

1. **Nano Banana 2** generates two stills: the `FIRST_FRAME` (white bg, subject centred) and the `LAST_FRAME` (final composed reveal).
2. **Seedance** interpolates motion from `FIRST_FRAME → LAST_FRAME` using image-to-video mode.
3. Export `.mp4`, verify against the input contract, hand to SKILL3D.

## Nano Banana 2 — Still Prompts

**Template (first frame — white background, centred):**
```
{subject}, centred composition, clean pure white seamless background, 
studio product photography lighting, soft diffused shadow directly beneath subject,
no other objects, no text, no watermark, ultra-sharp focus, 
photorealistic, shot on 50mm at f/8, 1920×1080 landscape, 
colour palette: {brand accent} + white + neutral greys only.
```

**Template (last frame — composed reveal):**
```
{scene}, {subject} in context, {environment description with lighting},
cinematic composition, rule of thirds, natural golden-hour lighting,
photorealistic, 1920×1080, colour palette skewed to {brand accent}.
```

**Removals-domain archetypes (ready to use):**
- **Van reveal:** first = white-bg Lemovals-liveried van, 3/4 angle, centred; last = same van parked outside a Crosby terrace at golden hour, front door open, boxes visible inside.
- **Boxes stacking:** first = single cardboard box on white; last = stack of 8 boxes in a fully-packed living room.
- **Keys hand-off:** first = single brass key on white; last = key being placed in a homeowner's palm, new house behind.
- **House reveal:** first = simple line-drawing house outline on white; last = photorealistic Crosby semi-detached, Lemovals van in driveway.

## Seedance — Motion Prompts

Seedance is image-to-video. Supply **both frames** and a motion directive.

**Template:**
```
[first_frame] → [last_frame]
Motion: {camera move} + {subject transformation}
Duration: {3–6}s
Style: seamless, no cuts, no zoom snap, natural physics
```

**Motion directives that work for scroll-stop:**
- `slow dolly-in 20% over 4 seconds, subject rotates gently`
- `subject assembles piece-by-piece from the ground up, camera static`
- `environment reveals from behind a white curtain wipe, left to right`
- `camera orbits 45° clockwise around subject, background transitions white→scene`

**Avoid:** hard cuts, lens flares, flashing transitions, text animation inside the video (overlay text in SKILL3D's annotation cards instead).

## Brand-Locked Prompt Block (Lemovals, reusable)

Paste at the top of every nano-banana-2 and seedance prompt for Lemovals work:

```
Brand: Lemovals removals, Crosby/Waterloo Liverpool.
Colour palette: deep trust blue #0b3d91 + crisp white #ffffff + neutral grey #e8eaed.
Tone: clean, trustworthy, local, premium-without-corporate.
Typography in-scene: none (all type added in code).
Forbidden: lorem-looking stock, staged smiling crews, clipart vans, gradient skies.
```

## Workflow Checklist

Before handing the asset to SKILL3D:

- [ ] `ffprobe hero.mp4` — duration between 3.0 s and 10.0 s
- [ ] First frame opens `cv2.imread` / `ffmpeg -vf "select=eq(n\,0)"` pure white ≥ 95 % of pixel mass
- [ ] Single continuous take (no cuts — visual scene changes forbidden mid-clip)
- [ ] Focal subject remains in frame for full duration
- [ ] File ≤ 30 MB (preload-friendly)
- [ ] Resolution ≥ 1920 on long edge
- [ ] Colour-graded to brand palette (for Lemovals: blue / white / neutral)

**If any box fails: regenerate. Do not ask SKILL3D to compensate — it won't.**

## FFmpeg Verifier (copy-paste)

```bash
VIDEO=hero.mp4
ffprobe -v quiet -print_format json -show_streams -show_format "$VIDEO" | \
  jq '{duration: .format.duration, width: .streams[0].width, height: .streams[0].height, fps: .streams[0].r_frame_rate}'

# Check first frame is white-dominant (mean luminance > 240/255)
ffmpeg -y -i "$VIDEO" -vf "select=eq(n\,0),signalstats" -f null - 2>&1 | \
  grep -o 'YAVG:[0-9.]*' | head -1
```

If `YAVG` < 230, the first frame is not white enough — regenerate.

## Common Mistakes

| Mistake | Fix |
|---|---|
| First frame is the subject *inside* a scene | Move the subject to a separate white-bg still frame; prepend it to the video |
| Seedance produced a cut halfway | Reduce prompt complexity, regenerate with a single directive |
| Video is 12 seconds | Trim with `ffmpeg -t 6 -i in.mp4 -c copy out.mp4` or regenerate |
| Subject leaves frame | Re-prompt seedance with "subject stays centred throughout" |
| Colours drift off-brand | Add `colour palette locked to {hex values}` to both prompts |
| Letterboxing / pillarbox bars | Re-export at 1920×1080 exact, no auto-fit |

## Hand-off to SKILL3D

Once verified, invoke SKILL3D with the produced file. SKILL3D will then run its mandatory interview (brand name, logo, accent colour, background colour, vibe, content source, optional sections) before building the scroll-driven site.

**Do not skip SKILL3D's interview** — the asset is only half of the input; content and branding complete the handoff.
