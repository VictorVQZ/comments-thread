import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import * as selectors from '../selectors';
import moment from 'moment';

import Comment from '../components/Comment/Comment';
import AddComment from '../components/AddComment/AddComment';

const Comments = (props) => {
	const onComponentMount = props.onComponentMount;
	useEffect(() => {
    	onComponentMount();
  	}, [onComponentMount]);

  	const publishCommentHandler = (commentText, commentId) => {
		const newComment = {
			"author": "user@test.com",
	      	"comment": commentText,
	      	"date": moment().format('YYYY-MM-DDTHH:mm:ss'),
	      	"commentId": commentId
		};
	    props.onAddedComment(newComment);
	};

	return (
		<div style={{paddingRight: '10px', paddingBottom: '10px'}}>
			<h4>Add comment</h4>
			<AddComment 
				commentId={null}
				commentAdded={publishCommentHandler} />
			{
				props.comments.map(comment => (
					<Comment 
						key={comment.id}
						id={comment.id}
						author={comment.author}
						comment={comment.comment}
						date={comment.date}
						replies={comment.replies}
						commentAdded={publishCommentHandler} />
				))
			}
		</div>
	);
};

// class Comments extends Component{

// 	componentDidMount(){
//         this.props.onComponentMount();
// 	}

// 	publishCommentHandler(commentText, commentId){
// 		const newComment = {
// 			"author": "user@test.com",
// 	      	"comment": commentText,
// 	      	"date": moment().format('YYYY-MM-DDTHH:mm:ss'),
// 	      	"commentId": commentId
// 		};

//         this.props.onAddedComment(newComment);
// 	}	

// 	render(){
// 		return (
// 			<div style={{paddingRight: '10px', paddingBottom: '10px'}}>
// 				<h4>Add comment</h4>
// 				<AddComment 
// 					commentId={null}
// 					commentAdded={this.publishCommentHandler.bind(this)} />
// 			{
// 				this.props.comments.map(comment => (
// 					<Comment 
// 						key={comment.id}
// 						id={comment.id}
// 						author={comment.author}
// 						comment={comment.comment}
// 						date={comment.date}
// 						replies={comment.replies}
// 						commentAdded={this.publishCommentHandler.bind(this)} />
// 				))
// 			}
// 			</div>
// 		);
// 	}
// }

const mapStateToProps = state => {
    return {
    	comments: selectors.selectComments(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onComponentMount: () => dispatch(actionTypes.getData()),
        onAddedComment: (comment) => dispatch(actionTypes.addComment(comment))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);