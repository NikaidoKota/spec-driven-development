# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Elemental Survivors** is a browser-based 2D action game inspired by Vampire Survivors, featuring environmental interaction and elemental fusion systems. Built with TypeScript, Vite, and HTML5 Canvas 2D API.

**Current Status**: Phase 1 (Core Engine) - Basic game loop with player movement implemented using Test-Driven Development (TDD).

## Development Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Production build
npm run preview          # Preview production build

# Testing (TDD approach - ALWAYS test first)
npm run test             # Run tests in watch mode
npm run test:watch       # Run tests in watch mode (explicit)
npm run test:ui          # Run tests with UI
npm run test:ci          # Run tests once (CI mode)
npm run test:coverage    # Run tests with coverage report
npm test Vector2         # Run specific test file

# Code Quality
npm run lint             # Lint TypeScript files
npm run lint:fix         # Auto-fix linting issues
npm run format           # Format code with Prettier
```

## Architecture Overview

### Tech Stack
- **Language**: TypeScript 5.x (strict mode enabled)
- **Build Tool**: Vite 7.x (fast HMR, ES modules)
- **Testing**: Vitest 4.x with jsdom (TDD required, 80%+ coverage goal)
- **Rendering**: HTML5 Canvas 2D API (no external game engine)
- **Module System**: ES Modules with path aliases

### Core Patterns

**Game Loop Pattern**
- Uses `requestAnimationFrame` for 60 FPS target
- Delta time calculation for frame-independent movement
- Update → Render cycle separation

**Entity Component System (Simplified)**
- Entities: Game objects with position and state
- Systems: Process entities (Collision, Spawn, Level, Combat)
- Components: Data containers (Position, Health, Combat)

**Scene Management**
- Scene interface: `init()`, `update(deltaTime)`, `render()`, `cleanup()`
- SceneManager handles transitions
- Current scenes: Title, Game, GameOver

**Object Pooling** (for performance)
- Reuse objects instead of creating/destroying
- Used for: enemies, projectiles, effects, experience orbs

### Directory Structure & Path Aliases

```
src/
├── core/           # @core    - Game engine (Game, Renderer, Input, Scene)
├── entities/       # @entities - Game objects (Player, Enemy, Weapon)
│   ├── enemies/    # Enemy types
│   └── weapons/    # Weapon types
├── systems/        # @systems  - Game logic (Collision, Spawn, Level, Combat)
├── scenes/         # @scenes   - Screen states (Title, Game, GameOver)
├── ui/             # @ui       - UI components (HUD, LevelUpPanel)
├── utils/          # @utils    - Helpers (Vector2, MathUtils, Logger)
├── config/         # @config   - Game constants and balance settings
├── types/          # @types    - TypeScript interfaces and types
└── main.ts         # Entry point
```

**Key Classes** (Phase 1 implemented):
- `Game.ts` - Main game class, manages game loop and FPS
- `Renderer.ts` - Canvas drawing (circles, rects, text, health bars)
- `Input.ts` - Keyboard/mouse handling (WASD/arrows for movement)
- `Vector2.ts` - 2D vector math (add, subtract, multiply, normalize, distance)
- `MathUtils.ts` - Math utilities (clamp, lerp, randomRange, randomInt, deg/rad conversion)

## Test-Driven Development (TDD) - MANDATORY

**This project strictly follows TDD.** All implementation MUST follow the Red-Green-Refactor cycle:

### TDD Cycle
1. **🔴 Red**: Write failing test FIRST (before any implementation)
2. **🟢 Green**: Write minimal code to pass the test
3. **🔵 Refactor**: Improve code quality while keeping tests green

### Test Structure (AAA Pattern)
```typescript
describe('ClassName', () => {
  describe('methodName', () => {
    it('説明文（日本語OK）', () => {
      // Arrange: Setup test data
      const input = new SomeClass();

      // Act: Execute test target
      const result = input.someMethod();

      // Assert: Verify results
      expect(result).toBe(expectedValue);
    });
  });
});
```

### Test File Placement
```
src/utils/Vector2.ts
tests/unit/utils/Vector2.test.ts
```

### Coverage Goals
- **Unit Tests**: 80%+ (mandatory for utils, systems, entities)
- **Integration Tests**: Key workflows (player-enemy collision, damage calculation)
- **E2E Tests**: Phase 2+ (Playwright for full game flow)

**DO NOT** implement production code without tests first. This is enforced.

## Code Architecture Details

### Game Loop Flow
```
requestAnimationFrame
  → Calculate deltaTime
  → Input.getMovementDirection()
  → Update game state (entities move)
  → Collision detection
  → Renderer.clear()
  → Renderer.draw*() methods
  → Loop
