const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name');
  process.exit(1);
}

const componentDir = path.join(__dirname, '../src/components', componentName);

// Create component directory
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// JSX template
const jsxTemplate = `import React from 'react';
import styles from './${componentName}.module.scss';

export default function ${componentName}() {
  return (
    <div>
      ${componentName}
    </div>
  );
}
`;

// SCSS template
const scssTemplate = ``;

// Create files
fs.writeFileSync(path.join(componentDir, `${componentName}.jsx`), jsxTemplate);
fs.writeFileSync(path.join(componentDir, `${componentName}.module.scss`), scssTemplate);

console.log(`✨ Component ${componentName} created successfully!`);
