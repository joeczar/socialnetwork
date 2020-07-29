import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/welcome';

let elem;

let isLoggedIn;

if (isLoggedIn) {
    elem = <div>Logo</div>
} else {
    elem = <Welcome />
}

ReactDOM.render(
    elem,
    document.querySelector('main')
);


