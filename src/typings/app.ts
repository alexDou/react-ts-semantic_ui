import React from 'react';
import { AnyAction, ActionCreator, Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SemanticSIZES, SemanticCOLORS } from 'semantic-ui-react'

export type APIConfig = {
    apiBaseUrl: string;
    repos: string;
    q: string;
    sort: string;
    per_page: string;
    page: string;
    defaults: {
        sort: string;
        per_page: number;
    };
};

export interface ActionType {
    type: string;
    payload?: any;
}

export type TDispatch = Dispatch<ActionType>;

export type APIResponse = Promise<ActionType>;

export type ActionCreate = ActionCreator<ThunkAction<Action, ReposActions, void, any>>
export type ThunkActionCreate = ActionCreator<ThunkAction<Promise<Action>, ReposActions, void, any>>;

export interface SearchRepositories {
    search_repos: (
        query: string,
        page: number,
        orderBy?: string,
        per_page?: number
    ) => APIResponse;
}

export interface SessionState {
    pending?: boolean;
    ok?: boolean;
    failure?: boolean;
    message?: string;
}

export interface SessionAction {
    payload: SessionState;
}

export interface TRepos {
    total_count?: number;
    incomplete_results?: boolean;
    items?: any[];
}

export interface SearchState {
    display?: any;
    query?: string;
    repos?: any;
    page?: number;
    per_page?: number;
    shouldFetch?: boolean;
}

export interface SearchAction {
    payload: SearchState;
}

export interface AppState {
    session: SessionState;
    repos: SearchState;
    getSearch(query: string, page: number): TDispatch;
    setSearchQuery(query: string): TDispatch;
    setPage(page: number, shouldFetch: boolean): TDispatch;
}

export interface ProjectsProps {
    num: number;
}

export interface ReposActions {
    getSearch: () => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

export type RootProps = {
    iniStore: SessionState & SearchState;
    children: React.ReactNode;
};

export interface SearchProps {
    size: SemanticSIZES;
    color: SemanticCOLORS;
    stacked: boolean;
    disabled: boolean;
    query: string;
}

export interface SearchFormProps extends SearchProps {
    onFormSubmit(searchQ: string): void;
}

export type ErrorProps = {
    error: string;
}

export type TFooterProps = {
    pages: number;
    active: number;
    pageChange(page: number): void;
}
