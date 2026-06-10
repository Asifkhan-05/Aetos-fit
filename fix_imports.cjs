const fs = require('fs');

const files = fs.readdirSync('src').filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

files.forEach(f => {
  let content = fs.readFileSync('src/' + f, 'utf8');
  content = content.replace(/from\s+['"]\.\/pages\/(.*?)['"]/g, "from './$1'");
  content = content.replace(/from\s+['"]\.\/components\/layout\/(.*?)['"]/g, "from './$1'");
  content = content.replace(/from\s+['"]\.\.\/pages\/(.*?)['"]/g, "from './$1'");
  content = content.replace(/from\s+['"]\.\.\/components\/layout\/(.*?)['"]/g, "from './$1'");
  fs.writeFileSync('src/' + f, content);
});

console.log("Imports fixed.");
