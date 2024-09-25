# **Generate Node Module**

A command-line tool (CLI) for quickly scaffolding an Express.js module, generating basic TypeScript files with boilerplate code for controllers, services, routes, interfaces, constants, and validations.

## **Installation**

To install the package globally, run the following command:

```bash
npm install -g generate-node-module
```

This allows you to run the `generate-module` command from anywhere on your system.

## **Usage**

Once the package is installed, you can generate a new module by running the following command:

```bash
generate-module <module-name>
```

### **Example**

To generate a module named `admin`, you would run:

```bash
generate-module admin
```

### **Output Structure**

This command will create a folder named `admin` in the current working directory. Inside the `admin` folder, the following files will be generated:

```
admin/
│
├── admin.constant.ts      # Contains constants related to the module
├── admin.controller.ts    # Contains the controller logic for handling routes
├── admin.interface.ts     # Defines interfaces for the module
├── admin.model.ts         # Contains the Mongoose schema and model
├── admin.route.ts         # Sets up the routes for the module
├── admin.services.ts      # Service logic related to the module
├── admin.utils.ts         # Utility functions related to the module
└── admin.validation.ts    # Validation logic for request payloads
```

Each file comes with some basic template code to help you get started quickly.

### **Generated Code**

Here is the template code that will be auto-generated inside each file.

#### **1. admin.constant.ts**

```typescript
export const AdminConstants = { };
```

This file contains constants related to the module. You can add more constants specific to your admin module here.

#### **2. admin.controller.ts**

```typescript
export const AdminController = { }
```

This file is the controller, where you will handle incoming HTTP requests for the admin routes.

#### **3. admin.interface.ts**

```typescript
export interface AdminInterface {}
```

This file defines the interfaces for the module. You can extend or modify the interface to match the requirements of your application.

#### **4. admin.model.ts**

```typescript
import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({});
   
export const AdminModel = mongoose.model('admin', AdminSchema);
```

The model file contains the Mongoose schema and model for the admin module. You can define the schema fields and data types as needed.

#### **5. admin.route.ts**

```typescript
import express from 'express'; 
    
const router = express.Router(); 
    
router.get('/'); 
    
export const AdminRoutes = router;
```

The route file defines how requests will be routed to the corresponding controller logic. You can add more routes as necessary.

#### **6. admin.services.ts**

```typescript
export const AdminService = {};
```

This file contains business logic related to the admin module. It handles database calls and other services.


#### **7. admin.utils.ts**

```typescript
export const AdminUtils = {};
```

This file contains utility functions related to the admin module.

#### **8. admin.validation.ts**

```typescript
export const AdminValidation = {};
```

This file contains validation logic for the module.


## **How to Integrate the Generated Module**

Once the module is generated, follow these steps to integrate it into your Express application:

1. **Import the Route in Your App**:

   Open your main `app.ts` or `server.ts` file, where you configure your routes, and import the generated route file.

   ```typescript
   import adminRoute from './admin/admin.route';
   
   app.use('/api', adminRoute);
   ```

2. **Use the Routes**:

   Now, when your server is running, you can access the admin routes via `http://localhost:<port>/api/admin`.

## **Examples**

### **Generating a User Module**

To generate a `user` module, simply run:

```bash
generate-module user
```

This will create a `user/` folder with the same structure and files as shown above, but specific to the `user` module.

### **Adding Routes to App**

1. Import the generated `user.route.ts` file in your `app.ts`:

   ```typescript
   import userRoute from './user/user.route';
   app.use('/api', userRoute);
   ```

2. Access the route at `http://localhost:<port>/api/user`.

### **Customizing the Boilerplate Code**

Feel free to customize the generated files to fit your business logic. The tool provides a basic structure, but you can easily expand upon it.

## **Versioning**

This project uses [Semantic Versioning](https://semver.org/). 

## **Authors**

## [Md Hasibul Hasan](https://github.com/cbHasib)

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
