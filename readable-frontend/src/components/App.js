import React, { Component } from 'react';
import {postsFetchData} from '../actions/App';
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
function mapStateToProps({posts, comments}) {
	return {
		posts: posts,
		comments: comments
	}

}

function mapDispatchToProps(dispatch) {
	return {
		fetchPosts: (url) =>  dispatch(postsFetchData(url)),
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(App);

