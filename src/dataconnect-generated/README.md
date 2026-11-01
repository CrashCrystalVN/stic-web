# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListRegistrations*](#listregistrations)
  - [*GetRegistrationById*](#getregistrationbyid)
  - [*ListDepartments*](#listdepartments)
  - [*ListClubProjects*](#listclubprojects)
- [**Mutations**](#mutations)
  - [*CreateRegistration*](#createregistration)
  - [*UpdateRegistrationStatus*](#updateregistrationstatus)
  - [*CreateClubProject*](#createclubproject)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListRegistrations
You can execute the `ListRegistrations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listRegistrations(options?: ExecuteQueryOptions): QueryPromise<ListRegistrationsData, undefined>;

interface ListRegistrationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListRegistrationsData, undefined>;
}
export const listRegistrationsRef: ListRegistrationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listRegistrations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListRegistrationsData, undefined>;

interface ListRegistrationsRef {
  ...
  (dc: DataConnect): QueryRef<ListRegistrationsData, undefined>;
}
export const listRegistrationsRef: ListRegistrationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listRegistrationsRef:
```typescript
const name = listRegistrationsRef.operationName;
console.log(name);
```

### Variables
The `ListRegistrations` query has no variables.
### Return Type
Recall that executing the `ListRegistrations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListRegistrationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListRegistrationsData {
  registrations: ({
    id: UUIDString;
    fullName: string;
    grade: string;
    phone: string;
    email: string;
    facebook: string;
    reason: string;
    interests?: string | null;
    pastClubExperience?: string | null;
    pastStemExperience?: string | null;
    projectDescription?: string | null;
    ideaExecution?: string | null;
    commitment: string;
    status: string;
    createdAt: TimestampString;
  } & Registration_Key)[];
}
```
### Using `ListRegistrations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listRegistrations } from '@dataconnect/generated';


// Call the `listRegistrations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listRegistrations();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listRegistrations(dataConnect);

console.log(data.registrations);

// Or, you can use the `Promise` API.
listRegistrations().then((response) => {
  const data = response.data;
  console.log(data.registrations);
});
```

### Using `ListRegistrations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listRegistrationsRef } from '@dataconnect/generated';


// Call the `listRegistrationsRef()` function to get a reference to the query.
const ref = listRegistrationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listRegistrationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.registrations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.registrations);
});
```

## GetRegistrationById
You can execute the `GetRegistrationById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getRegistrationById(vars: GetRegistrationByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetRegistrationByIdData, GetRegistrationByIdVariables>;

interface GetRegistrationByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRegistrationByIdVariables): QueryRef<GetRegistrationByIdData, GetRegistrationByIdVariables>;
}
export const getRegistrationByIdRef: GetRegistrationByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getRegistrationById(dc: DataConnect, vars: GetRegistrationByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetRegistrationByIdData, GetRegistrationByIdVariables>;

interface GetRegistrationByIdRef {
  ...
  (dc: DataConnect, vars: GetRegistrationByIdVariables): QueryRef<GetRegistrationByIdData, GetRegistrationByIdVariables>;
}
export const getRegistrationByIdRef: GetRegistrationByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getRegistrationByIdRef:
```typescript
const name = getRegistrationByIdRef.operationName;
console.log(name);
```

### Variables
The `GetRegistrationById` query requires an argument of type `GetRegistrationByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetRegistrationByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetRegistrationById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetRegistrationByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetRegistrationByIdData {
  registration?: {
    id: UUIDString;
    fullName: string;
    grade: string;
    phone: string;
    email: string;
    facebook: string;
    reason: string;
    interests?: string | null;
    status: string;
    createdAt: TimestampString;
  } & Registration_Key;
}
```
### Using `GetRegistrationById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getRegistrationById, GetRegistrationByIdVariables } from '@dataconnect/generated';

// The `GetRegistrationById` query requires an argument of type `GetRegistrationByIdVariables`:
const getRegistrationByIdVars: GetRegistrationByIdVariables = {
  id: ..., 
};

// Call the `getRegistrationById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getRegistrationById(getRegistrationByIdVars);
// Variables can be defined inline as well.
const { data } = await getRegistrationById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getRegistrationById(dataConnect, getRegistrationByIdVars);

console.log(data.registration);

// Or, you can use the `Promise` API.
getRegistrationById(getRegistrationByIdVars).then((response) => {
  const data = response.data;
  console.log(data.registration);
});
```

### Using `GetRegistrationById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getRegistrationByIdRef, GetRegistrationByIdVariables } from '@dataconnect/generated';

// The `GetRegistrationById` query requires an argument of type `GetRegistrationByIdVariables`:
const getRegistrationByIdVars: GetRegistrationByIdVariables = {
  id: ..., 
};

// Call the `getRegistrationByIdRef()` function to get a reference to the query.
const ref = getRegistrationByIdRef(getRegistrationByIdVars);
// Variables can be defined inline as well.
const ref = getRegistrationByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getRegistrationByIdRef(dataConnect, getRegistrationByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.registration);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.registration);
});
```

## ListDepartments
You can execute the `ListDepartments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listDepartments(options?: ExecuteQueryOptions): QueryPromise<ListDepartmentsData, undefined>;

