## 2023-10-25 - Pointermove Layout Thrashing
**Learning:** High-frequency events like `pointermove` directly calling `getBoundingClientRect()` cause severe main-thread congestion and layout thrashing, even if a custom timestamp check (like `now - lastEscape < 120`) is used to skip logic *after* the read.
**Action:** Always decouple synchronous layout reads from high-frequency event handlers by caching the event data and using `requestAnimationFrame` to schedule the DOM measurements/updates once per frame.
