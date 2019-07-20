import React from 'react';
import ReactDOM from 'react-dom';
import MyRouter from './page/router';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MyRouter />, document.getElementById('root'));

serviceWorker.unregister();
