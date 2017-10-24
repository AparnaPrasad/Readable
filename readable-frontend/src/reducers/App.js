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
            
        },/*FORMAT
            "comment1" : {
                id : "comment1",
                author : "user2",
                comment : ".....",
            },
            "comment2" : {
                id : "comment2",
                author : "user3",
                comment : ".....",
            }*/
        allIds : []
    }
};

function postsLoadingStatus(state = false, action) {
	
	switch (action.type) {
        case POSTS_IS_LOADING:
            return action.isLoading;
        default:
            return state;
    }

}

function postsErrorStatus(state = false, action) {
    switch (action.type) {
        case POSTS_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}

function postsAndComments(state=initialState, action) {
	const {posts} = action;
	switch (action.type) {
        case POSTS_FETCH_DATA_SUCCESS:
             (posts).map(function(post){
            	state.posts.byId[post.id] = {
            		id: post.id,
            		body: post.body
            	}
            	state.posts.allIds.push(post.id);
            	return state;	
            });
            return state
     
        default:
            return state;
    }
}

export default combineReducers({
	postsLoadingStatus,
    postsErrorStatus,
	postsAndComments
});