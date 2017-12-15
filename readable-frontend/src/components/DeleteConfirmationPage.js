import React, { Component } from 'react';
import {connect} from 'react-redux';
import {deleteComment, deletePost} from '../actions/App';

class DeleteConfirmationPage extends Component {
	
	confirmDelete(item, itemId) {
		console.log("at confirm delete:", item, itemId);
		const {closeConfirmDeleteViewModal, deletePost,deleteComment, posts, parentPostId} = this.props;
		//const newCommentCount = posts.postById[parentPostId].commentCount - 1;
		//console.log("st delete comments", parentPostId, newCommentCount);	
			fetch("http://localhost:3001/"+item+"s/"+itemId, {method: "DELETE",
		  		headers: {'Content-Type': 'application/json',
		  		'Authorization':'apbsAuth'}})
	    		.then((resp) => {
	    			resp.json().then((data) => {
	    	   		console.log("in delete data:", data);

	      		})
	    	})
	    	item==="post"? deletePost(itemId): deleteComment(itemId, parentPostId,
	    		posts.postById[parentPostId].commentCount - 1);
	    	closeConfirmDeleteViewModal();
	}

	render(){
		const {item, closeConfirmDeleteViewModal, itemId}=this.props;
		console.log('item at del conf', item);
		return(
			<div>
				are you sure you want to delete this {item} ?
				<button onClick={()=>this.confirmDelete(item, itemId)}>Yes</button>
				<button onClick={()=>closeConfirmDeleteViewModal()}>No</button>
			</div>
		)
	}
}
function mapStateToProps({posts,comments}) {
	return {
		posts: posts,
	}

}

function mapDispatchToProps(dispatch) {
	return {
		deletePost: (postId) => dispatch(deletePost(postId)),
		deleteComment: (commentId,parentPostId,newCommentCount) => dispatch(deleteComment(commentId, parentPostId,newCommentCount))
	}

}
export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmationPage);