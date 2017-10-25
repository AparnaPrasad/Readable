export const FETCH_POSTS = "FETCH_POSTS";
export const UPVOTE="UPVOTE";
export const UPVOTE_DOWNVOTE="UPVOTE_DOWNVOTE";

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
