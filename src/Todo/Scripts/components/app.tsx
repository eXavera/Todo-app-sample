import * as React from 'react';
import AddForm from './add-form';
import TodoList from './todo-list';

const App = function () {
    return (<div>
        <AddForm />
        <TodoList />
    </div>);
};

export default App;