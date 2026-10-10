## 2024-05-24 - Unthrottled pointer events causing layout thrashing
**Learning:** Calling layout-triggering DOM methods (like `getBoundingClientRect()`) directly within high-frequency event handlers (`pointermove`) causes continuous style recalculations and layout reads. This leads to main thread blockage and battery drain.
**Action:** Always throttle high-frequency UI events with `requestAnimationFrame` before reading geometry or updating the DOM, ensuring maximum of one execution per frame (approx. 60fps).
