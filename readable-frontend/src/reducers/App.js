import {POSTS_HAS_ERRORED, POSTS_IS_LOADING, POSTS_FETCH_DATA_SUCCESS} from '../actions/App';
import { combineReducers } from 'redux';
const initialState = {
	posts : {
        byId : {},
        	 /*FORMAT
        	 	"post1" : {
                id : "post1",
                author : "user1",
                body : "......",
                comments : ["comment1", "comment2"]    
            },
            "post2" : {
                id : "post2",
                author : "user2",
                body : "......",
                comments : ["comment3", "comment4", "comment5"]    
            }*/
        allIds : [] //["post1", "post2"]
    },
    comments : {
        byId : {
            "comment1" : {
                id : "comment1",
                author : "user2",
                comment : ".....",
            },
            "comment2" : {
                id : "comment2",
                author : "user3",
                comment : ".....",
            },
            "comment3" : {
                id : "comment3",
                author : "user3",
                comment : ".....",
            },
            "comment4" : {
                id : "comment4",
                author : "user1",
                comment : ".....",
            },
            "comment5" : {
                id : "comment5",
                author : "user3",
                comment : ".....",
            },
        },
        allIds : ["comment1", "comment2", "comment3", "commment4", "comment5"]
    }
};

function postsLoadingStatus(state = false, action) {
	
	switch (action.type) {
        case POSTS_HAS_ERRORED:
            return action.hasErrored;
        case POSTS_IS_LOADING:
        	console.log("item loading");
            return action.isLoading;
        default:
            return state;
    }

}

function posts(state=initialState, action) {
	const {posts} = action;
	switch (action.type) {
        case POSTS_FETCH_DATA_SUCCESS:
             state = (posts).map(function(post){
            	state.posts.byId[post.id] = {
            		id: post.id,
            		body: post.body
            	}
            	state.posts.allIds.push(post.id);
            	return state;	
            });
            return state.posts
     
        default:
            return state;
    }
}

export default combineReducers({
	postsLoadingStatus,
	posts
});