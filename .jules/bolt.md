
## 2024-05-15 - Throttling Pointer Events with requestAnimationFrame
**Learning:** When throttling high-frequency pointer events (`pointermove`) using `requestAnimationFrame` to prevent layout thrashing, wrapping the original vanilla DOM handler can lead to issues where the native event object properties (like `clientX`, `clientY`) lose context by the time the asynchronous callback executes.
**Action:** Always extract necessary properties synchronously beforehand and refactor the wrapped function to accept primitive values instead of the entire event object. Ensure state tracking variables update on every event invocation outside the throttle condition to maintain the final mouse position.
