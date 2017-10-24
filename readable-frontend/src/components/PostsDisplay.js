import React, { Component } from 'react';

class PostsDisplay extends Component {
	render(){
		const postsIds = this.props.postsAndComments.posts.allIds;
		//const posts= this.props.postsAndComments.posts.byId;
		console.log('postsIds from PostsDisplay',postsIds); //displays the value
		return(
			<ul>
			{ postsIds.map((post, i) =>
						<li key={i}>post</li> //doesnt render
				)
			}

			</ul>);
	}
}

export default PostsDisplay;
