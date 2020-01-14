import React, { useState } from 'react';
import styles from './Comment.module.css';
import Replies from './Replies';
import AddComment from '../AddComment/AddComment';

const Comment = (props) => {
	const [reply, setReplyState] = useState(false);

	return (
		<div className={styles.comment}>
			<div className={styles.commentHeader}>
				<div>{props.author}</div>
				<div className={styles.commentDate}>{props.date}</div>
			</div>
			<div className="body">
				{props.comment}
			</div>
			<div>
				<button 
					className={styles.replyButton}
					onClick={() => setReplyState(!reply)}>Reply</button>
				{
					reply ? 
						<AddComment 
							commentId={props.id}
							commentAdded={props.commentAdded}
							replyState={setReplyState} /> 
					: 
					null 
				}
			</div>
			<Replies 
				replies={props.replies}
				commentAdded={props.commentAdded} />
		</div>
	);
};

export default Comment;