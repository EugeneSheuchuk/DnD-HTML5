import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

export default class Task extends React.Component {
	render() {
		return(
			<Container>{this.props.task.content}</Container>
		);
	};
}