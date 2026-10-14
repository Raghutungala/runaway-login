## 2024-05-24 - Throttling pointermove events with requestAnimationFrame
**Learning:** High-polling-rate mice (up to 1000Hz) firing `pointermove` events coupled with synchronous layout reads (`getBoundingClientRect`) can cause significant main thread blocking and layout thrashing.
**Action:** Always throttle frequent, continuous DOM events (like `pointermove`, `scroll`, `resize`) using `requestAnimationFrame`, especially when the handler contains layout reads.
