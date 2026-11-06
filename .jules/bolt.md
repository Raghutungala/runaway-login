
## 2024-11-06 - requestAnimationFrame State Handling
**Learning:** When applying a `requestAnimationFrame` throttle to rapid events like `pointermove`, wrapping the state update entirely within the `if (!isTicking)` block discards any subsequent coordinates that arrive before the next frame. If the pointer stops moving during a throttle window, the UI ends up with stale state.
**Action:** Always extract and store the most recent event data (like `clientX`, `clientY`) synchronously *outside* the `if (!isTicking)` check, ensuring the callback executed by `requestAnimationFrame` uses the freshest available state.
