import React, { Component } from 'react';
import DeleteConfirmationPage from './DeleteConfirmationPage';
import {connect} from 'react-redux';
import Modal from 'react-modal';

class DeleteItem extends Component {

	state={
			isConfirmDeleteViewOpen : false
		}
		closeConfirmDeleteViewModal() {
    	this.setState(() => ({ isConfirmDeleteViewOpen: false }))
		}
		openConfirmDeleteViewModal() {
		this.setState(() => ({ isConfirmDeleteViewOpen: true,				
		 }))
		}

	render(){
		const {item, itemId, parentPostId} = this.props;
		const {isConfirmDeleteViewOpen} = this.state;
		
		return(
			<span>
			<button onClick={()=>this.openConfirmDeleteViewModal()}>Delete {item}</button>
			<Modal
		        className='modal'
		        overlayClassName='overlay modalSize big'
		        isOpen={isConfirmDeleteViewOpen}
		        onRequestClose={()=>this.closeConfirmDeleteViewModal()}
		        contentLabel='Modal'>
          		{isConfirmDeleteViewOpen &&  <DeleteConfirmationPage 
          			item={item} 
          			itemId={itemId} 
          			parentPostId={parentPostId}
          			closeConfirmDeleteViewModal={this.closeConfirmDeleteViewModal.bind(this)} />}
        		<button onClick={()=>this.closeAddCommentsViewModal()}>Close</button>
        		</Modal>
        		
			</span>
		)
	}
}
function mapStateToProps({posts,comments}) {
	return {
		//posts: posts,
	}

}

function mapDispatchToProps(dispatch) {
	return {
		//editPost: (votes, postId) => dispatch(editPost(votes, postId))	
	}

}
export default connect(mapStateToProps, mapDispatchToProps)(DeleteItem);