interface ListDepartmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDepartmentsData, undefined>;
}
export const listDepartmentsRef: ListDepartmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listDepartments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListDepartmentsData, undefined>;

interface ListDepartmentsRef {
  ...
  (dc: DataConnect): QueryRef<ListDepartmentsData, undefined>;
}
export const listDepartmentsRef: ListDepartmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listDepartmentsRef:
```typescript
const name = listDepartmentsRef.operationName;
console.log(name);
```

### Variables
The `ListDepartments` query has no variables.
### Return Type
Recall that executing the `ListDepartments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListDepartmentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListDepartmentsData {
  departments: ({
    id: UUIDString;
    name: string;
    code: string;
    description: string;
    tags?: string | null;
    order: number;
  } & Department_Key)[];
}
```
### Using `ListDepartments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listDepartments } from '@dataconnect/generated';


// Call the `listDepartments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listDepartments();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listDepartments(dataConnect);

console.log(data.departments);

// Or, you can use the `Promise` API.
listDepartments().then((response) => {
  const data = response.data;
  console.log(data.departments);
});
```

### Using `ListDepartments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listDepartmentsRef } from '@dataconnect/generated';


// Call the `listDepartmentsRef()` function to get a reference to the query.
const ref = listDepartmentsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listDepartmentsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.departments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.departments);
});
```

## ListClubProjects
You can execute the `ListClubProjects` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listClubProjects(options?: ExecuteQueryOptions): QueryPromise<ListClubProjectsData, undefined>;

interface ListClubProjectsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListClubProjectsData, undefined>;
}
export const listClubProjectsRef: ListClubProjectsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listClubProjects(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListClubProjectsData, undefined>;

interface ListClubProjectsRef {
  ...
  (dc: DataConnect): QueryRef<ListClubProjectsData, undefined>;
}
export const listClubProjectsRef: ListClubProjectsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listClubProjectsRef:
```typescript
const name = listClubProjectsRef.operationName;
console.log(name);
```

### Variables
The `ListClubProjects` query has no variables.
### Return Type
Recall that executing the `ListClubProjects` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListClubProjectsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListClubProjectsData {
  clubProjects: ({
    id: UUIDString;
    title: string;
    category: string;
    description: string;
    stage: string;
    progress: number;
    createdAt: TimestampString;
  } & ClubProject_Key)[];
}
```
### Using `ListClubProjects`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listClubProjects } from '@dataconnect/generated';


// Call the `listClubProjects()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listClubProjects();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listClubProjects(dataConnect);

console.log(data.clubProjects);

// Or, you can use the `Promise` API.
listClubProjects().then((response) => {
  const data = response.data;
  console.log(data.clubProjects);
});
```

### Using `ListClubProjects`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listClubProjectsRef } from '@dataconnect/generated';


// Call the `listClubProjectsRef()` function to get a reference to the query.
const ref = listClubProjectsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listClubProjectsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.clubProjects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.clubProjects);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateRegistration
You can execute the `CreateRegistration` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createRegistration(vars: CreateRegistrationVariables): MutationPromise<CreateRegistrationData, CreateRegistrationVariables>;

interface CreateRegistrationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRegistrationVariables): MutationRef<CreateRegistrationData, CreateRegistrationVariables>;
}
export const createRegistrationRef: CreateRegistrationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createRegistration(dc: DataConnect, vars: CreateRegistrationVariables): MutationPromise<CreateRegistrationData, CreateRegistrationVariables>;

interface CreateRegistrationRef {
  ...
  (dc: DataConnect, vars: CreateRegistrationVariables): MutationRef<CreateRegistrationData, CreateRegistrationVariables>;
}
export const createRegistrationRef: CreateRegistrationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createRegistrationRef:
```typescript
const name = createRegistrationRef.operationName;
console.log(name);
```

### Variables
The `CreateRegistration` mutation requires an argument of type `CreateRegistrationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateRegistrationVariables {
  fullName: string;
  grade: string;
  phone: string;
  email: string;
  facebook: string;
  reason: string;
  interests?: string | null;
  pastClubExperience?: string | null;
  pastStemExperience?: string | null;
  projectDescription?: string | null;
  ideaExecution?: string | null;
  commitment: string;
}
```
### Return Type
Recall that executing the `CreateRegistration` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateRegistrationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateRegistrationData {
  registration_insert: Registration_Key;
}
```
### Using `CreateRegistration`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createRegistration, CreateRegistrationVariables } from '@dataconnect/generated';

