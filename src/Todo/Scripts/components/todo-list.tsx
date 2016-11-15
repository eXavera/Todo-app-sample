import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import TodoItem from './todo-item';
import { State, Todo } from '../state';
import { RequestRemoveTodo, RequestMarkTodoAsCompleted } from '../actions';

const Loading = function () {
    return (
        <div className="progress">
            <div className="progress-bar progress-bar-striped active" style={{ width: '100%' }}>
                Loading, please wait ...
            </div>
        </div>
    );
};

interface TodoListProps {
    todos: Todo[],
    isLoading: boolean
};

interface TodoListDispatchProps {
    onRemove: (id: number) => void,
    markAsCompleted: (id: number) => void
};

const TodoList = function (props: TodoListProps & TodoListDispatchProps) {
    return (
        <div>
            {props.isLoading ? <Loading /> : props.todos.map(todo => <TodoItem key={todo.id} todo={todo} onRemove={props.onRemove} markAsCompleted={props.markAsCompleted} />)}
        </div>
    );
};

const mapDispatchToProps = function (dispatch: Dispatch<any>): TodoListDispatchProps {
    return {
        onRemove: (id) => {
            dispatch(RequestRemoveTodo(id));
        },
        markAsCompleted: (id) => {
            dispatch(RequestMarkTodoAsCompleted(id));
        }
    };
};

const mapStateToProps = function (state: State): TodoListProps {
    return {
        isLoading: state.isLoading,
        todos: state.todos
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);