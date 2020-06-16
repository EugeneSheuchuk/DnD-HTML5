const initialData = {
	tasks: {
		'task-1': {id: 'task-1', content: 'the first task'},
		'task-2': {id: 'task-2', content: 'the second task'},
		'task-3': {id: 'task-3', content: 'the third task'},
		'task-4': {id: 'task-4', content: 'the four task'},
	},
	columns: {
		'column-1': {
			id: 'column-1',
			title: 'To-do',
			taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
		},
		'column-2': {
			id: 'column-2',
			title: 'Done',
			taskIds: [],
		},
	},
	columnOrder: ['column-1', 'column-2'],
}

export default initialData;