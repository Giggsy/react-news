var _ = require('lodash');
var $ = require('jquery');
var NewsHeader = require('./NewsHeader');
var NewsItem = require('./NewsItem');
var React = require('react');

var NewsList = React.createClass({
  getInitialState: function() {
    return {page: 1, items: []}
  },

  componentDidMount: function() {
    this.getItems();
  },

  getItems: function() {
    var that = this;
    var itemIndex = this.state.page * 30;
    var items;
    $.ajax({
      url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
      dataType: 'json'
    }).then(function (stories) {
      var detailDeferreds = _.map(stories.slice(itemIndex - 30, itemIndex), function (itemId) {
        return $.ajax({
          url: 'https://hacker-news.firebaseio.com/v0/item/' + itemId + '.json',
          dataType: 'json'
        });
      });
      return $.when.apply($, detailDeferreds);
    }).then(function () {
      items = _.map(arguments, function (argument) {
        return argument[0];
      });
      that.setState({items: items});
    });
  },

  getMore: function() {
    var page = this.state.page
    this.setState({page: page + 1})
    this.getItems();
  },

  render: function () {
    pageIndex = (this.state.page - 1 ) * 30;
    return (
      <div className="newsList">
        <NewsHeader/>
        <div className="newsList-newsItems">
          {_.map(this.state.items, function (item, index) {
            return <NewsItem key={item.id} item={item} rank={pageIndex + index + 1}/>;
          }.bind(this))}
        </div>
        <div className="newsList-more">
          <a className="newsList-moreLink" href="#" onClick={this.getMore}>More</a>
        </div>
      </div>
    );
  }
});

module.exports = NewsList;