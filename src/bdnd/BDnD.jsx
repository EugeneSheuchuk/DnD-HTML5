import React from 'react';
import initialData from './initial-data';
import Column from './innerComponents/Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Columns = styled.div`
	background-color: skyblue;
	padding: 20px;
`;

class BDnD extends React.Component {
	state = initialData;

	onDragEnd = result => {
		const {destination, source, draggableId } = result;
		if (!destination) return;
		if (source.droppableId === 'body') {
			if (destination.index === source.index) return;
			const { columnOrder } = this.state;
			columnOrder.splice(source.index, 1);
			columnOrder.splice(destination.index, 0, draggableId);
			this.setState({columnOrder});
		} else {
			if (
				destination.droppableId === source.droppableId &&
				destination.index === source.index
			) return;
			if (destination.droppableId !== source.droppableId) {
				const prefColumn = this.state.columns[source.droppableId];
				const newTaskIds = Array.from(prefColumn.taskIds);
				newTaskIds.splice(source.index, 1);
				prefColumn.taskIds = newTaskIds;
				const newColumn = this.state.columns[destination.droppableId];
				const taskIds = Array.from(newColumn.taskIds);
				taskIds.splice(destination.index, 0, draggableId);
				newColumn.taskIds = taskIds;
				this.setState({clumns:
						{
							...this.state.columns,
							[source.droppableId]: {...prefColumn},
							[destination.droppableId]: {...newColumn},
						},
				} );
				return;
			}
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
	}

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId={'body'}>
					{(provided) => (
						<Columns ref={provided.innerRef}
								 {...provided.droppableProps}>
							{
								this.state.columnOrder.map((columnId, index) => {
									const column = this.state.columns[columnId];
									const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

									return <Column
										key={column.id}
										column={column}
										tasks={tasks}
										index={index}
									/>;
								})
							}
							{provided.placeholder}
						</Columns>
					)}
				</Droppable>
			</DragDropContext>
		);
	}
}

export default BDnD;
