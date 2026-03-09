# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This repository is a VB6-to-modern-stack migration toolkit called **"Antigravity"**. It contains:

- A static `index.html` — Korean "Hello World" page with Jest tests
- **Migration skills** — two-layer tooling to scaffold and generate React + Express + MyBatis projects from VB6 legacy code
- `client/` — sample React 19 app (Create React App)
- `server/` — sample Express 5 + MySQL skeleton
- `test-vb6-project/` — sample VB6 project with example migrated output
- `nextjs-app/` — standalone Next.js 16 + TypeScript demo
- `with-cloudinary-app/` — Next.js + Cloudinary image gallery demo
- `.claude/skills/antigravity/` — Claude Code skill definition with prompts and code templates

---

## Repository Structure

```
claude-dev/
├── .claude/
│   ├── settings.local.json               # Local skill permissions
│   └── skills/antigravity/               # Claude Code migration skill
│       ├── skill.yaml                    # Skill definition & command spec
│       ├── README.md                     # Korean documentation
│       ├── prompts/                      # AI prompt templates
│       │   ├── analyze-vb6.md
│       │   ├── extract-sql.md
│       │   ├── generate-react.md
│       │   ├── generate-nodejs.md
│       │   └── migrate-full.md
│       └── templates/                    # TypeScript/XML code templates
│           ├── react-component.tsx
│           ├── react-hook.ts
│           ├── express-app.ts
│           ├── express-controller.ts
│           ├── express-route.ts
│           ├── api-service.ts
│           ├── node-service.ts
│           ├── oracle-connection.ts
│           ├── mybatis-mapper.xml
│           └── vite.config.ts
├── client/                               # Create React App (React 19)
│   ├── package.json
│   └── src/
│       ├── App.js / App.test.js
│       └── index.js
├── server/                               # Express 5 + mysql2 skeleton
│   ├── package.json
│   └── UserMapper.xml
├── skills/                               # Node.js migration scaffold scripts
│   ├── migrate_skill.js                  # Core scaffold logic
│   ├── migrate-vb6-to-react-node-mybatis.js
│   └── migrate-vb6/skill.yaml
├── test-vb6-project/                     # Sample VB6 project
│   ├── TestProject.vbp
│   ├── LoginForm.frm
│   ├── UserService.cls
│   ├── DBUtil.bas
│   └── migrated/                        # Example migration output
│       ├── analysis-report.md
│       ├── extracted-sql/queries.json
│       ├── frontend/src/
│       │   ├── pages/LoginPage.tsx
│       │   └── services/userService.ts
│       └── backend/
│           ├── src/{routes,controllers,services}/
│           └── mappers/UserMapper.xml
├── nextjs-app/                           # Next.js 16 + Tailwind CSS demo
├── with-cloudinary-app/                  # Next.js + Cloudinary gallery
├── tests/
│   └── index.test.js                    # Jest tests for index.html
├── index.html                           # Korean "Hello World" static page
├── frmLogin.frm                         # Sample VB6 login form (root)
├── extracted.sql                        # SQL extraction output
├── migrate.js                           # Migration entry point
└── package.json                         # Root: Jest + jsdom
```

---

## Commands

### Root-level tests (Jest + jsdom)

```bash
npm test                          # Run all root tests
npx jest tests/index.test.js     # Run a single test file
```

Tests in `tests/index.test.js` load `index.html` via jsdom and assert:
- `document.title === '헬로우 월드'`
- No `<form>` element is present

### Client (React / Create React App)

```bash
cd client && npm start           # Dev server on port 3000
cd client && npm run build       # Production build
cd client && npm test            # React tests (interactive watch mode)
```

### Server (Express)

No start script defined — the server skeleton in `server/` requires manual setup.

### Migration scaffold

```bash
node migrate.js                  # Full scaffold: creates client/, server/, extracted.sql
```

`migrate.js` delegates to `skills/migrate_skill.js`, which:
1. Runs `npx create-react-app client`
2. Initializes `server/` and installs `express` + `mysql2`
3. Writes a MyBatis mapper XML to `server/UserMapper.xml`
4. Scans `.frm`/`.bas` files in the project root for `SELECT` statements and writes them to `extracted.sql`

### Next.js app

```bash
cd nextjs-app && npm run dev     # Dev server
cd nextjs-app && npm run build   # Production build
cd nextjs-app && npm run lint    # ESLint
```

