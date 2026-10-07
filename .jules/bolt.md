## 2024-05-24 - Layout Thrashing with High-Frequency Pointer Events
**Learning:** Attaching layout-triggering methods like `getBoundingClientRect()` directly to `pointermove` events causes severe layout thrashing, especially noticeable with high-polling-rate mice (e.g., 1000Hz).
**Action:** Always throttle high-frequency events (like `pointermove`, `scroll`, `resize`) using `requestAnimationFrame` before triggering any layout measurements or DOM updates. This aligns DOM operations with the screen refresh rate, saving CPU cycles and smoothing animations.
