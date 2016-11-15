import * as React from 'react';
import * as classNames from 'classnames';
import { Todo } from '../state';

interface TodoItemProps {
    todo: Todo,
    onRemove: (id: number) => void,
    markAsCompleted: (id: number) => void
};

export default function (props: TodoItemProps) {
    const todo = props.todo;

    return (
        <div className={'panel ' + (todo.isCompleted ? 'panel-success' : 'panel-default')}>
            <div className="panel-heading">
                <span title="Mark as Done" className={'clickable glyphicon glyphicon-ok' + classNames({ 'hidden': todo.isCompleted })}
                    onClick={() => props.markAsCompleted(todo.id)}></span>
                {' ' + todo.text}
                {todo.isPersisted && <div className="pull-right">
                    <span className="clickable glyphicon glyphicon-trash" title="Remove" onClick={() => props.onRemove(todo.id)}></span>
                </div>}
            </div>
        </div>
    );
};