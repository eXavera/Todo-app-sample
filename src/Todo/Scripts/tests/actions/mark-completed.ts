import * as deepFreeze from 'deep-freeze';
import { createTodo, createTodos } from '../test-data';

import { State } from '../../state';
import { MarkTodoAsCompleted } from '../../actions';
import reducer from '../../reducer';

describe('MarkAsCompleted', () => {

    it('sets completed flag to true', () => {
        const [todo1, todo2] = createTodos(2);

        const state: State = {
            isLoading: false,
            todos: [todo1, todo2]
        };

        const updatedTodo = createTodo(1);
        updatedTodo.isCompleted = true;

        const expectedState: State = {
            isLoading: false,
            todos: [updatedTodo, todo2]
        };

        deepFreeze(state);

        expect(reducer(state, MarkTodoAsCompleted(1))).toEqual(expectedState);
    });

    it('does not modify state if no mathing todo is found', () => {
        const [todo1, todo2] = createTodos(2);

        const state: State = {
            isLoading: false,
            todos: [todo1, todo2]
        };

        deepFreeze(state);

        expect(reducer(state, MarkTodoAsCompleted(3))).toEqual(state);
    });

    it('does not modify state if mathing todo is not persisted yet', () => {
        const [todo1, todo2] = createTodos(2);
        todo1.isPersisted = false;

        const state: State = {
            isLoading: false,
            todos: [todo1, todo2]
        };

        deepFreeze(state);

        expect(reducer(state, MarkTodoAsCompleted(1))).toEqual(state);
    });

});