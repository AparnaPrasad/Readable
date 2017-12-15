import React, { Component } from 'react';
import {connect} from 'react-redux';
import Comments from './Comments';
import {editPost} from '../actions/App';
import Modal from 'react-modal';
import AddComments from './AddComments';
import DeleteItem from './DeleteItem';
class PostDetails extends Component {
	state = {
		isAddCommentsViewOpen: false,
	}
	handleChange = (name, value)=>{
		this.setState({
			name: value,
		})
	}
		closeAddCommentsViewModal() {
    	this.setState(() => ({ isAddCommentsViewOpen: false }))
	}
		openAddCommentsViewModel() {
		this.setState(() => ({ isAddCommentsViewOpen: true,				
		 }))
	}

	savePostDetails(postId){

		const {posts, comments, closePostsViewModal, editPost} = this.props;
		const titleVal = this.titleInput.value || posts.postById[comments.postId].title;
		const bodyVal = this.bodyInput.value || posts.postById[comments.postId].body;
		fetch("http://localhost:3001/posts/"+postId, {method: "PUT", 
			body:JSON.stringify({title: titleVal, body: bodyVal}), 
			headers: {'Content-Type': 'application/json','Authorization':'apbsAuth'}})
	    .then((resp) => {
	    	resp.json().then((data) => {
	    		console.log("data from edit:", data);
	    		const newPost = {
	    			postId: postId,
	    			title: data.title,
	    			body: data.body
	    		}
	    		editPost(newPost);
	    		closePostsViewModal();
	      })
	    })
	}
	/*PUT /posts/:id*/

	render(){
		const {posts, comments, isPostViewEditable, closePostsViewModal} = this.props;
		const {isAddCommentsViewOpen} = this.state;
		
		return(
			<div>
				<div>POST DETAILS</div>
					{comments && comments.postId && !posts.postById[comments.postId].deleted &&
						<div>
						<ul>
							<li>
								TITLE:
								{isPostViewEditable?
									<input placeholder="New Title" type="text" ref={(input) => this.titleInput = input}
									/>:
								<span>{posts.postById[comments.postId].title}</span>}
							</li>
							<li>
							BODY:
								{isPostViewEditable?
								<input 
								placeholder="New Body"
								type="text" 
								ref={(input) => this.bodyInput = input}
								/>:
								<span>{posts.postById[comments.postId].body}</span>}
							</li>
							<li>
								AUTHOR: {posts.postById[comments.postId].author}
							</li>
							<li>
								VOTES: {posts.postById[comments.postId].voteScore}
							</li>
							{comments.commentsIds && comments.commentsIds.length>0 &&
								<li> 
									<Comments parentPostId={comments.postId} postDetails={posts}/>
								</li>
							}
						</ul>
						<button onClick={()=>this.openAddCommentsViewModel()}>Add Comment</button>
						<DeleteItem item='post' itemId={comments.postId}/>
						{isPostViewEditable && <div><button onClick={()=>closePostsViewModal()}>Cancel</button>
						<button onClick={()=> this.savePostDetails(comments.postId)}>Save</button></div>}
					</div>
				}
				<Modal
		        className='modal'
		        overlayClassName='overlay modalSize big'
		        isOpen={isAddCommentsViewOpen}
		        onRequestClose={()=>this.closeAddCommentsViewModal()}
		        contentLabel='Modal'>
          		{isAddCommentsViewOpen &&  <AddComments parentPostId={comments.postId} closeAddCommentsViewModal={this.closeAddCommentsViewModal.bind(this)} />}
        		</Modal>
			</div>)
		}
	}

function mapStateToProps({posts,comments}) {
	return {
		posts: posts,
	}

}

function mapDispatchToProps(dispatch) {
	return {
		editPost: (votes, postId) => dispatch(editPost(votes, postId))	
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);