import React, { Component } from 'react';
import {fetchPosts} from '../actions/App';
import {connect} from 'react-redux';

class App extends Component {

	componentDidMount(){
		console.log("in component mount");
		const {fetchPosts} = this.props;
		fetchPosts();
	}

	render(){
		return(
			<div>hello world</div>
		)
	} 
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPosts: (data) =>  dispatch(fetchPosts()),
	}

}

export default connect(mapDispatchToProps)(App);