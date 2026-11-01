import { CreateRegistrationData, CreateRegistrationVariables, UpdateRegistrationStatusData, UpdateRegistrationStatusVariables, CreateClubProjectData, CreateClubProjectVariables, ListRegistrationsData, GetRegistrationByIdData, GetRegistrationByIdVariables, ListDepartmentsData, ListClubProjectsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateRegistration(options?: useDataConnectMutationOptions<CreateRegistrationData, FirebaseError, CreateRegistrationVariables>): UseDataConnectMutationResult<CreateRegistrationData, CreateRegistrationVariables>;
export function useCreateRegistration(dc: DataConnect, options?: useDataConnectMutationOptions<CreateRegistrationData, FirebaseError, CreateRegistrationVariables>): UseDataConnectMutationResult<CreateRegistrationData, CreateRegistrationVariables>;

export function useUpdateRegistrationStatus(options?: useDataConnectMutationOptions<UpdateRegistrationStatusData, FirebaseError, UpdateRegistrationStatusVariables>): UseDataConnectMutationResult<UpdateRegistrationStatusData, UpdateRegistrationStatusVariables>;
export function useUpdateRegistrationStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateRegistrationStatusData, FirebaseError, UpdateRegistrationStatusVariables>): UseDataConnectMutationResult<UpdateRegistrationStatusData, UpdateRegistrationStatusVariables>;

export function useCreateClubProject(options?: useDataConnectMutationOptions<CreateClubProjectData, FirebaseError, CreateClubProjectVariables>): UseDataConnectMutationResult<CreateClubProjectData, CreateClubProjectVariables>;
export function useCreateClubProject(dc: DataConnect, options?: useDataConnectMutationOptions<CreateClubProjectData, FirebaseError, CreateClubProjectVariables>): UseDataConnectMutationResult<CreateClubProjectData, CreateClubProjectVariables>;

export function useListRegistrations(options?: useDataConnectQueryOptions<ListRegistrationsData>): UseDataConnectQueryResult<ListRegistrationsData, undefined>;
export function useListRegistrations(dc: DataConnect, options?: useDataConnectQueryOptions<ListRegistrationsData>): UseDataConnectQueryResult<ListRegistrationsData, undefined>;

export function useGetRegistrationById(vars: GetRegistrationByIdVariables, options?: useDataConnectQueryOptions<GetRegistrationByIdData>): UseDataConnectQueryResult<GetRegistrationByIdData, GetRegistrationByIdVariables>;
export function useGetRegistrationById(dc: DataConnect, vars: GetRegistrationByIdVariables, options?: useDataConnectQueryOptions<GetRegistrationByIdData>): UseDataConnectQueryResult<GetRegistrationByIdData, GetRegistrationByIdVariables>;

export function useListDepartments(options?: useDataConnectQueryOptions<ListDepartmentsData>): UseDataConnectQueryResult<ListDepartmentsData, undefined>;
export function useListDepartments(dc: DataConnect, options?: useDataConnectQueryOptions<ListDepartmentsData>): UseDataConnectQueryResult<ListDepartmentsData, undefined>;

export function useListClubProjects(options?: useDataConnectQueryOptions<ListClubProjectsData>): UseDataConnectQueryResult<ListClubProjectsData, undefined>;
export function useListClubProjects(dc: DataConnect, options?: useDataConnectQueryOptions<ListClubProjectsData>): UseDataConnectQueryResult<ListClubProjectsData, undefined>;
