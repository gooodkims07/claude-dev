// skills/migrate-vb6-to-react-node-mybatis.js

// This is a very lightweight migration "skill". It does NOT actually parse VB6 code
// or extract SQL.  It merely scaffolds the folder structure you will need for a
// React front‑end, an Express/Node back‑end, and a place to keep MyBatis XML and
// Oracle SQL files.  You can later run a custom parser against your .frm files
// to pull out the SELECT/INSERT/UPDATE/DELETE statements and drop them into
// the generated SQL directory.

const fs = require('fs');
const path = require('path');

// Helper to create a directory if it does not exist
const mkdir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// 1. Create base directories
mkdir('src');
mkdir('server');
mkdir('sql');

// 2. Scaffold a minimal React component
const reactApp = `import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Login Form</h1>
      <form>
        <label>
          User ID:
          <input type="text" name="userId" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
`;
fs.writeFileSync(path.join('src', 'App.jsx'), reactApp, 'utf-8');

// 3. Scaffold a minimal Express server
const expressApp = `const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Dummy login endpoint – replace with real MyBatis logic
app.post('/api/login', (req, res) => {
  const { userId, password } = req.body;
  if (userId === 'admin' && password === '1234') {
    return res.json({ success: true, message: 'Login successful' });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
`;
fs.writeFileSync(path.join('server', 'app.js'), expressApp, 'utf-8');

// 4. Scaffold a placeholder MyBatis mapper XML
const mybatisMapper = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="UserMapper">
  <!-- Example query – replace with actual queries extracted from VB6 -->
  <select id="selectUser" parameterType="string" resultType="User">
    SELECT * FROM USERS WHERE USER_ID = #{userId}
  </select>
</mapper>`;
fs.writeFileSync(path.join('sql', 'UserMapper.xml'), mybatisMapper, 'utf-8');

// 5. Create a simple README to explain next steps
const readme = `# Migration Skill – VB6 ➜ React + Node + MyBatis

This skill scaffolds a minimal project structure for migrating a VB6 form to a modern stack:

- **React** front‑end (src/App.jsx)
- **Express** back‑end (server/app.js)
- **MyBatis** mapper placeholder (sql/UserMapper.xml)
- **Oracle SQL** scripts folder (sql/)

## Next Steps
1. **Extract SQL** from your .frm files.  Place any `SELECT`, `INSERT`, `UPDATE`, `DELETE` statements into the `sql/` directory.
2. **Configure MyBatis** in your Node project (you may need a library like `node-mybatis` or use an ORM).  Wire the mapper into the Express routes.
3. **Set up Oracle** connection credentials via environment variables.
4. **Build the React app** (e.g., using Vite or create‑react‑app) and proxy API calls to the Express server.

Happy coding!`;
fs.writeFileSync('README.md', readme, 'utf-8');

console.log('Migration skeleton created!');

