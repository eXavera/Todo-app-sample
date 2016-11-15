import * as deepFreeze from 'deep-freeze';

import { createTodo } from '../test-data';
import { State } from '../../state';
import { AddTodo } from '../../actions';
import reducer from '../../reducer';

describe('AddTodo', () => {
    it('adds todo to empty array', () => {
        const id = -1;
        const state: State = {
            isLoading: false,
            todos: []
        };

        const expectedState: State = {
            isLoading: false,
            todos: [
                {
                    id,
                    text: 'my text',
                    isCompleted: false,
                    isPersisted: false
                }
            ]
        };

        deepFreeze(state);

        expect(reducer(state, AddTodo(id, 'my text'))).toEqual(expectedState);
    });

    it('appends todo to existing array', () => {
        const firstTodo = createTodo(-1);

        const state: State = {
            isLoading: false,
            todos: [firstTodo]
        };

        const id = -2;
        const expectedState: State = {
            isLoading: false,
            todos: [firstTodo,
                {
                    id,
                    text: 'my text',
                    isCompleted: false,
                    isPersisted: false
                }
            ]
        };

        deepFreeze(state);

        expect(reducer(state, AddTodo(id, 'my text'))).toEqual(expectedState);
    });
});