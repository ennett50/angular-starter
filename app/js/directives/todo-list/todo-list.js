export default ngModule => {
	ngModule.directive('todoList', todoListFn);

	function todoListFn() {
		return {
			restrict: 'E',
			scope: true,
			template: require('./todo-list.jade'),
			// controller: ($scope) => {
			// 	//const $scope = this;
			//
			// 	$scope.greeting = 'Hello Webpack';
			// },
			link: function($scope){
				$scope.todos = [];
				$scope.newTodo = '';

				$scope.addTodo = () => {
					var newTodo = {
						title: $scope.newTodo.trim()
					};

					if (newTodo.title) {
						$scope.todos.push(newTodo);
						$scope.newTodo = '';
					}
				};

				$scope.removeTodo = (todo) => {
					$scope.todos.splice($scope.todos.indexOf(todo), 1);
				};
			}
		};
	}
};