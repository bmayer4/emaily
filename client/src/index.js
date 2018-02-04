import React from 'react';  
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css';  //no relative path ./, node assumes node_module dir
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index';   //I can leave index off
import App from './components/App';

// import axios from 'axios';
// window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(thunk));  

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