// The `CreateRegistration` mutation requires an argument of type `CreateRegistrationVariables`:
const createRegistrationVars: CreateRegistrationVariables = {
  fullName: ..., 
  grade: ..., 
  phone: ..., 
  email: ..., 
  facebook: ..., 
  reason: ..., 
  interests: ..., // optional
  pastClubExperience: ..., // optional
  pastStemExperience: ..., // optional
  projectDescription: ..., // optional
  ideaExecution: ..., // optional
  commitment: ..., 
};

// Call the `createRegistration()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createRegistration(createRegistrationVars);
// Variables can be defined inline as well.
const { data } = await createRegistration({ fullName: ..., grade: ..., phone: ..., email: ..., facebook: ..., reason: ..., interests: ..., pastClubExperience: ..., pastStemExperience: ..., projectDescription: ..., ideaExecution: ..., commitment: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createRegistration(dataConnect, createRegistrationVars);

console.log(data.registration_insert);

// Or, you can use the `Promise` API.
createRegistration(createRegistrationVars).then((response) => {
  const data = response.data;
  console.log(data.registration_insert);
});
```

### Using `CreateRegistration`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createRegistrationRef, CreateRegistrationVariables } from '@dataconnect/generated';

// The `CreateRegistration` mutation requires an argument of type `CreateRegistrationVariables`:
const createRegistrationVars: CreateRegistrationVariables = {
  fullName: ..., 
  grade: ..., 
  phone: ..., 
  email: ..., 
  facebook: ..., 
  reason: ..., 
  interests: ..., // optional
  pastClubExperience: ..., // optional
  pastStemExperience: ..., // optional
  projectDescription: ..., // optional
  ideaExecution: ..., // optional
  commitment: ..., 
};

// Call the `createRegistrationRef()` function to get a reference to the mutation.
const ref = createRegistrationRef(createRegistrationVars);
// Variables can be defined inline as well.
const ref = createRegistrationRef({ fullName: ..., grade: ..., phone: ..., email: ..., facebook: ..., reason: ..., interests: ..., pastClubExperience: ..., pastStemExperience: ..., projectDescription: ..., ideaExecution: ..., commitment: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createRegistrationRef(dataConnect, createRegistrationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.registration_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.registration_insert);
});
```

## UpdateRegistrationStatus
You can execute the `UpdateRegistrationStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateRegistrationStatus(vars: UpdateRegistrationStatusVariables): MutationPromise<UpdateRegistrationStatusData, UpdateRegistrationStatusVariables>;

interface UpdateRegistrationStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateRegistrationStatusVariables): MutationRef<UpdateRegistrationStatusData, UpdateRegistrationStatusVariables>;
}
export const updateRegistrationStatusRef: UpdateRegistrationStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateRegistrationStatus(dc: DataConnect, vars: UpdateRegistrationStatusVariables): MutationPromise<UpdateRegistrationStatusData, UpdateRegistrationStatusVariables>;

interface UpdateRegistrationStatusRef {
  ...
  (dc: DataConnect, vars: UpdateRegistrationStatusVariables): MutationRef<UpdateRegistrationStatusData, UpdateRegistrationStatusVariables>;
}
export const updateRegistrationStatusRef: UpdateRegistrationStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateRegistrationStatusRef:
```typescript
const name = updateRegistrationStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateRegistrationStatus` mutation requires an argument of type `UpdateRegistrationStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateRegistrationStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateRegistrationStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateRegistrationStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateRegistrationStatusData {
  registration_update?: Registration_Key | null;
}
```
### Using `UpdateRegistrationStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateRegistrationStatus, UpdateRegistrationStatusVariables } from '@dataconnect/generated';

// The `UpdateRegistrationStatus` mutation requires an argument of type `UpdateRegistrationStatusVariables`:
const updateRegistrationStatusVars: UpdateRegistrationStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateRegistrationStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateRegistrationStatus(updateRegistrationStatusVars);
// Variables can be defined inline as well.
const { data } = await updateRegistrationStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateRegistrationStatus(dataConnect, updateRegistrationStatusVars);

console.log(data.registration_update);

// Or, you can use the `Promise` API.
updateRegistrationStatus(updateRegistrationStatusVars).then((response) => {
  const data = response.data;
  console.log(data.registration_update);
});
```

### Using `UpdateRegistrationStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateRegistrationStatusRef, UpdateRegistrationStatusVariables } from '@dataconnect/generated';

