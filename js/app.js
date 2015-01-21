var _ = require('lodash');
var $ = require('jquery');
var NewsList = require('./NewsList');
var React = require('react');
var ReactSpinner = require('react-spinner');

React.render(<NewsList />, $('#content')[0]);