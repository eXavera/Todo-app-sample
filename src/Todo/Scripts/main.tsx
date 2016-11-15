import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import App from './components/app';
import { RequestTodos } from './actions';
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.dispatch(RequestTodos());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('content'));