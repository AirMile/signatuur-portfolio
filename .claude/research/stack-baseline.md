# Stack Baseline Research

Generated: 2025-12-29
Stack: React 19 + Vite 7 + Tailwind CSS v4 + React Router v7 + Motion
Valid until: 2026-03-29

## Framework Conventions

- Components must be pure functions - same inputs always produce same outputs
- Never define a component inside another component (causes performance issues)
- All component definitions should be at the top level of files
- Use PascalCase for component names (e.g., `MyButton`, `ChatRoom`)
- Use camelCase for event handlers (e.g., `handleClick`, `onSubmit`)
- Keep components focused - one responsibility per component
- Prefer composition over inheritance
- Use fragments (`<>...</>`) to avoid unnecessary wrapper divs
- Export default for page components, named exports for utilities

## Recommended Patterns

- **Custom Hooks**: Extract reusable logic into `use`-prefixed functions
  - Only prefix with `use` if the function calls other hooks
  - Name hooks after their purpose (e.g., `useOnlineStatus`, `useChatRoom`)
- **State Lifting**: Move shared state to the closest common ancestor
- **Controlled Components**: Prefer controlled inputs with value + onChange
- **Composition**: Pass children or render props for flexible components
- **Context + Reducer**: For complex state shared across many components
- **Effect Cleanup**: Always return cleanup functions from useEffect

## Common Idioms

- `const [state, setState] = useState(initialValue)` - State declaration
- `useEffect(() => { ... return () => cleanup(); }, [deps])` - Side effects with cleanup
- `{items.map(item => <Component key={item.id} {...item} />)}` - List rendering with keys
- `{condition && <Component />}` - Conditional rendering
- `{condition ? <A /> : <B />}` - Conditional toggle between components

## Testing Approach

- Test components in isolation using React Testing Library
- Focus on user behavior, not implementation details
- Use `screen.getByRole()` for accessible queries
- Mock external dependencies (APIs, context providers)
- Test custom hooks separately with `renderHook`

## Common Pitfalls

- **Missing keys in lists**: Always use unique, stable keys (not array index)
- **Stale closures in effects**: Include all dependencies in useEffect arrays
- **State updates during render**: Never call setState during render phase
- **Prop drilling**: Use Context for deeply nested props
- **Effect chains**: Avoid useEffect triggering other useEffects
- **Fetching without cleanup**: Use ignore flags or abort controllers
- **Direct DOM manipulation**: Use refs and React's declarative model instead

## React Router v7 Patterns

- Use `<BrowserRouter>` at app root for client-side routing
- Define routes with `<Routes>` and `<Route>` components
- Use `useNavigate()` for programmatic navigation
- Use `useParams()` to access URL parameters
- Use `<Link>` instead of `<a>` for internal navigation
- Nested routes for layout sharing

## Tailwind CSS v4 Patterns

- Use `@import "tailwindcss"` in main CSS file
- Utility-first: compose styles with atomic classes
- Use `@apply` sparingly - prefer utilities in JSX
- Custom colors via CSS variables in `@theme` block
- Responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- State variants: `hover:`, `focus:`, `active:`, `disabled:`

## Motion (Framer Motion) Patterns

- Import from `motion/react` for React components
- Use `<motion.div>` instead of `<div>` for animated elements
- `initial`, `animate`, `exit` for enter/exit animations
- `whileHover`, `whileTap` for gesture-based animations
- `AnimatePresence` for exit animations
- `layout` prop for automatic layout animations
- Use `useReducedMotion()` for accessibility

## Context7 Sources

Libraries researched:
- /websites/react_dev_learn (React official docs)
- /websites/reactrouter (React Router)
- /websites/tailwindcss (Tailwind CSS)
- /websites/motion-dev-docs (Motion/Framer Motion)

---
NOTE FOR AGENTS:
When you see this file, SKIP Context7 queries for:
- General React conventions
- Basic React patterns
- React hooks basics
- React Router basics
- Tailwind CSS basics
- Motion/Framer Motion basics

FOCUS your research on:
- Feature-specific patterns
- Domain-specific requirements
- Advanced/specialized topics not covered above
