#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const generateModule = (moduleName) => {
  const folderPath = path.join(process.cwd(), moduleName);

  // handle if the module already exists
  if (fs.existsSync(folderPath)) {
    console.error(`Module ${moduleName} already exists.`);
    process.exit(1);
  }

  // handle if the module name is having spaces or hyphens. make it camel case
  const moduleNameParts = moduleName.split(/[\s-]+/);
  let moduleNameOnly = capitalize(moduleNameParts[0]);
  if (moduleNameParts.length > 1) {
    moduleNameOnly = moduleNameParts
      .map((part) => capitalize(part))
      .join('');

    console.log(`Module name converted to ${moduleName}`);
  }



  const files = {
    [`${moduleName}.constant.ts`]: `export const ${capitalize(moduleNameOnly)}Constants = {};`,
    [`${moduleName}.interface.ts`]: `export interface I${capitalize(moduleNameOnly)} {}`,
    [`${moduleName}.controller.ts`]: `export const ${capitalize(moduleNameOnly)}Controller = {};`,
    [`${moduleName}.services.ts`]: `export const ${capitalize(moduleNameOnly)}Service = {};`,
    [`${moduleName}.routes.ts`]: `import express from 'express'; 
    
const router = express.Router(); 

router.get(
'/',
${capitalize(moduleNameOnly)}Controller.get${capitalize(moduleNameOnly)}s
); 
    
export const ${capitalize(moduleNameOnly)}Routes = router;`,

    [`${moduleName}.validation.ts`]: `
    import { z } from 'zod';
  
    const ${moduleNameOnly}ZodSchema = z.object({
      // Define the schema here
      body: z.object({
        // Define the body schema here
      }),

      params: z.object({
        // Define the params schema here
      }),

      query: z.object({
        // Define the query schema here
      }),

      headers: z.object({
        // Define the headers schema here
      }),
    });

    export const ${capitalize(moduleNameOnly)}Validation = {
      // Define the validation functions here
      ${moduleNameOnly}ZodSchema,
    };
    `,
    [`${moduleName}.model.ts`]: `import mongoose from 'mongoose';

const ${capitalize(moduleNameOnly)}Schema = new mongoose.Schema<I${capitalize(moduleNameOnly)}>({});
   
export const ${capitalize(moduleNameOnly)}Model = mongoose.model<I${capitalize(moduleNameOnly)}>('${capitalize(moduleNameOnly)}', ${capitalize(moduleNameOnly)}Schema);`,
    [`${moduleName}.utils.ts`]: `export const ${capitalize(moduleNameOnly)}Utils = {};`,
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
