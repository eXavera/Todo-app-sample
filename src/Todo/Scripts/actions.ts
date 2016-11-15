import { Action, Dispatch } from 'redux';
import axios from 'axios';

import { State, Todo } from './state';
import getTempId from './temp-id';

export enum TodoActionType {
    AddTodo,
    RemoveTodo,
    MarkTodoAsCompleted,
    ReloadTodos,
    SetLoadedTodos,
    SetTodoAsPersisted
}

// actions
export interface AddTodoAction extends Action {
    type: TodoActionType.AddTodo,
    id: number,
    text: string
}

export interface RemoveTodoAction extends Action {
    type: TodoActionType.RemoveTodo,
    id: number
}

export interface MarkTodoAsCompletedAction extends Action {
    type: TodoActionType.MarkTodoAsCompleted
    id: number
}

export interface ReloadTodosAction extends Action {
    type: TodoActionType.ReloadTodos
}

export interface SetLoadedTodosAction extends Action {
    type: TodoActionType.SetLoadedTodos,
    todos: Todo[]
}

export interface SetTodoAsPersistedAction extends Action {
    type: TodoActionType.SetTodoAsPersisted,
    tempId: number,
    newId: number
}

export type TodoAction = AddTodoAction | RemoveTodoAction | MarkTodoAsCompletedAction | ReloadTodosAction | SetLoadedTodosAction | SetTodoAsPersistedAction;

// action creators
export function AddTodo(id: number, text: string): AddTodoAction {
    return {
        type: TodoActionType.AddTodo,
        id,
        text
    };
}

export function RequestAddTodo(text: string) {
    return function (dispatch: Dispatch<any>, getState: () => State) {
        const tempId = getTempId(getState().todos);

        dispatch(AddTodo(tempId, text));

        return axios.post('/api/todo', { text })
            .then(resp => {
                dispatch(SetTodoAsPersisted(tempId, resp.data.id))
            });
    };
}

export function RemoveTodo(id: number): RemoveTodoAction {
    return {
        type: TodoActionType.RemoveTodo,
        id
    };
}

export function RequestRemoveTodo(id: number) {

    return function (dispatch: Dispatch<any>) {
        dispatch(RemoveTodo(id));

        return axios.delete(`/api/todo/${id}`);
    };
}

export function MarkTodoAsCompleted(id: number): MarkTodoAsCompletedAction {
    return {
        type: TodoActionType.MarkTodoAsCompleted,
        id
    };
}

export function RequestMarkTodoAsCompleted(id: number) {
    return function (dispatch: Dispatch<any>) {
        dispatch(MarkTodoAsCompleted(id));

        return axios.put(`/api/todo/${id}`, { isCompleted: true });
    };
}

export function SetTodoAsPersisted(tempId: number, newId: number): SetTodoAsPersistedAction {
    return {
        type: TodoActionType.SetTodoAsPersisted,
        tempId,
        newId
    };
}

export function ReloadTodos(): ReloadTodosAction {
    return {
        type: TodoActionType.ReloadTodos
    };
}

export function SetLoadedTodos(todos: Todo[]): SetLoadedTodosAction {
    return {
        type: TodoActionType.SetLoadedTodos,
        todos
    };
}

export function RequestTodos() {
    return function (dispatch: Dispatch<any>) {
        dispatch(ReloadTodos());

        return axios.get('/api/todo')
            .then(resp => {
                const data = resp.data as any[];
                const todos: Todo[] = data.map(d => ({ id: d.id, text: d.text, isCompleted: d.isCompleted, isPersisted: true }));
                dispatch(SetLoadedTodos(todos));
            });
    };
}