import React, { Component } from 'react';
import {connect} from 'react-redux';
import {upvote_downvote_comments} from '../actions/App';
import DeleteItem from './DeleteItem';

class Comments extends Component {

	upvoteOrDownvote(votes, commentId, type){
		fetch("http://localhost:3001/comments/"+ commentId, {method: "POST",
		  body:JSON.stringify({option: type}), headers: {'Content-Type': 'application/json','Authorization':'apbsAuth'}})
	    .then((resp) => {
	    	resp.json().then((data) => {
		        this.props.upvote_downvote_comments(data.voteScore, commentId);
	      })
	    })

	}

	render() {
		const {comments} = this.props;
		console.log("At comments display#$#%#$", comments);
		return(
			<div>
				COMMENTS:
				<ul>
					{comments && comments.commentsIds && comments.commentsIds.map((cid, i) =>
						{
							return !comments.commentsById[cid].deleted?
								 <li key={i}>
									<div>
										{comments.commentsById[cid].body}
											<button>Edit Comment</button>
											<button>View Comment</button>
											<DeleteItem item='comment' itemId={cid} parentPostId={comments.postId}/>
									</div>
									<div>
										Votes: {comments.commentsById[cid].voteScore}
									</div>
									<div>
										<button onClick={()=>this.upvoteOrDownvote(comments.commentsById[cid].voteScore, comments.commentsById[cid].id, 'upVote')}>Upvote</button>
										<button onClick={()=>this.upvoteOrDownvote(comments.commentsById[cid].voteScore, comments.commentsById[cid].id, 'downVote')}>Downvote</button>
									</div>
								</li>: ''
							
						}
					)}
				</ul>
			</div>
			)
	}
}

function mapStateToProps({posts,comments}) {
	return {
		comments: comments
	}

}

function mapDispatchToProps(dispatch) {
	return {
		upvote_downvote_comments: (votes, commentsId) => dispatch(upvote_downvote_comments(votes, commentsId)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);