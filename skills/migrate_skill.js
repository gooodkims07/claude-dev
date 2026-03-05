// Simple migration skill
// Invoked with /migrate
// It scaffolds a React app, an Express server, MyBatis mapper, and extracts SQL from VB6 files

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function scaffoldReact() {
  const cmd = 'npx create-react-app client';
  execSync(cmd, {stdio:'inherit'});
}

function scaffoldExpress() {
  fs.mkdirSync('server', {recursive:true});
  execSync('npm init -y', {cwd:'server',stdio:'inherit'});
  execSync('npm install express mysql2', {cwd:'server',stdio:'inherit'});
}

function createMyBatisMapper() {
  const mapper = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE mapper PUBLIC \"-//mybatis.org//DTD Mapper 3.0//EN\" \"http://mybatis.org/dtd/mybatis-3-mapper.dtd\">\n<mapper namespace="UserMapper">\n  <select id="getUserById" resultType="User">\n    SELECT * FROM USERS WHERE USER_ID = #{userId}\n  </select>\n</mapper>`;
  fs.writeFileSync(path.join('server', 'UserMapper.xml'), mapper);
}

function extractSqlFromVB6() {
  const vbFiles = fs.readdirSync('.').filter(f=>f.endsWith('.frm')||f.endsWith('.bas'));
  const sqls = [];
  vbFiles.forEach(file=>{
    const content = fs.readFileSync(file, 'utf-8');
    const regex = /SELECT\s+[^;]+;/gi;
    const matches = content.match(regex) || [];
    sqls.push(...matches);
  });
  fs.writeFileSync('extracted.sql', sqls.join('\n'));
}

module.exports = {
  run: () => {
    console.log('Scaffolding React app...');
    scaffoldReact();
    console.log('Scaffolding Express server...');
    scaffoldExpress();
    console.log('Creating MyBatis mapper...');
    createMyBatisMapper();
    console.log('Extracting SQL from VB6 files...');
    extractSqlFromVB6();
    console.log('Migration scaffold complete.');
  }
};
