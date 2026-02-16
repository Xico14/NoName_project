# Design System: Motion

## Motion tokens

Use only the centralized tokens below for all new motion in the interface.

### Duration

- `duration-fast` (`--duration-fast: 120ms`) — instant feedback for press/release and tiny state responses.
- `duration-normal` (`--duration-normal: 220ms`) — default duration for hover/focus and screen crossfades.
- `duration-slow` (`--duration-slow: 360ms`) — celebratory or context-building transitions (e.g., success, shared element).

### Easing

- `easing-emphasized` (`--easing-emphasized: cubic-bezier(0.2, 0, 0, 1)`) — assertive movement where user intent must feel immediate.
- `easing-standard` (`--easing-standard: cubic-bezier(0.2, 0, 0, 1)`) — default easing for most transitions.
- `easing-decelerate` (`--easing-decelerate: cubic-bezier(0, 0, 0, 1)`) — soft landings (entering/success endings).

> Source of truth: `styles/motion.css`.

## Micro-animations for interactive elements

The following states are required for all interactive primitives: buttons, cards that are clickable, and tabs.

- **Hover:** subtle elevation (`translateY` + tiny scale + shadow), `duration-normal`.
- **Press:** compressed response (`scale(0.98)`), `duration-fast`, `easing-emphasized`.
- **Focus-visible:** high-contrast focus ring using `box-shadow`; no removal of keyboard affordance.
- **Success:** single pulse (`duration-slow`) or, in reduced motion, static but visible highlight.

## Context-preserving screen transitions

When moving between screens, users should keep orientation.

1. Prefer shared element transitions for stable objects (thumbnail, title, CTA).
2. Pair shared element movement with a soft screen crossfade.
3. If View Transitions API is not available, use `screen-enter` / `screen-exit` classes with low-distance fades.
4. Never use hard cuts for flows where users compare or continue work from a previous screen.

## `prefers-reduced-motion` behavior

Reduced motion must preserve meaning, not remove feedback.

- Disable transform-heavy motion and keyframe-driven movement.
- Keep color, contrast, outline, and opacity changes for state clarity.
- Keep success and focus feedback via static visual deltas (ring, saturation, border/shadow).
- Use shortened durations (40–80ms) for non-spatial transitions only.

## Motion rules and limits

### Motion is mandatory

1. State changes of interactive controls (`hover`, `press`, `focus-visible`, `success`).
2. Screen transitions that change information architecture level (list → details, step N → step N+1).
3. Focus change triggered by keyboard navigation.

### Motion is optional

1. Decorative entrances for non-critical content.
2. Non-interactive icons without semantic role.

### Motion is forbidden

1. Infinite looping animations on primary workflows.
2. Parallax or large-distance movement that can induce discomfort.
3. More than one simultaneous attention-grabbing animation per viewport region.
4. Any animation that delays user input availability.

## Performance budget

- Target 60 FPS on modern hardware.
- Prefer `transform` and `opacity` for animated properties.
- Keep combined transition duration under 400ms for primary workflows.
