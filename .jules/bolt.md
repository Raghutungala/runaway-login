## 2024-05-20 - Throttling DOM Reads
**Learning:** High-frequency events like pointermove can cause layout thrashing when triggering synchronous DOM reads (getBoundingClientRect).
**Action:** Always throttle these events using requestAnimationFrame or debounce them in vanilla JS applications.
