# Pronghorn sprite assets

- `pronghorn-run.png` — 8-frame horizontal running/bounding gait cycle,
  each frame 243×212px. Animated in CSS via `steps()` on
  `background-position`, looping continuously while the pronghorn is
  moving. Two of the 8 frames were split out of two overlapping poses in
  the source art (their legs touch in the original) at the
  minimum-overlap point; those two frames may show a faint stray pixel or
  two near the trailing hoof as a result — flagged, not hidden.
- `pronghorn-graze.png` — 5-frame stop / lower-head / graze / raise-head
  cycle, each frame 260×236px. Plays once per pause between runs (via the
  `is-grazing` class toggled from `js/main.js`), then holds on the last
  (standing) frame.
- `banner-landscape.png` — 1536×189px desert landscape strip (sky,
  mountains, sagebrush), used as the background of the fixed bottom
  banner the pronghorn runs across. Cropped from the scene band of
  `assets/sprites/_source/wildlife-banner.png` (also kept for provenance).

## Replacing this art

For `pronghorn-run.png` or `pronghorn-graze.png`: keep the same filename
and frame layout, or update both the frame count and the CSS math
together: for N frames, `steps(N-1)`, `background-size: (N*100%) 100%`,
end position `-((N-1)*100%)` — in the `.pronghorn-runner__run` /
`.pronghorn-runner__graze` rules in `css/styles.css`. `banner-landscape.png`
can be swapped 1:1 with any same-aspect image.
