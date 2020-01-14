import React from 'react';
import Comment from './Comment';

const replies = (props) => (
	<div className="replies">
		{
			props.replies.map(comment => (
				 <Comment 
					key={comment.id}
					id={comment.id}
					author={comment.author}
					comment={comment.comment}
					date={comment.date}
					replies={comment.replies}
					commentAdded={props.commentAdded} />
			))
		}
	</div>
);

export default replies;