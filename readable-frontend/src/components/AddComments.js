import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addComments} from '../actions/App';

class AddComments extends Component {
	state = {
		status:null
	}
	postComment(){
		console.log('in post comment', this.props.posts);
		const {parentPostId, posts, addComments} = this.props;
		console.log('parentPostId', parentPostId);
		//console.log('addComments', parentPostId);
		const commentBody = this.commentBody.value;
		const authorInput = this.authorInput.value;
		const time = new Date();
		const newCommentCount = posts.postById[parentPostId].commentCount + 1;		
		
		const l_warning = !commentBody || !authorInput? 
			"Both comment body and author name is required!!!":null;
			
			this.setState({
				status: l_warning
			});

			if(l_warning) return;

		const commentDetails = {id: time,
		  	timestamp:time,
		  	body:commentBody,
		  	author:authorInput,
		  	parentId: parentPostId
		  };

		fetch("http://localhost:3001/comments/", {method: "POST",
		  body:JSON.stringify(commentDetails), 
		  headers: {'Content-Type': 'application/json',
		  'Authorization':'apbsAuth'}})
	    .then((resp) => {
	    	resp.json().then((data) => {
	    	   console.log("add comments", data);
		       addComments(data.parentId, newCommentCount, data);
		       this.setState({
		       	status: "Successfully POSTED!!!"
		       })
	      })
	    })
	}
	render(){
		const {closeAddCommentsViewModal} = this.props;
		return(<div>
				add comments
				<div>
					<input type="text" 
					ref={(input) => this.commentBody = input} 
					placeholder="comment"/>
				</div>
				<div>
					<input type="text"
					ref={(input) => this.authorInput = input}
					 placeholder="author"/>
				</div>
				<div>
					{this.state.status && <span>{this.state.status}</span>}
				</div>
				<div>
				<button onClick={()=>this.postComment()}>Post Comment</button>
				<button onClick={()=>closeAddCommentsViewModal()}>Close</button>
				</div>
			</div>)
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
		addComments: (parentId, commentCount, commentDetails) =>  dispatch(addComments(parentId, commentCount, commentDetails))
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(AddComments);