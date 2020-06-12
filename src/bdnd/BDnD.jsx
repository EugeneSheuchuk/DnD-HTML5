import React from 'react';
import initialData from './initial-data';
import Column from './innerComponents/Column';
import { DragDropContext } from 'react-beautiful-dnd';

class BDnD extends React.Component {
	state = initialData;

	onDragEnd = result => {
		const {destination, source, draggableId } = result;
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) return;

		const column = this.state.columns[destination.droppableId];
		const newTaskIds = Array.from(column.taskIds);
		newTaskIds.splice(source.index, 1);
		newTaskIds.splice(destination.index, 0, draggableId);
		column.taskIds = newTaskIds;
		this.setState({clumns:
				{
					...this.state.columns,
					[destination.droppableId]: {...column},
				},
		} );
	}

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				{this.state.columnOrder.map(columnId => {
					const column = this.state.columns[columnId];
					const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

					return <Column key={column.id} column={column} tasks={tasks} />;
				})}
			</DragDropContext>
		);
	}
}

export default BDnD;
