import {FETCH_POSTS, UPVOTE_DOWNVOTE, FETCH_COMMENTS, 
    UPVOTE_DOWNVOTE_COMMENTS, EDIT_POST, ADD_COMMENT, 
    LOAD_CATEGORIES, ADD_POST, DELETE_POST, DELETE_COMMENT} from '../actions/App';
import { combineReducers } from 'redux';


function posts(state={}, action) {
    const {posts, votes, postId, newPost, parentId,
     commentCount} = action;
	switch (action.type) {
        case FETCH_POSTS:
            const postDetails = {};
            const ids = posts.map((p)=>{
                postDetails[p.id] = p;
                return p.id
            })
            return {postById: postDetails,
                    postId: ids};
        case UPVOTE_DOWNVOTE:
            console.log("in reducer uv dv", state, votes, action, postId);
            return { ...state, postById:{
                ...state.postById, 
                [postId]:{
                    ...state.postById[postId],
                    voteScore: votes
                }
            }
        };
        case EDIT_POST:
            return { ...state, postById:{
                ...state.postById,
                [newPost.postId]: {
                    ...state.postById[newPost.postId],
                    title: newPost.title,
                    body: newPost.body
                }
            }
            }
         case ADD_COMMENT:
            console.log('state:', state);
            return { ...state, postById:{
                ...state.postById,
                [parentId]: {
                    ...state.postById[parentId],
                    commentCount: commentCount,
                }
            }
                
            }
        case DELETE_COMMENT:
            console.log(' at dele comm parentId:', parentId);
            console.log('commentCount', commentCount);
            return { ...state, postById:{
                ...state.postById,
                [parentId]: {
                    ...state.postById[parentId],
                    commentCount: commentCount,
                }
            }
                
        }

        case ADD_POST:
           return{
                ...state, 
                
                postById:{
                    ...state.postById, 
                    [newPost.id]: newPost
                    
                },
                postId:[
                        ...state.postId,
                        newPost.id
                ]
            }
        case DELETE_POST:
            console.log('')
            return { ...state, postById:{
                ...state.postById, 
                [postId]:{
                    ...state.postById[postId],
                    deleted: true
                }
            }
        };
        default:
            return state;
    }
}

function comments(state={}, action) {
    const {commentsList, postId, votes, commentsId, commentDetails} = action;
    switch(action.type){
        case FETCH_COMMENTS:
            console.log("in reducer fetch comments", state, action, commentsList, postId);
            const commentsDetails = {};
            const ids = commentsList.map((p)=>{
                commentsDetails[p.id] = p;
                return p.id
            })
            return {commentsById: commentsDetails,
                    commentsIds: ids,
                    postId: postId};
        case UPVOTE_DOWNVOTE_COMMENTS: 
            return { ...state, commentsById:{
                ...state.commentsById, 
                [commentsId]:{
                    ...state.commentsById[commentsId],
                    voteScore: votes
                }
            }
            };
        case ADD_COMMENT:
            console.log('state', state);
            console.log('comments details', commentDetails);
            const x = {
                ...state, commentsById:{
                    ...state.commentsById,
                    [commentDetails.id]: commentDetails
                },
                commentsIds:[
                    ...state.commentsIds,
                    commentDetails.id
                ]
            }
            console.log("ret val of new comment:", x);
            return x;
        case DELETE_COMMENT:

            console.log("in delete item", commentsId);
            console.log('state', state);
            return { ...state, commentsById:{
                    ...state.commentsById, 
                    [commentsId]:{
                        ...state.commentsById[commentsId],
                        deleted: true
                    }
                }
            };
        default:
            return state;
    }
}

function categories(state={}, action){
    const {categories} = action;
    //console.log("from reducer:", categories);
    switch(action.type) {
        case LOAD_CATEGORIES:
            return categories.categories;
        default:
            return state;
        }
}

export default combineReducers({
	posts,
    comments,
    categories
});