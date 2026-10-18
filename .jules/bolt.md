## 2024-05-18 - Pointer Events & Animation Tracking
**Learning:** When using CSS transitions to animate an element escaping the cursor, we *must* read `getBoundingClientRect()` continuously to know its true intermediate position. However, doing this synchronously on un-throttled `pointermove` events (which fire up to 1000Hz on gaming mice) causes massive layout read thrashing.
**Action:** Throttle `pointermove` handlers with `requestAnimationFrame` to limit layout reads to the display refresh rate, preserving the interaction fidelity while drastically reducing CPU overhead.

## 2024-05-18 - Redundant DOM Writes
**Learning:** In vanilla JS, repeatedly assigning the same string to `.textContent` or `style.color` on every keystroke triggers unnecessary mutation observers, style recalculations, and paint invalidations.
**Action:** Always wrap direct DOM writes in a conditional check (`if (el.textContent !== newText)`) to act as a manual virtual DOM, preventing redundant repaints.
