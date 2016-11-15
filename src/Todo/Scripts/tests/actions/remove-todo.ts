import * as deepFreeze from 'deep-freeze';
import { createTodo, createTodos } from '../test-data';

import { State } from '../../state';
import { RemoveTodo } from '../../actions';
import reducer from '../../reducer';

describe('RemoveTodo', () => {

    it('removes todo (in the middle)', () => {
        const [todo1, todo2, todo3] = createTodos();

        const state: State = {
            isLoading: false,
            todos: [todo1, todo2, todo3]
        };

        const expectedState: State = {
            isLoading: false,
            todos: [todo1, todo3]
        };

        deepFreeze(state);

        expect(reducer(state, RemoveTodo(todo2.id))).toEqual(expectedState);
    });

    it('removes todo (the first)', () => {
        const [todo1, todo2, todo3] = createTodos();

        const state: State = {
            isLoading: false,
            todos: [todo1, todo2, todo3]
        };

        const expectedState: State = {
            isLoading: false,
            todos: [todo2, todo3]
        };

        deepFreeze(state);

        expect(reducer(state, RemoveTodo(todo1.id))).toEqual(expectedState);
    });

    it('removes todo (the last)', () => {
        const [todo1, todo2, todo3] = createTodos();

        const state: State = {
            isLoading: false,
            todos: [todo1, todo2, todo3]
        };

        const expectedState: State = {
            isLoading: false,
            todos: [todo1, todo2]
        };

        deepFreeze(state);

        expect(reducer(state, RemoveTodo(todo3.id))).toEqual(expectedState);
    });

    it('does not modify state if todo is not persisted yet', () => {
        const [todo1, todo2, todo3] = createTodos();
        todo2.isPersisted = false;

        const state: State = {
            isLoading: false,
            todos: [todo1, todo2, todo3]
        };

        deepFreeze(state);

        expect(reducer(state, RemoveTodo(todo2.id))).toEqual(state);
    });

});