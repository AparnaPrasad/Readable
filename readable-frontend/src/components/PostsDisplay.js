import React, { Component } from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import {upvote_downvote, fetchComments, fetchPosts} from '../actions/App';
import PostDetails from './PostDetails';
import AddComments from './AddComments';
import DeleteItem from './DeleteItem';
import AddPost from './AddPost';
import {Route, BrowserRouter,Link} from 'react-router-dom';

class PostsDisplay extends Component {
	state = {
		isPostViewEditable: false,
		isAddCommentsViewOpen: false,
		isAddPostViewOpen:false,
		postId:'',
		categorySelected: "All"

	}
	componentDidMount(){
		//super(props);
		console.log('in ctor', window.location.href);
		//this.fetchPosts("All");
		this.getCategory();

	}

	getCategory() {
		console.log("extracting cataegory", window.location.href);
		let url =  window.location.href;
		let res = url.replace("http://localhost:3000/", "");
		//console.log("props at get category:", this.props);
		//res = res? res: "All";
		console.log("calling category changed with ", res);
		this.props.actionCategoryChaged(res);
		this.setState(() => ({ 
			categorySelected: res
		 }))
		this.fetchPosts(res);


	}

	fetchPosts(categorySelected){
	 	console.log("in fetch posts", this.state.categorySelected);
	 	//const {categorySelected} = this.state;
		!categorySelected? fetch("http://localhost:3001/posts/", {method: "GET", headers: {'Authorization':'apbsAuth'}})
	    .then((resp) => {
	    	resp.json().then((data) => {
		        this.props.load_posts(data);
	      })
	    }): fetch("http://localhost:3001/"+categorySelected+"/posts/", {method: "GET", headers: {'Authorization':'apbsAuth'}})
	    .then((resp) => {
	    	resp.json().then((data) => {
	    		//console.log("from category post:", data);
		        this.props.load_posts(data);
	      })
	    })
	}

	openPostsViewModal(postId) { 
		this.setState(() => ({ isPostViewOpen: true,
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
	const {posts, comments, viewPost} = this.props;
	const {isPostViewEditable, isAddCommentsViewOpen, isAddPostViewOpen,
	postId, categorySelected} = this.state;
		//console.log("at posts dislay!!!#@@#$#@", categorySelected);
		console.log("props at render!!!#@@#$#@", this.props.posts);

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
							<button onClick={()=> this.openPostsViewModal(p)}>Edit Post</button>
							<span onClick={()=> this.openPostsViewModal(p)}>
								{categorySelected?<Link to={"/"+categorySelected+"/"+p} className="close-search">View Post</Link>:
								<Link onClick={()=>viewPost(true)} to={"/"+p}>View Post</Link>}
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
          		{isAddCommentsViewOpen && <AddComments parentPostId={this.state.postId} closeAddCommentsViewModal={this.closeAddCommentsViewModal.bind(this)} />}
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
					(<div>
						<PostDetails posts={posts} 
						comments={comments} 
						isPostViewEditable={isPostViewEditable} 
						postId={postId} />
						<Link to={"/"+categorySelected}>Back</Link>
					</div>)}/>
			}
			{postId && !categorySelected && <Route exact path={"/"+postId} render={()=>
					(<div>
						<PostDetails posts={posts} 
						comments={comments} 
						isPostViewEditable={isPostViewEditable}
						postId={postId} 
						viewPost={viewPost}
						/>
						<Link to={"/"+categorySelected}>Back</Link>
					</div>)}/>
			}

		</div>

			</BrowserRouter>)
} 
}

function mapStateToProps({posts, comments}, ownProps) {
	//console.log('at own props:', ownProps);
	return {
		posts: posts,
		comments: comments,
	}

}

function mapDispatchToProps(dispatch) {
	return {
		upvote_downvote: (votes, postId) => dispatch(upvote_downvote(votes, postId)),
		fetchComments: (postId, commentsList) => dispatch(fetchComments(postId, commentsList)),
		load_posts: (obj) =>  dispatch(fetchPosts(obj)),

	}

}

export default connect(mapStateToProps, mapDispatchToProps)(PostsDisplay);