// The `UpdateRegistrationStatus` mutation requires an argument of type `UpdateRegistrationStatusVariables`:
const updateRegistrationStatusVars: UpdateRegistrationStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateRegistrationStatusRef()` function to get a reference to the mutation.
const ref = updateRegistrationStatusRef(updateRegistrationStatusVars);
// Variables can be defined inline as well.
const ref = updateRegistrationStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateRegistrationStatusRef(dataConnect, updateRegistrationStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.registration_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.registration_update);
});
```

## CreateClubProject
You can execute the `CreateClubProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createClubProject(vars: CreateClubProjectVariables): MutationPromise<CreateClubProjectData, CreateClubProjectVariables>;

interface CreateClubProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateClubProjectVariables): MutationRef<CreateClubProjectData, CreateClubProjectVariables>;
}
export const createClubProjectRef: CreateClubProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createClubProject(dc: DataConnect, vars: CreateClubProjectVariables): MutationPromise<CreateClubProjectData, CreateClubProjectVariables>;

interface CreateClubProjectRef {
  ...
  (dc: DataConnect, vars: CreateClubProjectVariables): MutationRef<CreateClubProjectData, CreateClubProjectVariables>;
}
export const createClubProjectRef: CreateClubProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createClubProjectRef:
```typescript
const name = createClubProjectRef.operationName;
console.log(name);
```

### Variables
The `CreateClubProject` mutation requires an argument of type `CreateClubProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateClubProjectVariables {
  title: string;
  category: string;
  description: string;
  stage: string;
  progress: number;
}
```
### Return Type
Recall that executing the `CreateClubProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateClubProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateClubProjectData {
  clubProject_insert: ClubProject_Key;
}
```
### Using `CreateClubProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createClubProject, CreateClubProjectVariables } from '@dataconnect/generated';

// The `CreateClubProject` mutation requires an argument of type `CreateClubProjectVariables`:
const createClubProjectVars: CreateClubProjectVariables = {
  title: ..., 
  category: ..., 
  description: ..., 
  stage: ..., 
  progress: ..., 
};

// Call the `createClubProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createClubProject(createClubProjectVars);
// Variables can be defined inline as well.
const { data } = await createClubProject({ title: ..., category: ..., description: ..., stage: ..., progress: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createClubProject(dataConnect, createClubProjectVars);

console.log(data.clubProject_insert);

// Or, you can use the `Promise` API.
createClubProject(createClubProjectVars).then((response) => {
  const data = response.data;
  console.log(data.clubProject_insert);
});
```

### Using `CreateClubProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createClubProjectRef, CreateClubProjectVariables } from '@dataconnect/generated';

// The `CreateClubProject` mutation requires an argument of type `CreateClubProjectVariables`:
const createClubProjectVars: CreateClubProjectVariables = {
  title: ..., 
  category: ..., 
  description: ..., 
  stage: ..., 
  progress: ..., 
};

// Call the `createClubProjectRef()` function to get a reference to the mutation.
const ref = createClubProjectRef(createClubProjectVars);
// Variables can be defined inline as well.
const ref = createClubProjectRef({ title: ..., category: ..., description: ..., stage: ..., progress: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createClubProjectRef(dataConnect, createClubProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.clubProject_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.clubProject_insert);
});
```

