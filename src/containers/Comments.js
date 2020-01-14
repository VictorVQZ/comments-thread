import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import axios from '../axios';

import Comment from '../components/Comment/Comment';
import AddComment from '../components/AddComment/AddComment';

class Comments extends Component{

	componentDidMount(){
		/*axios.get( '/comments' )
            .then( response => {
                const comments = response.data;
                this.props.onFetchData(comments);
            });*/
        this.props.onComponentMount();
	}

	publishCommentHandler(commentText, commentId){
		const date = new Date();

		const newComment = {
			"author": "user@test.com",
	      	"comment": commentText,
	      	"date": date.getFullYear() 
		      	+ '-' + (date.getMonth() + 1) 
		      	+ '-' + date.getDate() 
		      	+ 'T' + date.getHours() 
		      	+ ':' + date.getMinutes()
		      	+ ':' + date.getSeconds(),
	      	"commentId": commentId
		};

		axios.post('/comments', newComment)
			.then(response => {
                const comment = response.data;

                // Prevent duplicated ids due to storage not persistent
                if(this.props.comments.some(e => e.id === comment.id)){
                	comment.id = new Date().getTime();
                }

                this.props.onAddedComment(comment);
            });
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
			<div style={{paddingRight: '10px'}}>
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
        onFetchData: (comments) => dispatch({type: actionTypes.FETCH_DATA, comments: comments}),
        onComponentMount: () => dispatch(actionTypes.getData()),
        onAddedComment: (comment, commentId) => dispatch({type: actionTypes.ADD_COMMENT, comment: comment, commentId: commentId})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);