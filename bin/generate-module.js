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
    [`${moduleName}.controller.ts`]: `import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ${capitalize(moduleNameOnly)}Service } from "./${moduleName}.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const get${capitalize(moduleNameOnly)}s: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const data = await ${capitalize(moduleNameOnly)}Service.get${capitalize(moduleNameOnly)}s(req.query);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "${capitalize(moduleNameOnly)} fetched successfully",
            data: data,
        });
    }
);

    export const ${capitalize(moduleNameOnly)}Controller = {
        get${capitalize(moduleNameOnly)}s,
    };`,
    [`${moduleName}.service.ts`]: `import QueryBuilder from "../../utils/QueryBuilder";
    import { ${capitalize(moduleNameOnly)}Model } from "./${moduleName}.model";
    
    const get${capitalize(moduleNameOnly)}s = async (query: Record<string, unknown>) => {
        const queryModel = new QueryBuilder(
            ${capitalize(moduleNameOnly)}Model.find({ }), // Initial
            query
        )
            .search(['name']) // Search by name. add more fields if needed
            .filter()
            .sort()
            .paginate()
            .fields();
    
        const queryPromise = queryModel.modelQuery;
        const metaPromise = queryModel.getMeta();
    
        const [data, metaResult] = await Promise.all([queryPromise, metaPromise]);
    
        return {
            data: data,
            meta: metaResult,
        };
    }

    export const ${capitalize(moduleNameOnly)}Service = {
        get${capitalize(moduleNameOnly)}s,
    };`,
    [`${moduleName}.routes.ts`]: `import express from 'express'; 
import { ${capitalize(moduleNameOnly)}Controller } from './${moduleName}.controller';
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
import { I${capitalize(moduleNameOnly)} } from './${moduleName}.interface';
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
