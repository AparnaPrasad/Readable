import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addPost} from '../actions/App';

class AddPost extends Component {
	state = {
		status:null
	}
	
	addNewPost(){
		const {addPost} = this.props;
		const titleInput = this.titleInput.value;
		const authorInput = this.authorInput.value;
		const bodyInput = this.bodyInput.value;

		const time = new Date();
		const l_warning = !titleInput || !authorInput || !bodyInput ? 
			"Please fill in all the details!!!":null;
			
			this.setState({
				status: l_warning
			});

			if(l_warning) return;

		const postDetails = {id: time,
		  	timestamp:time,
		  	body:bodyInput,
		  	author:authorInput,
		  	title: titleInput
		  };

		fetch("http://localhost:3001/posts", {method: "POST",
		  body:JSON.stringify(postDetails), 
		  headers: {'Content-Type': 'application/json',
		  'Authorization':'apbsAuth'}})
	    .then((resp) => {
	    	resp.json().then((data) => {
	    	   console.log("add post", data);
	    	   addPost(data)
		       this.setState({
		       	status: "Successfully POSTED!!!"
		       })
	      })
	    })
	}
	render(){
		const {closeAddPostViewModal, posts} = this.props;
		console.log('posts', this.props.posts);
		return(<div>
				Add Post
				<div>
					<input type="text" 
					ref={(input) => this.titleInput = input} 
					placeholder="title"/>
				</div>
				<div>
					<input type="text" 
					ref={(input) => this.bodyInput = input} 
					placeholder="body"/>
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
					<select ref={(input)=> this.categoryInput = input}>
					{posts && posts.categories && posts.categories.map(function(c,i){
						return <option key={i} value={c.path}>{c.name}</option>
					})
					}
					</select>
				</div>
				<button onClick={()=>this.addNewPost()}>Post Comment</button>
				<button onClick={()=>closeAddPostViewModal()}>Cancel</button>
				
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
		addPost: (post) =>  dispatch(addPost(post))
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);