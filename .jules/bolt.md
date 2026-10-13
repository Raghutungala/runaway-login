## 2026-10-13 - [Performance bottleneck in reactive mouse tracking]
**Learning:** High-frequency `pointermove` events (up to 1000Hz on some mice) intersecting with CSS transitions can cause severe layout thrashing and dropped frames if the event handler synchronously reads DOM dimensions like `getBoundingClientRect()`.
**Action:** Throttle high-frequency events using `requestAnimationFrame` to limit DOM reads to the display refresh rate (e.g., 60Hz), matching updates to the visual rendering cycle.
