import * as ReadableAPI from '../../../readable-server/api-server/server';

export const RECEIVE_POSTS = "RECEIVE_POSTS";

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export function fetchPosts() 
{
  	fetch('http://localhost:3001/posts/', { headers: { 'Authorization': 'apbsAuth' }})
   	      .then(posts=> console.log(posts))
}	
