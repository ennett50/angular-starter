/**
 * @description base style project
 * @example variables.styl, mixins.styl and etc.
 */
require('../css/index.styl');


/**
 * @description init angular app in project
 * @type {angular|exports}
 */

const angular = require('angular');

var ngModule = angular.module('todomvc', []);



/**
 * @description get all scripts of angular app
 * services, components and etc.
 */
require('./directives')(ngModule);



