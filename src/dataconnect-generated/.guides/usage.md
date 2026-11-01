# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateRegistration, useUpdateRegistrationStatus, useCreateClubProject, useListRegistrations, useGetRegistrationById, useListDepartments, useListClubProjects } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateRegistration(createRegistrationVars);

const { data, isPending, isSuccess, isError, error } = useUpdateRegistrationStatus(updateRegistrationStatusVars);

const { data, isPending, isSuccess, isError, error } = useCreateClubProject(createClubProjectVars);

const { data, isPending, isSuccess, isError, error } = useListRegistrations();

const { data, isPending, isSuccess, isError, error } = useGetRegistrationById(getRegistrationByIdVars);

const { data, isPending, isSuccess, isError, error } = useListDepartments();

const { data, isPending, isSuccess, isError, error } = useListClubProjects();

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createRegistration, updateRegistrationStatus, createClubProject, listRegistrations, getRegistrationById, listDepartments, listClubProjects } from '@dataconnect/generated';


// Operation CreateRegistration:  For variables, look at type CreateRegistrationVars in ../index.d.ts
const { data } = await CreateRegistration(dataConnect, createRegistrationVars);

// Operation UpdateRegistrationStatus:  For variables, look at type UpdateRegistrationStatusVars in ../index.d.ts
const { data } = await UpdateRegistrationStatus(dataConnect, updateRegistrationStatusVars);

// Operation CreateClubProject:  For variables, look at type CreateClubProjectVars in ../index.d.ts
const { data } = await CreateClubProject(dataConnect, createClubProjectVars);

// Operation ListRegistrations: 
const { data } = await ListRegistrations(dataConnect);

// Operation GetRegistrationById:  For variables, look at type GetRegistrationByIdVars in ../index.d.ts
const { data } = await GetRegistrationById(dataConnect, getRegistrationByIdVars);

// Operation ListDepartments: 
const { data } = await ListDepartments(dataConnect);

// Operation ListClubProjects: 
const { data } = await ListClubProjects(dataConnect);


```