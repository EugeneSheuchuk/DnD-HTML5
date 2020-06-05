import React, { useState } from 'react';
import './App.css';

const todos = [
	{
		taskID: 1,
		task: 'Walk the walk'
	},
	{
		taskID: 2,
		task: 'Talk the talk'
	},
	{
		taskID: 3,
		task: 'Jump the jump'
	}
];

const App = () => {
	const [state, setState] = useState(todos);
	const [completedTasks, setCompletedTasks] = useState([]);
	const [draggedTask, setDraggedTask] = useState({ });

	const onDrag = (event, todo) => {
		event.preventDefault();
		setDraggedTask(todo);
	}
	const onDragOver = (event) => {
		event.preventDefault();
	}
	const onDrop = (event ) => {
		setCompletedTasks([...completedTasks, draggedTask]);
		setState(state.filter(task => task.taskID !== draggedTask.taskID));
		setDraggedTask({});
	}

	return (
		<div className="App">
			<h1>React HTML5 Drag and Drop</h1>
			<div className="todos">
				{ state.map(todo =>
						<div
							key={todo.taskID}
							draggable={true}
							onDrag={(e) => onDrag(e, todo)}>
							{todo.task}
						</div> )}
			</div>
			<div
				className="done"
				onDrop={(e) => onDrop(e)}
				onDragOver={(e) => onDragOver(e)}>
				{completedTasks.map((task, index) =>
					<div key={task.taskID} >
						{task.task}
					</div>
				)}
			</div>
		</div>
	);
};

export default App;