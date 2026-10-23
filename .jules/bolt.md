## 2026-10-23 - [Pointermove Throttling]
**Learning:** High-frequency events like pointermove cause excessive DOM reads when calling getBoundingClientRect.
**Action:** Use requestAnimationFrame to throttle these events to match the display refresh rate.
