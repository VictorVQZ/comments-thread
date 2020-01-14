import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import moment from 'moment';

import Comment from '../components/Comment/Comment';
import AddComment from '../components/AddComment/AddComment';

class Comments extends Component{

	componentDidMount(){
        this.props.onComponentMount();
	}

	publishCommentHandler(commentText, commentId){
		const newComment = {
			"author": "user@test.com",
	      	"comment": commentText,
	      	"date": moment().format('YYYY-MM-DDTHH:mm:ss'),
	      	"commentId": commentId
		};

        this.props.onAddedComment(newComment);
	}

	findReplies(commentId){
		var comments = [];
		this.props.comments.filter(e => e.commentId === commentId && e.id !== commentId).forEach((c, i) => {
			var c2 = {...c};
			c2['replies'] = this.findReplies(c.id);						
			comments.push(c2);
		});
		return comments;
	}

	render(){
		var comments = this.findReplies(null);		
		return (
			<div style={{paddingRight: '10px', paddingBottom: '10px'}}>
				<h4>Add comment</h4>
				<AddComment 
					commentId={null}
					commentAdded={this.publishCommentHandler.bind(this)} />
			{
				comments.map(comment => (
					<Comment 
						key={comment.id}
						id={comment.id}
						author={comment.author}
						comment={comment.comment}
						date={comment.date}
						replies={comment.replies}
						commentAdded={this.publishCommentHandler.bind(this)} />
				))
			}
			</div>
		);
	}	
}

const mapStateToProps = state => {
    return {
    	comments: state.comments
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onComponentMount: () => dispatch(actionTypes.getData()),
        onAddedComment: (comment) => dispatch(actionTypes.addComment(comment))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);