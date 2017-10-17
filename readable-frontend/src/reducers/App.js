import {RECEIVE_POSTS} from '../actions/App';
import { combineReducers } from 'redux';

function posts(state = {}, action) {
	
	switch(action.type) {
		case RECEIVE_POSTS: 
			/*update post state*/
		default:
			return state;
	}
}