### Cloudinary app

```bash
cd with-cloudinary-app && npm run dev    # Dev server
cd with-cloudinary-app && npm run build  # Production build
```

### View index.html locally

```bash
python -m http.server 8000       # Open http://localhost:8000
```

---

## Architecture

### Two-layer migration tooling

| Layer | Location | Purpose |
|-------|----------|---------|
| Scaffold scripts | `skills/migrate_skill.js` | Node.js script — creates project scaffolding, extracts SQL via regex |
| Claude Code skill | `.claude/skills/antigravity/` | AI-powered analysis and code generation using prompt templates |

### Antigravity skill commands

Invoked via Claude Code as `/antigravity <command>`:

| Command | Description |
|---------|-------------|
| `/antigravity analyze <path>` | Analyze VB6 project/file structure |
| `/antigravity extract-sql <path>` | Extract SQL queries, generate MyBatis mappers |
| `/antigravity frontend <path>` | Generate React + Vite components from `.frm` file |
| `/antigravity backend <path>` | Generate Node.js + Express API from `.cls`/`.bas` file |
| `/antigravity migrate <vbp-path>` | Full project migration (runs all steps) |

### Target migration stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5, TypeScript 5, MUI 5, Axios |
| Backend | Node.js 20, Express 4, TypeScript 5, mybatis-mapper, oracledb 6 |
| Database | Oracle DB |

> **Note:** The `client/` and `server/` sample apps use React 19 + Express 5 + mysql2. These are demo scaffolds only. The Antigravity skill targets React 18 + Express 4 + Oracle.

### VB6 → Modern mapping

| VB6 | React/Node target |
|-----|-------------------|
| Form (`.frm`) | React component (`.tsx`) |
| CommandButton | MUI `<Button>` |
| TextBox | MUI `<TextField>` |
| ComboBox | MUI `<Select>` |
| DataGrid | MUI DataGrid |
| Label | MUI `<Typography>` |
| CheckBox | MUI `<Checkbox>` |
| OptionButton | MUI `<Radio>` |
| Class (`.cls`) | TypeScript class |
| Module (`.bas`) | TypeScript service / controller |
| `Property` | TypeScript interface / type |
| `Sub` | `async` function (void) |
| `Function` | `async` function (with return) |
| ADO `Connection` | Oracle connection pool |
| ADO `Command` | MyBatis mapper statement |
| ADO `Recordset` | Query result array |
| SQL parameters | `#{param}` placeholders |
| `Form_Load` | `useEffect()` hook |
| Button `_Click` | Event handler function |

### SQL extraction

`skills/migrate_skill.js` uses a regex `/SELECT\s+[^;]+;/gi` to extract embedded SQL from `.frm` and `.bas` files. Results are written to `extracted.sql`.

---

## Key Conventions

### Tests
- Root-level tests use **Jest** (`^29.6.1`) + **jsdom** (`^24.0.0`).
- Jest environment is `node` by default; tests manually instantiate jsdom.
- Client tests use `@testing-library/react` with `react-scripts test`.
- No test runner is configured for `server/`.

### Code style
- Root and `skills/` use plain CommonJS (`require`/`module.exports`).
- Migrated output and `.claude/skills/antigravity/templates/` use TypeScript with ES modules.
- `nextjs-app/` uses TypeScript + Tailwind CSS 4.
- `with-cloudinary-app/` uses TypeScript + Tailwind CSS 3 + Prettier.

### File patterns recognized by the Antigravity skill
- `**/*.frm` — VB6 forms
- `**/*.cls` — VB6 classes
- `**/*.bas` — VB6 modules
- `**/*.vbp` — VB6 project files

### Adding new migration prompts
Place `.md` prompt files in `.claude/skills/antigravity/prompts/` and register them in `skill.yaml` under the appropriate command.

### Adding new code templates
Place template files in `.claude/skills/antigravity/templates/`. Reference them in the relevant prompt file.

---

## Dependencies at a Glance

| Project | Key deps |
|---------|---------|
| Root | jest ^29, jsdom ^24 |
| `client/` | react ^19, react-scripts 5, @testing-library/* |
| `server/` | express ^5, mysql2 ^3 |
| `nextjs-app/` | next 16, react 19, tailwindcss ^4, typescript ^5 |
| `with-cloudinary-app/` | next latest, react ^18, cloudinary ^1, framer-motion ^7 |