```

### Configuration System
All game balance parameters are in `src/config/`:
- `GameConfig.ts` - Canvas size (1280x720), FPS target (60), game duration (600s)
- `PlayerConfig.ts` - Initial HP (100), speed (200), level (1)
- `EnemyConfig.ts` - Enemy stats, spawn intervals, max count (100)
- `WeaponConfig.ts` - Weapon stats and level-up bonuses
- `BalanceConfig.ts` - Experience orbs, difficulty scaling

These are `const` objects for easy balance tweaking without code changes.

### Canvas Rendering
`Renderer.ts` wraps Canvas 2D API:
- `clear(color)` - Fill background
- `drawCircle(position, radius, color)` - Entities
- `drawRect(position, width, height, color)` - UI elements
- `drawText(text, position, color, fontSize, fontFamily, align)` - Text
- `drawHealthBar(position, width, height, currentHp, maxHp, bgColor, fillColor)` - HP bars

All rendering goes through Renderer (no direct canvas access elsewhere).

### Input Handling
`Input.ts` manages keyboard/mouse:
- `isKeyPressed(key)` - Check if key is down
- `getMovementDirection()` - Returns normalized Vector2 for WASD/arrows
- `getMousePosition()` - Current mouse position
- `isMousePressed()` - Mouse button state

Handles focus loss (clears keys on window blur).

### Vector Math
`Vector2.ts` is the foundation for all positions/velocities:
- Immutable operations (returns new instances)
- Key methods: `add()`, `subtract()`, `multiply()`, `length()`, `normalize()`
- Static helpers: `Vector2.distance()`, `Vector2.zero()`

## Development Guidelines

### Coding Standards
- **TypeScript strict mode** - No `any`, explicit return types for functions
- **Naming**: PascalCase (classes), camelCase (variables/functions), UPPER_SNAKE_CASE (constants)
- **File naming**: PascalCase for classes (`Player.ts`), kebab-case for assets (`player-sprite.png`)
- **No console.log** - Use `Logger.info/warn/error()` instead
- **Comments**: JSDoc for public APIs, inline for complex logic only

### When to Use TDD
- **ALWAYS** for: utils, systems, game logic, entities
- **Optional** for: rendering code (visual testing is manual), UI layout

### Import Order
1. External libraries
2. Core engine (`@core`)
3. Systems (`@systems`)
4. Entities (`@entities`)
5. UI (`@ui`)
6. Utils (`@utils`)
7. Types (`@types`)
8. Config (`@config`)
9. Relative imports

### Performance Considerations
- Target: 60 FPS (16.67ms per frame)
- Max enemies on screen: 100
- Use object pooling for frequently created/destroyed objects
- Cull off-screen entities (don't render)
- Avoid `new` in game loop hot paths

## Document-Driven Development

This project uses a two-tier documentation system:

### Persistent Docs (`docs/persistent/`)
Rarely-changing architectural documents:
- `product-requirements.md` - Product vision, features, phases
- `functional-design.md` - System architecture, data models
- `architecture.md` - Tech stack, patterns, performance requirements
- `repository-structure.md` - File organization rules
- `development-guidelines.md` - Coding standards, naming conventions
- `glossary.md` - Domain terminology

**When to update**: Major architectural changes only.

### Steering Docs (`docs/steering/YYYYMMDD-task-name/`)
Task-specific implementation guides:
- `requirements.md` - Feature requirements and acceptance criteria
- `design.md` - Implementation approach, affected components
- `tasklist.md` - Specific tasks and completion criteria

**Current**: `docs/steering/20251128-prototype-implementation/` (Phase 1)

**Important**: Always create steering docs BEFORE implementation. Get user approval for each doc.

## Phase Development Plan

### Phase 1: Prototype (CURRENT - Partially Complete)
**Status**: Core engine done, next: Scenes → Player → Enemies → Weapons → Level System → UI
- ✅ Utils (Vector2, MathUtils, Logger) with 43 passing tests
- ✅ Core engine (Game loop, Renderer, Input)
- 🔲 Scene management (Title, Game, GameOver)
- 🔲 Player entity (HP, movement, Entity base class)
- 🔲 Enemy spawning and AI
- 🔲 Collision detection system
- 🔲 Weapon system (auto-attack)
- 🔲 Experience and level-up
- 🔲 HUD and UI

### Phase 2: Environmental Interaction (FUTURE)
- Destructible objects (rocks, trees, barrels)
- Terrain effects (water, lava, grass, ice)
- Field transformation (grass burns, lava solidifies)

### Phase 3: Elemental Fusion System (FUTURE)
- 5 elements: Fire, Water, Thunder, Nature, Dark
- Fusion effects (2-element combos: 15 types)
- Trinity effects (3-element combos: 10 types)
- Weapon attribute system

### Phase 4: Polish (FUTURE)
- Multiple characters, weapons, stages
- Online leaderboard
- Build sharing

## Common Tasks

### Adding a New Entity
1. **Red**: Write test in `tests/unit/entities/EntityName.test.ts`
2. **Green**: Implement in `src/entities/EntityName.ts` extending `Entity`
3. **Refactor**: Clean up while tests pass
4. Add config in `src/config/EntityConfig.ts`
5. Update types in `src/types/entities.ts`

### Adding a New System
1. **Red**: Write tests for system logic
2. **Green**: Implement in `src/systems/SystemName.ts`
3. Integrate into `Game.update()` or appropriate scene
4. Add to entity manager if needed

### Debugging
- Check browser console for Logger output
- Use `GameConfig.DEBUG_MODE = true` for FPS display
- Run `npm run test:ui` for interactive test debugging
- Check `tests/unit/` for existing test examples

## Important Reminders

- **TDD is non-negotiable** - Test first, always
- **Get approval** before moving to next phase/document
- **Path aliases** - Use `@utils/Vector2` not `../utils/Vector2`
- **No premature optimization** - Simple > clever until profiling shows issues
- **Keep functions small** - Max 50 lines, single responsibility
- **Document-driven** - Check steering docs for current task plan
- **Commit frequently** - After each passing test or working feature

## Known Patterns in Codebase

**Immutable Vector Math**
```typescript
const newPos = position.add(velocity.multiply(deltaTime));
// position unchanged, returns new Vector2
```

**Config Constants**
```typescript
import { PlayerConfig } from '@config/PlayerConfig';
const radius = PlayerConfig.RADIUS; // Type-safe, no magic numbers
```

**Input-Driven Movement**
```typescript
const direction = this.input.getMovementDirection(); // Normalized vector
this.position = this.position.add(direction.multiply(speed * deltaTime));
```

**Canvas Drawing Through Renderer**
```typescript
this.renderer.drawCircle(position, radius, color);
// Not: ctx.arc(...) directly
```

---

**Last Updated**: 2025-11-28
**Version**: 3.0 (TDD-focused rewrite)
