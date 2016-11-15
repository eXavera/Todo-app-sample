import _ from './lodash-custom';
import { Todo } from './state';

export default function (todos: Todo[]) {
    const todoWithMinId = _.minBy(todos, t => t.id);
    if (todoWithMinId && todoWithMinId.id < 0) {
        return todoWithMinId.id - 1;
    }
    return -1;
};
