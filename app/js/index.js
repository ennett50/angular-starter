/**
 * @description base style project
 * @example variables.styl, mixins.styl and etc.
 */
require('../css/index.styl');


/**
 * @description init angular app in project
 * @type {angular|exports}
 */

//const angular = require('angular');
require('angular-loading-bar');
require('angular-ui-router');
require('angular-animate');

// window.taTools = {};
// window.rangy = require('rangy/lib/rangy-core.js');
// window.rangy.saveSelection = require('rangy/lib/rangy-selectionsaverestore.js');
// require("angular-sanitize");
// require('textangular');


const ngModule = angular.module('frodo', ['angular-loading-bar', 'ngAnimate', 'ui.router', 'textAngular']);

ngModule.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			template: '<index></index>',
			sidebar: 'home'
		})
		.state('admin', {
			url: '/admin',
			template: '<admin-panel></admin-panel>',
			sidebar: 'admin'
		})
		.state('createUser', {
			url: '/admin/create-user',
			template: '<create-user></create-user>',
			sidebar: 'create-user'
		})
		.state('createRubric', {
			url: '/admin/create-rubric',
			template: '<create-rubric></create-rubric>',
			sidebar: 'create-rubric'
		})
		.state('createArticle', {
			url: '/admin/create-article',
			template: '<create-article></create-article>',
			sidebar: 'create-article'
		})
		.state('category', {
			url: '/articles/:category',
			template: '<category></category>',
			sidebar: 'category'
		})
		.state('rubric', {
			url: '/articles/:category/:rubric',
			template: '<rubric></rubric>',
			sidebar: 'rubric'
		})
		.state('article', {
			url: '/article/:code',
			template: '<article></article>',
			sidebar: 'article'
		});
	$urlRouterProvider.otherwise('/');


	// $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions) {
	//
	// 	taOptions.forceTextAngularSanitize = false;  // set false to allow the textAngular-sanitize provider to be replaced
	// 	//taOptions.keyMappings = []; // allow customizable keyMappings for specialized key boards or languages
	//
	// 	return taOptions;
	// }]);


});


/**
 * @description get all scripts of angular app
 * services, components and etc.
 */
require('./models')(ngModule);
require('./directives')(ngModule);
require('./components')(ngModule);


