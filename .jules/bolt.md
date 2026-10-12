## 2026-10-12 - Prevent Layout Thrashing on Pointer Events
**Learning:** The `pointermove` event on high polling rate devices can fire extremely frequently, and executing `getBoundingClientRect()` inside its handler causes layout thrashing and wastes CPU cycles.
**Action:** Throttle frequent event listeners like `pointermove`, `scroll`, or `resize` that trigger layout calculations by wrapping their execution in `requestAnimationFrame`, passing only the latest event to the callback.
