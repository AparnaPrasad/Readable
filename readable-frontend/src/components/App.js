import React, { Component } from 'react';
import {fetchPosts /*, upvote_downvote*/} from '../actions/App';
import {connect} from 'react-redux';
import PostsDisplay from './PostsDisplay';

class App extends Component {

	constructor(props){
		super(props)
		this.loadPosts();

	}

	 loadPosts(){
		fetch("http://localhost:3001/posts/", {method: "GET", headers: {'Authorization':'apbsAuth'}})
	    .then((resp) => {
	    	resp.json().then((data) => {
		        this.props.load_posts(data);
	      })
	    })
	}

	render(){
		console.log("in app js", this.props.posts)
		return(
			<PostsDisplay posts={this.props.posts} /*upvote_downvote={this.props.upvote_downvote}*/ />
		)
	} 
}
function mapStateToProps({posts}) {
	return {
		posts: posts,
		//comments: comments
	}

}

function mapDispatchToProps(dispatch) {
	return {
		load_posts: (obj) =>  dispatch(fetchPosts(obj)),
		//upvote_downvote: (votes, postId) => dispatch(upvote_downvote(votes, postId))
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(App);

