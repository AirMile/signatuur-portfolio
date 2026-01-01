# Feature Architecture: Portfolio Timeline

## Overview

| Field | Value |
|-------|-------|
| **Feature** | timeline |
| **Selected Approach** | Pragmatic Balance |
| **Philosophy** | Balance speed with maintainability |
| **Complexity** | 42/100 |

## Architecture Decision

**Chosen: Option 3 - Pragmatic Balance**

Eén zelfstandig component met eigen state en hardcoded data. Snel te implementeren maar start wel component structuur voor toekomstige features.

## Design Overview

```
App.jsx
  └─ AssessmentTimeline (NEW)
      ├─ State: expandedId (currently open item)
      ├─ Data: timelineData (hardcoded constant)
      ├─ Render: flex container (overflow-x-auto)
      │   ├─ TLE 1 Section (motion.div)
      │   ├─ TLE 2 Section (motion.div)
      │   └─ Toekomst Section (motion.div)
      └─ Each Section:
          └─ Accordion items per category (Toolkit/Groei/Projecten)
```

## Files to Create

| File | Purpose | Dependencies |
|------|---------|--------------|
| `src/components/AssessmentTimeline.jsx` | Main timeline component with accordion, scroll, animations | React, motion, lucide-react |

## Files to Modify

| File | Change | Reason |
|------|--------|--------|
| `src/App.jsx` | Import + render AssessmentTimeline in Home | Display timeline on page |

## Component Specification

### AssessmentTimeline

**Responsibility:** Render three TLE sections in horizontal scroll layout; manage single expanded accordion item; apply entrance animations.

**Interface:** No props. Self-contained component.

**State:**
- `expandedId` (string | null) - tracks which accordion item is open

**Internal Data:**
```javascript
const timelineData = [
  {
    phase: 'TLE 1',
    categories: {
      'Toolkit': [{ id, title, description, reflection }, ...],
      'Groei': [...],
      'Projecten': [...]
    }
  },
  // TLE 2, Toekomst
];

const categoryColors = {
  'Toolkit': 'from-blue-500 to-blue-600',
  'Groei': 'from-green-500 to-emerald-600',
  'Projecten': 'from-orange-500 to-yellow-600'
};
```

**Handlers:**
- `toggleItem(id)`: If `expandedId === id`, set to null; else set to id

## Implementation Sequence

### Phase 1: Foundation

1. Create `src/components/` folder (if not exists)
2. Create `AssessmentTimeline.jsx` with imports
3. Define `timelineData` constant with placeholder content
4. Define `categoryColors` mapping

### Phase 2: Core Layout

1. Set up horizontal scroll container (`overflow-x-auto` + `flex`)
2. Render 3 TLE sections with `flex-shrink-0` and `min-w-[33.333%]`
3. Add section headers (TLE 1, TLE 2, Toekomst)
4. Map categories within each section

### Phase 3: Accordion + Styling

1. Implement `expandedId` state and `toggleItem` handler
2. Render accordion items with click handlers
3. Add conditional content rendering (expand/collapse)
4. Apply category colors to items
5. Add Lucide ChevronDown icon with rotation on expand

### Phase 4: Animations + Integration

1. Wrap sections in `motion.div` with `whileInView` animations
2. Add `viewport={{ once: true }}` to prevent re-animation
3. Import and render in App.jsx Home section
4. Add `hidden lg:block` for desktop-only display
5. Test scroll and accordion behavior

## Data Flow

```
1. Component mounts
   ↓
2. AssessmentTimeline renders 3 TLE sections in flex row
   ↓
3. Each section enters with Motion.whileInView animation
   ↓
4. User scrolls horizontally through timeline
   ↓
5. User clicks accordion header
   ↓
6. toggleItem(id) updates expandedId state
   ↓
7. Clicked item expands, any previously open item collapses
   ↓
8. Content shows description + reflection with category color
```

## Critical Considerations

| Aspect | Approach |
|--------|----------|
| **Error Handling** | No runtime errors expected (hardcoded data). Render empty if data malformed. |
| **State Management** | Local `expandedId` state only. No context/global state needed. |
| **Testing Strategy** | Visual test scroll and animations. Unit test toggle logic. |
| **Performance** | Motion `viewport={{ once: true }}` prevents re-triggers. Simple state = no expensive re-renders. |
| **Security** | All data hardcoded. No user input processed. |

## Code Reference

```jsx
// src/components/AssessmentTimeline.jsx
import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const categoryColors = {
  'Toolkit': 'from-blue-500 to-blue-600',
  'Groei': 'from-green-500 to-emerald-600',
  'Projecten': 'from-orange-500 to-yellow-600'
};

const timelineData = [
  {
    phase: 'TLE 1',
    categories: {
      'Toolkit': [
        { id: 't1-tk-1', title: 'Example', description: '...', reflection: '...' }
      ],
      'Groei': [],
      'Projecten': []
    }
  },
  // ... TLE 2, Toekomst
];

export default function AssessmentTimeline() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleItem = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="my-16 hidden lg:block">
      <h3 className="mb-8 text-3xl font-bold">Mijn Leerpad</h3>
      <div className="overflow-x-auto">
        <div className="flex gap-6">
          {timelineData.map((tle, idx) => (
            <motion.div
              key={tle.phase}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="min-w-[33.333%] flex-shrink-0 rounded-2xl bg-slate-800/50 p-6"
            >
              <h4 className="mb-4 text-xl font-semibold">{tle.phase}</h4>
              {Object.entries(tle.categories).map(([category, items]) => (
                <div key={category} className="mb-4">
                  <p className="mb-2 text-sm font-medium text-slate-400">{category}</p>
                  {items.map((item) => (
                    <div key={item.id} className="mb-2">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className={`w-full rounded-lg bg-gradient-to-r ${categoryColors[category]} p-3 text-left`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.title}</span>
                          <ChevronDown className={expandedId === item.id ? 'rotate-180' : ''} />
                        </div>
                      </button>
                      {expandedId === item.id && (
                        <div className="mt-2 px-3 text-sm text-slate-300">
                          <p>{item.description}</p>
                          <p className="mt-2 italic">{item.reflection}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Trade-offs

| Pro | Con |
|-----|-----|
| Fast implementation (~1-2 uur) | Data hardcoded in component |
| Establishes component pattern | Larger single file (~200 lines) |
| Easy to modify data | Refactor needed for dynamic data later |
| Self-contained, no prop drilling | No reusable accordion component |

## Estimated Effort

- **Files to create**: 1
- **Files to modify**: 1
- **Implementation time**: 1-2 hours
- **Testing effort**: Low (visual + manual)
