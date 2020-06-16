import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';

const Container = styled.div`
	margin: 8px;
	border: 3px solid lightgray;
	border-radius: 2px;
	background-color: #a3c9ad;
	min-height: 100px;
`;
const Title = styled.h3`
	padding: 8px;
`;
const TaskList = styled.div`
	padding: 8px;
	min-height: 50px;
	background-color: ${props => props.isDraggingOver ? 'red' : 'white'}
	
`;

export default class Column extends React.Component {
	render() {
		return(
			<Draggable draggableId={this.props.column.id} index={this.props.index}>
				{(provided) => (
					<Container ref={provided.innerRef}
							   {...provided.draggableProps}
							   {...provided.dragHandleProps}
					>
						<Title>{this.props.column.title}</Title>
						<Droppable droppableId={this.props.column.id}>
							{(provided, snapshot) => (
								<TaskList
									ref={provided.innerRef}
									{...provided.droppableProps}
									isDraggingOver={snapshot.isDraggingOver}
								>
									{this.props.tasks.map((task, index) => {
										return <Task key={task.id} task={task} index={index} />
									})}
									{provided.placeholder}
								</TaskList>
							)}
						</Droppable>
					</Container>
				)}
			</Draggable>
		);
	}
}