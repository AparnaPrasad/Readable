import React, { Component } from 'react';
import {upvote_downvote} from '../actions/App';
import {connect} from 'react-redux';

class PostsDisplay extends Component {
	upvoteOrDownvote(votes, postId, type){
		console.log('in upvote', votes, postId);
		fetch("http://localhost:3001/posts/"+ postId, {method: "POST",
		  body:JSON.stringify({option: type}), headers: {'Content-Type': 'application/json','Authorization':'apbsAuth'}})
	    .then((resp) => {
	    	resp.json().then((data) => {
	    		console.log("upvote resp:", data.voteScore, postId);
		        this.props.upvote_downvote(data.voteScore, postId);
	      })
	    })

	}

	render(){
	console.log('props post', this.props.posts);
	const {posts} = this.props;
	return(<ul>
		{posts && posts.postId && posts.postId.map((p, i) =>
			<li key={i}>
				<div>{posts.postById[p].title}
				<button>Edit Post</button>
				<button>View Post</button>
				</div>
				<div>{posts.postById[p].body}</div>
				<div>Votes: {posts.postById[p].voteScore}</div>
				<div>Comments: {posts.postById[p].commentCount}</div>
				<button onClick={(votes, id)=>this.upvoteOrDownvote(posts.postById[p].voteScore, p, 'upVote')}>Upvote</button>
				<button onClick={(votes, id)=>this.upvoteOrDownvote(posts.postById[p].voteScore, p, 'downVote')}>Downvote</button>
				<button>Add Comment</button>
			</li>
		)}
		</ul>)
}
}

function mapStateToProps({posts}) {
	console.log('mapStateToProps:', posts);
	return {
		posts: posts,
		//comments: comments
	}

}

function mapDispatchToProps(dispatch) {
	return {
		//load_posts: (obj) =>  dispatch(fetchPosts(obj)),
		upvote_downvote: (votes, postId) => dispatch(upvote_downvote(votes, postId))
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(PostsDisplay);

