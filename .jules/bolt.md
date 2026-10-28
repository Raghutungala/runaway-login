
## 2024-05-15 - [Throttling High-Frequency Pointer Events]
**Learning:** High-frequency events like `pointermove`, especially when coupled with high polling-rate gaming mice (1000Hz+), can overwhelm the main thread. If these event handlers trigger synchronous layout calculations (like `getBoundingClientRect()`), they cause severe performance bottlenecks and frame drops.
**Action:** Always throttle high-frequency layout-reading event handlers (resize, scroll, pointermove) using `requestAnimationFrame`. This limits the handler's execution to the display's refresh rate, reducing redundant layout trashing and keeping interactions smooth.
