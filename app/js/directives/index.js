export default ngModule => {
	require('./hello-world/hello-world.js')(ngModule);
	require('./todo-list/todo-list.js')(ngModule);
};