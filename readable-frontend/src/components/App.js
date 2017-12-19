import React, { Component } from 'react';
import {fetchPosts, loadCategories} from '../actions/App';
import {connect} from 'react-redux';
import PostsDisplay from './PostsDisplay';
import {Route, BrowserRouter as Router, Link  } from 'react-router-dom';


class App extends Component {
	state={
		categorySelected: ""
	}
	
	constructor(props){
		super(props)
		this.fetchPosts("All");
		this.fetchCategories();

	}

	componentDidMount(){
		console.log("in componentWillMount", window.location.href );
	}
	
	categoryChanged(categoryInput){
		//console.log("Olalala category changed to:", this.categoryInput.value);
		//const categoryInput = this.categoryInput.value;
		console.log("categoryInput", categoryInput);
		//const  = categoryInput;
		const setCategory = categoryInput === "All"? "":categoryInput;
		this.setState({
			categorySelected: setCategory
		});
		this.fetchPosts(categoryInput);
		//this.fetchCategories();
	}

	fetchCategories(){
		fetch("http://localhost:3001/categories/", {method: "GET", headers: {'Authorization':'apbsAuth'}})
	    .then((resp) => {
	    	resp.json().then((data) => {
		        this.props.loadCategories(data);
	      })
	    })

	}

	 fetchPosts(categorySelected){
	 	//console.log("in fetch posts", this.state.categorySelected);
	 	//const {categorySelected} = this.state;
		categorySelected==="All"? fetch("http://localhost:3001/posts/", {method: "GET", headers: {'Authorization':'apbsAuth'}})
	    .then((resp) => {
	    	resp.json().then((data) => {
		        this.props.load_posts(data);
	      })
	    }): fetch("http://localhost:3001/"+categorySelected+"/posts/", {method: "GET", headers: {'Authorization':'apbsAuth'}})
	    .then((resp) => {
	    	resp.json().then((data) => {
	    		console.log("from category post:", data);
		        this.props.load_posts(data);
	      })
	    })
	}

	render(){
		console.log("in app js", this.state.categorySelected);
		const {categories}=this.props;
		const {categorySelected} = this.state;
		return(
			<div>

				<Router>
				<div>
				<Route exact path="/" render={()=>
					(<div>
					View By categories:
					<ul>
							
							{categories && categories.length > 0 && categories.map(function(c,i){
								return (<li key={i} onClick={()=>this.categoryChanged(c.name)}> 
									<Link to={"/" + c.path} className="linkClass">{c.path}</Link> 
									</li>)
							}.bind(this))
							}
					</ul>
					<PostsDisplay categorySelected={categorySelected}/>
					</div>)}/>
				


				 {categorySelected!=="" &&
				 	<Route exact path={"/" + categorySelected} 
				 		render={()=>
					(<PostsDisplay categorySelected={categorySelected}/>)}/>
				}
        		</div>
        		</Router>
          	</div>
		)
	}
}
function mapStateToProps({posts, categories}) {
	return {
		posts: posts,
		categories: categories
	}

}

function mapDispatchToProps(dispatch) {
	return {
		load_posts: (obj) =>  dispatch(fetchPosts(obj)),
		loadCategories: (obj) => dispatch(loadCategories(obj))
	}

}


export default connect(mapStateToProps, mapDispatchToProps)(App);

