export const POSTS_HAS_ERRORED = "POSTS_HAS_ERRORED";
export const POSTS_IS_LOADING="POSTS_IS_LOADING";
export const POSTS_FETCH_DATA_SUCCESS="POSTS_FETCH_DATA_SUCCESS";

export function postsHasErrored(bool) {
    console.log("in action has Errored");
    return {
        type: 'POSTS_HAS_ERRORED',
        hasErrored: bool
    };
}
export function postsIsLoading(bool) {
    return {
        type: 'POSTS_IS_LOADING',
        isLoading: bool
    };
}
export function postsFetchDataSuccess(posts) {
    console.log('in post fetch success')
    return {
        type: 'POSTS_FETCH_DATA_SUCCESS',
        posts
    }
}

export function fetchCommentsForPost(postId) {
    console.log('fetch comments');
}


export function postsFetchData() {
	console.log('in posts fetch')
    return (dispatch) => {
        console.log('in displatch of posts');
        dispatch(postsIsLoading(true));
        fetch('http://localhost:3001/posts',
		{method:'GET', headers:{'Authorization':'apbsAuth'}})
            .then((response) => {
                console.log('response', response);
                if (!response.ok) {
                    console.log('in response not ok');
                    throw Error(response.statusText);
                }
                dispatch(postsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((posts) => dispatch(postsFetchDataSuccess(posts)))
            .catch((err) => dispatch(postsHasErrored(err)));
    };
}