# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This repository is a VB6-to-modern-stack migration toolkit ("Antigravity"). It contains:
- A static `index.html` (Korean "Hello World" page)
- Migration skills that scaffold React + Express + MyBatis projects from VB6 legacy code
- A sample React client app (Create React App)
- A sample Express server with MySQL
- Claude Code custom skills for automated VB6 analysis and migration

## Commands

### Root-level tests (Jest + jsdom)
```bash
npm test                    # Run all tests
npx jest tests/index.test.js  # Run a single test file
```

### Client (React, Create React App)
```bash
cd client && npm start      # Dev server on port 3000
cd client && npm run build  # Production build
cd client && npm test        # React tests (interactive watch mode)
```

### Migration skill
```bash
node migrate.js             # Run full migration scaffold (creates client/, server/, extracted.sql)
```

### View index.html locally
```bash
python -m http.server 8000  # Then open http://localhost:8000
```

## Architecture

### Migration Skills (`skills/` and `.claude/skills/antigravity/`)
Two layers of migration tooling:
1. **`skills/migrate_skill.js`** — Node script that scaffolds a React app (CRA), Express server, MyBatis mapper XML, and extracts embedded SQL from `.frm`/`.bas` files
2. **`.claude/skills/antigravity/`** — Claude Code skill with prompt templates (`prompts/`) and code templates (`templates/`) for VB6-to-TypeScript migration targeting React 18 + Vite + Express + Oracle/MyBatis

### Target migration stack
- **Frontend:** React 18, Vite, TypeScript, MUI, Axios
- **Backend:** Node.js, Express, TypeScript, MyBatis (mybatis-mapper), Oracle DB

### Key directories
- `client/` — Create React App project (React 19, react-scripts)
- `server/` — Express 5 + mysql2 server skeleton
- `test-vb6-project/` — Sample VB6 project with migrated output in `migrated/`
- `tests/` — Jest tests for root `index.html` (uses jsdom)
- `skills/` — Migration scaffold scripts
- `.claude/skills/antigravity/` — Claude Code skill prompts and TypeScript templates
