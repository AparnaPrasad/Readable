import React, { Component } from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import {upvote_downvote, fetchComments} from '../actions/App';
import PostDetails from './PostDetails';
import AddComments from './AddComments';
import DeleteItem from './DeleteItem';
import AddPost from './AddPost';
import {Route, BrowserRouter,Link} from 'react-router-dom';

class PostsDisplay extends Component {
	state = {
		isPostViewOpen: false,
		isPostViewEditable: false,
		isAddCommentsViewOpen: false,
		isAddPostViewOpen:false,
		postId:''

	}
	openPostsViewModal(postId, isEditable) { 
		this.setState(() => ({ isPostViewOpen: true,
			isPostViewEditable: isEditable,
			postId:postId		
		 }))

		fetch("http://localhost:3001/posts/"+postId+"/comments", {method: "GET", headers: {'Authorization':'apbsAuth'}})
	    .then((resp) => {
	    	resp.json().then((data) => {
	    		this.props.fetchComments(postId, data);
	      })
	    })
	}	
    closePostsViewModal() {
    	this.setState(() => ({ isPostViewOpen: false }))
	}
	upvoteOrDownvote(votes, postId, type){
		fetch("http://localhost:3001/posts/"+ postId, {method: "POST",
		  body:JSON.stringify({option: type}), headers: {'Content-Type': 'application/json','Authorization':'apbsAuth'}})
	    .then((resp) => {
	    	resp.json().then((data) => {
		        this.props.upvote_downvote(data.voteScore, postId);
	      })
	    })

	}
	closeAddCommentsViewModal() {
    	this.setState(() => ({ isAddCommentsViewOpen: false }))
	}
	closeAddPostViewModal() {
    	this.setState(() => ({ isAddPostViewOpen: false }))
	}
	openAddPostViewModel() {
		this.setState(() => ({ isAddPostViewOpen: true,	
		 }))
	}
	openAddCommentsViewModel(postId) {
		this.setState(() => ({ isAddCommentsViewOpen: true,	
		postId: postId	
		 }))
	}

	render(){
	const {posts, comments, categorySelected} = this.props;
	const {isPostViewEditable, isAddCommentsViewOpen, isAddPostViewOpen,
	postId} = this.state;
		console.log("at posts dislay!!!#@@#$#@", categorySelected,postId);
	return(
		<BrowserRouter>
		<div>
		<Route exact path={"/"+categorySelected} render={()=>

			(<div>

			<button onClick={()=>this.openAddPostViewModel()}>Add Post</button>
			<ul>
				{posts && posts.postId && !posts.postId.deleted && posts.postId.map((p, i) =>
				{	

					if(!posts.postById[p].deleted) 
					{	return  <li key={i}>
							<div>{posts.postById[p].title}
							<button onClick={()=> this.openPostsViewModal(p, true)}>Edit Post</button>
							<span onClick={()=> this.openPostsViewModal(p, false)}>
								{categorySelected?<Link to={"/"+categorySelected+"/"+p} className="close-search">View Post</Link>:
								<Link to={"/"+p}>View Post</Link>}
							</span>
							</div>
							<div>{posts.postById[p].body}</div>
							<div><b>{posts.postById[p].category}</b></div>
							<div>Votes: {posts.postById[p].voteScore}</div>
							<div>Comments: {posts.postById[p].commentCount}</div>
							<button onClick={()=>this.upvoteOrDownvote(posts.postById[p].voteScore, p, 'upVote')}>Upvote</button>
							<button onClick={()=>this.upvoteOrDownvote(posts.postById[p].voteScore, p, 'downVote')}>Downvote</button>
							<DeleteItem item='post' itemId={p}/>
							<button onClick={()=>this.openAddCommentsViewModel(p)}>Add Comment</button>
						</li>
					}
					else 
						return ''
				}
					
				)}
			</ul>
						
        	<Modal
		        className='modal'
		        overlayClassName='overlay modalSizeBig'
		        isOpen={isAddCommentsViewOpen}
		        onRequestClose={()=>this.closeAddCommentsViewModal()}
		        contentLabel='Modal'>
          		{isAddCommentsViewOpen &&  <AddComments parentPostId={this.state.postId} closeAddCommentsViewModal={this.closeAddCommentsViewModal.bind(this)} />}
        		<button onClick={()=>this.closeAddCommentsViewModal()}>Close</button>
        	</Modal>
        	<Modal
		        className='modal'
		        overlayClassName='overlay modalSize big'
		        isOpen={isAddPostViewOpen}
		        onRequestClose={()=>this.closeAddPostViewModal()}
		        contentLabel='Modal'>
		        {isAddPostViewOpen &&  <AddPost  closeAddPostViewModal={this.closeAddPostViewModal.bind(this)} />}
        		<button onClick={()=>this.closeAddPostViewModal()}>Close</button>
        	</Modal>
        	</div>)}/>

        	{postId && categorySelected && <Route exact path={"/"+categorySelected+"/"+postId} render={()=>
					(<PostDetails posts={posts} 
						comments={comments} 
						isPostViewEditable={isPostViewEditable} />)}/>
			}
			{postId && !categorySelected && <Route exact path={"/"+postId} render={()=>
					(<PostDetails posts={posts} 
						comments={comments} 
						isPostViewEditable={isPostViewEditable} />)}/>
			}

		</div>

			</BrowserRouter>)
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
		upvote_downvote: (votes, postId) => dispatch(upvote_downvote(votes, postId)),
		fetchComments: (postId, commentsList) => dispatch(fetchComments(postId, commentsList))
	
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(PostsDisplay);

