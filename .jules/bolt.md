## 2026-11-01 - DOM Event Context Loss in async Callbacks
**Learning:** When optimizing event listeners by wrapping them in asynchronous callbacks (like `requestAnimationFrame`), the event context (such as `currentTarget` and `this`) will be lost by the time the callback executes, potentially causing regressions if the handler relies on them.
**Action:** Always extract the necessary event properties (e.g., `clientX`, `clientY`) synchronously within the initial event handler and pass a synthetic object to the deferred handler instead of passing the raw event object.
