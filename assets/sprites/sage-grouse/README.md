# Sage grouse sprite assets

- `sage-grouse-emerge.png` — 8-frame horizontal sprite sheet (each frame
  229×245px, padded to a uniform size). Sequence: hidden behind sagebrush
  → peek → progressively emerging → fully displayed. The sagebrush stays
  in the same place across all 8 frames. Animated in CSS via `steps()` on
  `background-position` — see the "Wildlife sprites" comment block in
  `css/styles.css`. Plays once on page load, then holds on the last frame
  (also the "settled" pose — there's no separate idle image).

Cropped and measured directly from the reference sheet at
`assets/sprites/_source/wildlife-sheet.png` (kept for provenance — not
used directly by the site). Frame boundaries were found from actual
transparent-pixel gaps in that file, not assumed from its printed labels.

## Replacing this art

Keep the same filename and an 8-frame horizontal layout, or update both
the frame count and the CSS math together: for N frames, `steps(N-1)`,
`background-size: (N*100%) 100%`, end position `-((N-1)*100%)` — all in
the `.sage-grouse-scene__emerge` rules in `css/styles.css`.
