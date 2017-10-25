import {FETCH_POSTS, UPVOTE_DOWNVOTE} from '../actions/App';
import { combineReducers } from 'redux';


function posts(state={}, action) {
    const {posts, votes, postId} = action;
	switch (action.type) {
        case FETCH_POSTS:
            const postDetails = {};
            //const postId=[];
            const ids = posts.map((p)=>{
                postDetails[p.id] = p;
                //postId.push(p.id);
                return p.id
            })
            console.log("ids", ids);
            console.log("before returing")
            return {postById: postDetails,
                    postId: ids};
        case UPVOTE_DOWNVOTE:
            console.log("in reducer uv dv", state, votes, action, postId);
            //state.postById[postId].voteScore = votes;
            return { ...state, postById:{
                ...state.postById, 
                [postId]:{
                    ...state.postById[postId],
                    voteScore: votes
                }
            }
        } ;
        default:
            return state;
    }
}

export default combineReducers({
	posts
});