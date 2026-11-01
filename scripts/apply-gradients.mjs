import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'src/components/ui/Button.tsx',
  'src/components/sections/EventsSection.tsx',
];

for (const relPath of filesToUpdate) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) continue;
  let code = fs.readFileSync(fullPath, 'utf8');

  let count = 0;
  code = code.replace(/(className="[^"]*bg-gradient-to-r[^"]*)(")/g, (match, prefix, suffix) => {
    if (!prefix.includes('animate-gradient-flow')) {
      count++;
      return `${prefix} animate-gradient-flow${suffix}`;
    }
    return match;
  });

  // Also replace in Button.tsx variants
  code = code.replace(/hover:brightness-105(?!\s+animate-gradient-flow)/g, 'hover:brightness-105 animate-gradient-flow');

  fs.writeFileSync(fullPath, code, 'utf8');
  console.log(`Updated ${relPath}`);
}
