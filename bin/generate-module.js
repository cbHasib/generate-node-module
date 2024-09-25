#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const generateModule = (moduleName) => {
  const folderPath = path.join(process.cwd(), moduleName);  

  const files = {
    [`${moduleName}.constant.ts`]: `export const ${capitalize(moduleName)}Constants = {};`,
    [`${moduleName}.interface.ts`]: `export interface ${capitalize(moduleName)}Interface {}`,
    [`${moduleName}.controller.ts`]: `export const ${capitalize(moduleName)}Controller = {};`,
    [`${moduleName}.services.ts`]: `export const ${capitalize(moduleName)}Service = {};`,
    [`${moduleName}.routes.ts`]: `import express from 'express'; 
    
const router = express.Router(); 
    
router.get('/'); 
    
export const ${capitalize(moduleName)}Routes = router;`,
    [`${moduleName}.validation.ts`]: `export const ${capitalize(moduleName)}Validation = {};`,
    [`${moduleName}.model.ts`]: `import mongoose from 'mongoose';

const ${capitalize(moduleName)}Schema = new mongoose.Schema({});
   
export const ${capitalize(moduleName)}Model = mongoose.model('${moduleName}', ${capitalize(moduleName)}Schema);`,
    [`${moduleName}.utils.ts`]: `export const ${capitalize(moduleName)}Utils = {};`,
  };

  fs.ensureDirSync(folderPath);

  for (const [fileName, content] of Object.entries(files)) {
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created ${filePath}`);
  }

  console.log(`Module ${moduleName} generated successfully.`);
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const moduleName = process.argv[2];

if (!moduleName) {
  console.error('Please provide a module name. Usage: generate-module <module-name>');
  process.exit(1);
}

generateModule(moduleName);
