var $ = require('jquery');
var React = require('react');
var NewsItem = require('./NewsItem');

$.ajax({
  url: '/json/items.json'
}).then(function (items) {
  // Log the data so we can inspect it in the developer console.
  console.log('items', items);
  // Use a fake rank for now.
  React.render(<NewsItem item={items[0]} rank={1} />, $('#content')[0]);
});