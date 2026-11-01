import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface ClubProject_Key {
  id: UUIDString;
  __typename?: 'ClubProject_Key';
}

export interface CreateClubProjectData {
  clubProject_insert: ClubProject_Key;
}

export interface CreateClubProjectVariables {
  title: string;
  category: string;
  description: string;
  stage: string;
  progress: number;
}

export interface CreateRegistrationData {
  registration_insert: Registration_Key;
}

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

export interface Department_Key {
  id: UUIDString;
  __typename?: 'Department_Key';
}

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

export interface GetRegistrationByIdVariables {
  id: UUIDString;
}

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

export interface Registration_Key {
  id: UUIDString;
  __typename?: 'Registration_Key';
}

export interface UpdateRegistrationStatusData {
  registration_update?: Registration_Key | null;
}

export interface UpdateRegistrationStatusVariables {
  id: UUIDString;
  status: string;
}

interface CreateRegistrationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRegistrationVariables): MutationRef<CreateRegistrationData, CreateRegistrationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateRegistrationVariables): MutationRef<CreateRegistrationData, CreateRegistrationVariables>;
  operationName: string;
}
export const createRegistrationRef: CreateRegistrationRef;

export function createRegistration(vars: CreateRegistrationVariables): MutationPromise<CreateRegistrationData, CreateRegistrationVariables>;
export function createRegistration(dc: DataConnect, vars: CreateRegistrationVariables): MutationPromise<CreateRegistrationData, CreateRegistrationVariables>;

interface UpdateRegistrationStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateRegistrationStatusVariables): MutationRef<UpdateRegistrationStatusData, UpdateRegistrationStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateRegistrationStatusVariables): MutationRef<UpdateRegistrationStatusData, UpdateRegistrationStatusVariables>;
  operationName: string;
}
export const updateRegistrationStatusRef: UpdateRegistrationStatusRef;

export function updateRegistrationStatus(vars: UpdateRegistrationStatusVariables): MutationPromise<UpdateRegistrationStatusData, UpdateRegistrationStatusVariables>;
export function updateRegistrationStatus(dc: DataConnect, vars: UpdateRegistrationStatusVariables): MutationPromise<UpdateRegistrationStatusData, UpdateRegistrationStatusVariables>;

interface CreateClubProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateClubProjectVariables): MutationRef<CreateClubProjectData, CreateClubProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateClubProjectVariables): MutationRef<CreateClubProjectData, CreateClubProjectVariables>;
  operationName: string;
}
export const createClubProjectRef: CreateClubProjectRef;

export function createClubProject(vars: CreateClubProjectVariables): MutationPromise<CreateClubProjectData, CreateClubProjectVariables>;
export function createClubProject(dc: DataConnect, vars: CreateClubProjectVariables): MutationPromise<CreateClubProjectData, CreateClubProjectVariables>;

interface ListRegistrationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListRegistrationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListRegistrationsData, undefined>;
  operationName: string;
}
export const listRegistrationsRef: ListRegistrationsRef;

export function listRegistrations(options?: ExecuteQueryOptions): QueryPromise<ListRegistrationsData, undefined>;
export function listRegistrations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListRegistrationsData, undefined>;

interface GetRegistrationByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRegistrationByIdVariables): QueryRef<GetRegistrationByIdData, GetRegistrationByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetRegistrationByIdVariables): QueryRef<GetRegistrationByIdData, GetRegistrationByIdVariables>;
  operationName: string;
}
export const getRegistrationByIdRef: GetRegistrationByIdRef;

export function getRegistrationById(vars: GetRegistrationByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetRegistrationByIdData, GetRegistrationByIdVariables>;
export function getRegistrationById(dc: DataConnect, vars: GetRegistrationByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetRegistrationByIdData, GetRegistrationByIdVariables>;

interface ListDepartmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDepartmentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListDepartmentsData, undefined>;
  operationName: string;
}
export const listDepartmentsRef: ListDepartmentsRef;

export function listDepartments(options?: ExecuteQueryOptions): QueryPromise<ListDepartmentsData, undefined>;
export function listDepartments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListDepartmentsData, undefined>;

interface ListClubProjectsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListClubProjectsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListClubProjectsData, undefined>;
  operationName: string;
}
export const listClubProjectsRef: ListClubProjectsRef;

export function listClubProjects(options?: ExecuteQueryOptions): QueryPromise<ListClubProjectsData, undefined>;
export function listClubProjects(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListClubProjectsData, undefined>;

