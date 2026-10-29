## 2024-10-29 - Throttling High-Frequency Pointer Events
**Learning:** High-frequency events like `pointermove` (which can fire 1000 times per second on some mice) combined with synchronous DOM layout reads (like `getBoundingClientRect()`) cause severe layout thrashing and CPU spikes.
**Action:** Always throttle high-frequency events that trigger DOM reads using `requestAnimationFrame` to limit execution to the screen refresh rate without sacrificing responsiveness.
