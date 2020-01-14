import React, { useState } from 'react';
import styles from './AddComment.module.css';

const AddComment = (props) => {
	var [commentText, setCommentText] = useState('');

	return (
		<div className={styles.addComment}>
			<textarea 
				className={styles.textarea}
				onChange={(event) => setCommentText(event.target.value)} 
				value={commentText}></textarea>
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