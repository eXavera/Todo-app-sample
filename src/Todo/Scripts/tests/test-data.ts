import { Todo } from '../state';

export function createTodo(n: number): Todo {
    return {
        id: n,
        text: 'text' + Math.abs(n),
        isCompleted: false,
        isPersisted: true
    };
};

export function createTodos(n = 3): Todo[] {
    const result: Todo[] = [];

    for (let i = 1; i <= n; i++) {
        result.push(createTodo(i));
    }

    return result;
};