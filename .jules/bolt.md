## 2026-10-01 - Pointer Event Throttling and CSS Transforms
**Learning:** High-frequency pointer events (`pointermove`) combined with layout-reading functions (`getBoundingClientRect`) can cause excessive CPU usage and layout thrashing, especially with high-polling-rate mice.
**Action:** Always throttle continuous interactive DOM reads (like distance calculations) to a reasonable framerate (e.g., 16ms for 60fps) and use `will-change: transform;` on elements undergoing rapid visual updates to promote them to their own composite layer.
