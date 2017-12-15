export const FETCH_POSTS = "FETCH_POSTS";
export const UPVOTE="UPVOTE";
export const UPVOTE_DOWNVOTE="UPVOTE_DOWNVOTE";
export const FETCH_COMMENTS="FETCH_COMMENTS";
export const UPVOTE_DOWNVOTE_COMMENTS="UPVOTE_DOWNVOTE_COMMENTS";
export const EDIT_POST="EDIT_POST";
export const ADD_COMMENT="ADD_COMMENT";
export const LOAD_CATEGORIES="LOAD_CATEGORIES";
export const ADD_POST="ADD_POST";
export const  DELETE_POST="DELETE_POST";
export const  DELETE_COMMENT="DELETE_COMMENT";

export function fetchPosts(posts) {
    return {
        type: FETCH_POSTS,
        posts
    }
}

export function upvote_downvote(votes, postId) {
    console.log('in action', postId);
    return {
        type: UPVOTE_DOWNVOTE,
        votes,
        postId
    }
}

export function fetchComments(postId, commentsList) {
    console.log('in action', postId);
    return {
        type: FETCH_COMMENTS,
        postId,
        commentsList
    }
}

export function upvote_downvote_comments(votes, commentsId) {
    console.log('in action', commentsId);
    return {
        type: UPVOTE_DOWNVOTE_COMMENTS,
        votes,
        commentsId
    }
}

export function editPost(newPost) {
    return {
        type: EDIT_POST,
        newPost
    }
}

export function addComments(parentId, commentCount, commentDetails) {
    console.log('commentDetails:', commentCount);
    return {
        type: ADD_COMMENT,
        parentId,
        commentCount,
        commentDetails
    }
}

export function loadCategories(categories) {
    return {
        type: LOAD_CATEGORIES,
        categories
    }
}

export function addPost(newPost ){
    return {
        type: ADD_POST,
        newPost,
    }
}

export function deletePost(postId) {
    return {
        type: DELETE_POST,
        postId
    }
}

export function deleteComment(commentsId, parentId, commentCount) {
    console.log("delete comment action");
    return {
        type: DELETE_COMMENT,
        commentsId,
        parentId,
        commentCount
    }
}
