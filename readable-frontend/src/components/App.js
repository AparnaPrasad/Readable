import React, { Component } from 'react';
import {postsFetchData} from '../actions/App';
import {connect} from 'react-redux';
import PostsDisplay from './PostsDisplay'
class App extends Component {

	componentDidMount(){
		console.log("in component mount");
		const {fetchPosts} = this.props;
		fetchPosts();

	}

	render(){
		return(
			<PostsDisplay postsAndComments={this.props.postsAndComments}/>
		)
	} 
}
function mapStateToProps({postsAndComments}) {
	return {
		postsAndComments: postsAndComments,
		//comments: comments
	}

}

function mapDispatchToProps(dispatch) {
	return {
		fetchPosts: (url) =>  dispatch(postsFetchData(url)),
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(App);

