import { Todo } from '../state';
import getTemporaryId from '../temp-id';

describe('getTemporaryId', () => {
    const test = (existingTodoId: number, expectedNewTodoId: number) => {
        it(`gets the lowest negative value (existing: ${existingTodoId}, expected: ${expectedNewTodoId})`, () => {
            const todos: Todo[] = [
                {
                    id: existingTodoId,
                    text: 'text',
                    isCompleted: false,
                    isPersisted: false
                },
            ];

            expect(getTemporaryId(todos)).toBe(expectedNewTodoId);
        });
    };

    test(5, -1);
    test(0, -1);
    test(-5, -6);
});