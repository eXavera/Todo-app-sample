import * as deepFreeze from 'deep-freeze';
import * as assign from 'lodash/assign';
import { createTodo, createTodos } from '../test-data';

import { State, Todo } from '../../state';
import { ReloadTodos, SetLoadedTodos, SetTodoAsPersisted } from '../../actions';
import reducer from '../../reducer';

describe('ReloadTodos', () => {

    it('sets isLoading flag to true', () => {
        const state: State = {
            isLoading: false,
            todos: []
        };

        deepFreeze(state);

        const newState = reducer(state, ReloadTodos());

        expect(newState.isLoading).toBe(true);

    });

});

describe('SetLoadedTodos', () => {

    it('sets isLoading flag to false', () => {
        const state: State = {
            isLoading: true,
            todos: []
        };

        deepFreeze(state);

        const newState = reducer(state, SetLoadedTodos([]));

        expect(newState.isLoading).toBe(false);

    });

    it('sets loaded todos', () => {
        const state: State = {
            isLoading: true,
            todos: []
        };
        const loadedTodos = createTodos(2);

        deepFreeze(state);

        const newState = reducer(state, SetLoadedTodos(loadedTodos));

        expect(newState.todos).toEqual(loadedTodos);

    });

});

describe('SetTodoAsPersisted', () => {
    it('updates id and sests persisted flag to true', () => {
        const tempId = -1;
        const newId = 2004;

        const todo: Todo = {
            id: tempId,
            isCompleted: false,
            text: 'my text',
            isPersisted: false
        };

        const state: State = {
            isLoading: false,
            todos: [todo]
        };

        const expectedState: State = {
            isLoading: false,
            todos: [assign({}, todo, { id: newId, isPersisted: true })]
        };

        deepFreeze(state);

        expect(reducer(state, SetTodoAsPersisted(tempId, newId))).toEqual(expectedState);

    });

});