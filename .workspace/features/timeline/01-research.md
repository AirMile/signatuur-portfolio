# Feature Research: Portfolio Timeline

## Overview

| Field | Value |
|-------|-------|
| **Feature** | timeline |
| **Research Date** | 2025-12-30 |
| **Coverage** | 78% |
| **Confidence** | 85% |
| **Agents Used** | best-practices, architecture, testing |

## Stack Baseline

Baseline loaded from `.claude/research/stack-baseline.md` (valid until 2026-03-29).
Research focused on feature-specific patterns not covered in baseline.

## Framework Best Practices

### Horizontal Scroll Container Pattern

```jsx
// Container with overflow and flex children
<div className="overflow-x-auto">
  <div className="flex gap-6">
    {sections.map(section => (
      <div key={section.id} className="flex-shrink-0 min-w-[400px]">
        {/* Section content */}
      </div>
    ))}
  </div>
</div>
```

**Key points:**
- Use `overflow-x-auto` on container
- Use `flex` with `gap-*` for spacing
- Apply `flex-shrink-0` and `min-w-*` on children to prevent shrinking
- Container width must be constrained for scroll to work

### Single-Expanded Accordion Pattern

```jsx
const [expandedId, setExpandedId] = useState(null);

const toggleItem = (id) => {
  setExpandedId(expandedId === id ? null : id);
};

// In render:
{items.map(item => (
  <div key={item.id}>
    <button onClick={() => toggleItem(item.id)}>
      {item.title}
    </button>
    {expandedId === item.id && (
      <div>{item.content}</div>
    )}
  </div>
))}
```

**Key points:**
- Single state variable (`expandedId`) instead of boolean per item
- Toggle logic: close if same item clicked, open if different
- Enforces "only one open at a time" automatically

### Motion Scroll Animation Pattern

```jsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, x: 20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  {/* Content animates when scrolled into view */}
</motion.div>
```

**Key points:**
- Use `whileInView` for scroll-triggered animations
- Add `viewport={{ once: true }}` to prevent re-animation
- No manual Intersection Observer needed
- GPU-accelerated by default

## Architecture Patterns

### Component Structure

```
AssessmentTimeline (root)
├── State: expandedId (currently open item)
├── Data: timelineData (hardcoded constant)
├── Render: flex container (overflow-x-auto)
│   ├── TLE 1 Section (motion.div)
│   │   └── Accordion items per category
│   ├── TLE 2 Section (motion.div)
│   │   └── Accordion items per category
│   └── Toekomst Section (motion.div)
│       └── Accordion items per category
└── Uses: Motion (whileInView), Lucide (ChevronDown)
```

### Data Structure

```javascript
const timelineData = [
  {
    phase: 'TLE 1',
    categories: {
      'Toolkit': [
        { id: 't1-tk-1', title: '...', description: '...', reflection: '...' },
      ],
      'Groei': [...],
      'Projecten': [...]
    }
  },
  // TLE 2, Toekomst follow same structure
];
```

### Category Color Mapping

```javascript
const categoryColors = {
  'Toolkit': 'from-blue-500 to-blue-600',
  'Groei': 'from-green-500 to-emerald-600',
  'Projecten': 'from-orange-500 to-yellow-600'
};
```

## Testing Strategy

### What to Test

| Area | Test Approach |
|------|---------------|
| Accordion toggle | `userEvent.click()` + verify only one expanded |
| Scroll container | Visual test, verify `overflow-x-auto` applied |
| Motion animations | Skip in unit tests (visual verification) |
| Category colors | Snapshot test or visual regression |
| Data structure | Unit test data shape validation |

### Accordion Testing Pattern

```jsx
// Test accordion mutual exclusivity
await userEvent.click(screen.getByText('Item 1'));
expect(screen.getByText('Description 1')).toBeVisible();

await userEvent.click(screen.getByText('Item 2'));
expect(screen.queryByText('Description 1')).not.toBeVisible();
expect(screen.getByText('Description 2')).toBeVisible();
```

### Edge Cases to Test

1. **Rapid accordion clicks**: Ensure state updates correctly
2. **Empty sections**: Verify graceful handling
3. **Long content**: Check overflow behavior in expanded state
4. **Animation interruption**: User scrolls during animation

## Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Missing `flex-shrink-0` | Sections collapse instead of scroll |
| Animation re-triggers | Always use `viewport={{ once: true }}` |
| Multiple items open | Use single `expandedId` state, not per-item booleans |
| Scroll not working | Ensure parent has constrained width |
| Motion in tests | Mock or skip animation tests |

## Context7 Sources

| Library | Coverage | Confidence |
|---------|----------|------------|
| motion-dev-docs | 85% | 85% |
| react-intersection-observer | 90% | 88% |
| react-testing-library | 82% | 84% |

**Total queries executed:** 9 (3 per agent)
