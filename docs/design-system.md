# Design System

## 1) Brand Identity: gradients + neutrals

### Core tokens
- `--gradient-primary`: primary brand flow for hero/header areas.
- `--gradient-secondary`: accent gradient for badges and highlights.
- Neutral palette is split into light and dark tokens to keep contrast stable in both themes.

```css
:root {
  --gradient-primary: linear-gradient(135deg, #5b7cfa 0%, #7b5cff 45%, #00d4ff 100%);
  --gradient-secondary: linear-gradient(135deg, #ff7a59 0%, #ff4f9a 50%, #ffc857 100%);
}
```

### Do / Don’t
✅ **Do:** apply gradients to large, meaningful surfaces (hero/header) to create instant recognition.  
❌ **Don’t:** use gradients on every card/button; this reduces hierarchy and hurts readability.

---

## 2) Adaptive Depth layer (glass + shadow + contrast)

Use `adaptive-panel` as the base visual layer for modern depth:
- soft transparent panel background;
- subtle border;
- blur (`--panel-blur`);
- elevation via fixed shadow tokens.

```html
<article class="adaptive-panel card depth-2">...</article>
```

### Do / Don’t
✅ **Do:** pair blur with enough text contrast (`--text-primary`, `--text-secondary`).  
❌ **Don’t:** stack heavy blur + heavy shadow + bright glow simultaneously.

---

## 3) Fixed consistency tokens

Only these tokens/classes are allowed for corner radius, elevation and glow:

- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`
- Elevation: `--elevation-1` ... `--elevation-4` (`depth-1..4` helper classes)
- Glow: `--glow-primary` (`glow-primary` helper class)

### Do / Don’t
✅ **Do:** use tokenized values only for all new components.  
❌ **Don’t:** introduce one-off values like `border-radius: 13px` or custom random shadows.

---

## 4) Signature detail repeated on key screens

Use `.signature-header` (primary live gradient header) as a repeated brand anchor across:
- dashboard top section;
- onboarding welcome screen;
- profile/account overview.

```html
<header class="signature-header">
  <span class="gradient-badge">Signature Detail</span>
  <h1>Live Gradient Header</h1>
</header>
```

### Do / Don’t
✅ **Do:** repeat the same signature shape and gradient behavior on key screens.  
❌ **Don’t:** invent separate visual headers for each screen.

---

## 5) Implementation references

- Tokens and reusable classes: `styles/design-tokens.css`
- Visual preview example: `examples/ui-showcase.html`
