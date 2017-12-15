import React, { Component } from 'react';
import {fetchPosts, loadCategories} from '../actions/App';
import {connect} from 'react-redux';
import PostsDisplay from './PostsDisplay';

class App extends Component {

	constructor(props){
		super(props)
		this.fetchPosts();
		this.fetchCategories();

	}

	fetchCategories(){
		fetch("http://localhost:3001/categories/", {method: "GET", headers: {'Authorization':'apbsAuth'}})
	    .then((resp) => {
	    	resp.json().then((data) => {
		        this.props.loadCategories(data);
	      })
	    })

	}


	 fetchPosts(){
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
			<PostsDisplay/>
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
		loadCategories: (obj) => dispatch(loadCategories(obj))
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(App);

