import _ from './lodash-custom';
import { State, Todo } from './state';
import { TodoActionType, TodoAction } from './actions';

const reduceIsLoading = function (isLoading: boolean, action: TodoAction) {
    switch (action.type) {
        case TodoActionType.ReloadTodos:
            return true;
        case TodoActionType.SetLoadedTodos:
            return false;
        default:
            return isLoading;
    }
};

const reduceTodos = function (todos: Todo[], action: TodoAction) {
    switch (action.type) {
        case TodoActionType.AddTodo:
            return [
                ...todos,
                {
                    id: action.id,
                    text: action.text,
                    isCompleted: false,
                    isPersisted: false
                }
            ];

        case TodoActionType.RemoveTodo:
            const indexToRemove = _.findIndex(todos, t => t.id === action.id && t.isPersisted);
            if (indexToRemove === -1) {
                return todos;
            }

            return todos.filter((t, index) => index !== indexToRemove);

        case TodoActionType.MarkTodoAsCompleted:
            return todos.map(todo => {
                if (todo.id === action.id && todo.isPersisted) {
                    return _.assign({}, todo, { isCompleted: true });
                }
                return todo;
            });

        case TodoActionType.SetTodoAsPersisted:
            return todos.map(todo => {
                if (todo.id === action.tempId) {
                    return _.assign({}, todo, { id: action.newId, isPersisted: true });
                }
                return todo;
            });

        case TodoActionType.SetLoadedTodos:
            return action.todos;

        default:
            return todos;
    }
};

export default function (state: State, action: TodoAction): State {
    if (typeof state === 'undefined') {
        return {
            isLoading: true,
            todos: []
        };
    }

    return {
        isLoading: reduceIsLoading(state.isLoading, action),
        todos: reduceTodos(state.todos, action)
    };
}