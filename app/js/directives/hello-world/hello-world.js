export default ngModule => {
	ngModule.directive('helloWorld', helloWorldFn);

	require('./hello-world.styl');
	function helloWorldFn() {
		return {
			restrict: 'E',
			scope: {},
			template: require('./hello-world.jade'),
			controllerAs: 'vm',
			controller: () => {
				const vm = this;

				vm.greeting = 'Hello Webpack';
			}
		};
	}
};