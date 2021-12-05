import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
console.log(require("dotenv").config())
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
