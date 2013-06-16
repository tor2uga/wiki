/**
 * @fileOverview The wiki read controller.
 */

var RP;

/**
 * @constructor
 * @extends {View}
 */
function Read_() {
  this.init_();
}
Read_.prototype = _.clone(View);
RP = Read_.prototype;

/**
 * @type {string}
 */
RP.name = 'read';

/**
 * @param {string} pageName
 * @protected
 * @return {string}
 */
RP.pathGenerator_ = function(pageName) {
  return [this.name, pageName].join('/');
};

/**
 * @param {Object} state
 * @param {string} viewName
 * @param {string} pageName
 * @protected
 */
RP.render = function(state, viewName, pageName) {
  Session.set(SESSION_PAGE_NAME_KEY, pageName);
  Session.set(SESSION_PAGE_TYPE, viewName);
};

Read = Read_;

/**
 * @return {string}
 */
Template.read.text = function() {
  return 'This is text.';
};

/**
 * @return {string}
 */
Template.read.pageTitle = function() {
  return formattedPageName();
};

/**
 * @return {string}
 */
Template.read.pageName = function() {
  return pageName();
};

/**
 * @return {boolean}
 */
Template.read.pageExists = function() {
  var p;
  p = WikiPages.findOne({_id: pageId()});
  if (!p) {
    return false;
  }
  return !!WikiEdits.findOne({_id: p.lastEditId});
};

Template.read.events({
  'click a.internal-link': function(event) {
    handleInternalClick(event);
  }
});
