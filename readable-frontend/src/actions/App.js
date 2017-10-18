//import * as ReadableAPI from '../../../readable-server/api-server/server';

export const POSTS_HAS_ERRORED = "POSTS_HAS_ERRORED";
export const POSTS_IS_LOADING="POSTS_IS_LOADING";
export const POSTS_FETCH_DATA_SUCCESS="POSTS_FETCH_DATA_SUCCESS";
/*export const receivePosts = (posts) => (
console.log('in receive posts')
{
  type: RECEIVE_POSTS,
  posts
}); */

/*export function fetchPosts() 
{
	console.log('in fetch func');
	fetch('http://localhost:3001/posts',
		{method:'GET', headers:{'Authorization':'apbsAuth'}}).then(res=>res.json()).then(data=>dispatch(receivePosts(data)))
}	

export const fetchPosts = () => dispatch => (
  fetch('http://localhost:3001/posts',
		{method:'GET', headers:{'Authorization':'apbsAuth'}}).then(res=>res.json()).then(data=>dispatch(receivePosts(data)))

);*/

export function postsHasErrored(bool) {
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
	console.log("in postsFetchDataSuccess", posts);
	//dispatch comment for each posts
    return {
        type: 'POSTS_FETCH_DATA_SUCCESS',
        posts
    };
}

export function fetchCommentsForPosts(posts) {
	console.log("in fcp",posts)
}

export function postsFetchData() {
	console.log('in posts fetch')
    return (dispatch) => {
        dispatch(postsIsLoading(true));
        fetch('http://localhost:3001/posts',
		{method:'GET', headers:{'Authorization':'apbsAuth'}})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(postsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((posts) => dispatch(postsFetchDataSuccess(posts)))
            .catch(() => dispatch(postsHasErrored(true)));
    };
}