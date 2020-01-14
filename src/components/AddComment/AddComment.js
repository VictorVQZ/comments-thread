import React, { useState, useEffect } from 'react';
import styles from './AddComment.module.css';

var commentInput;

const AddComment = (props) => {
	var [commentText, setCommentText] = useState('');

	useEffect(() => {
    	commentInput.focus();
  	}, []);

	return (
		<div className={styles.addComment}>
			<textarea 
				className={styles.textarea}
				onChange={(event) => setCommentText(event.target.value)} 
				value={commentText}
				ref={(input) => { commentInput = input; }}></textarea>
			<button 
				className={styles.publishButton}
				onClick={() => {
				if(props.replyState) props.replyState(false);			
				props.commentAdded(commentText, props.commentId);
				setCommentText('');
			}}>Publish</button>
		</div>
	)
};

export default AddComment;