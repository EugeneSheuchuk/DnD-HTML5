import React from 'react';
import initialData from './initial-data';
import Column from './innerComponents/Column';

class BDnD extends React.Component {
	state = initialData;

	render() {
		return (
			this.state.columnOrder.map(columnId => {
				const column = this.state.columns[columnId];
				const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

				return <Column key={column.id} column={column} tasks={tasks} />;
			})
		);
	}
}

export default BDnD;
