

const findReplies = (state, commentId) => {
	var comments = [];
	state.comments.filter(e => e.commentId === commentId && e.id !== commentId).forEach((c, i) => {
		var c2 = {...c};
		c2['replies'] = findReplies(state, c.id);						
		comments.push(c2);
	});
	return comments;
};

export const selectComments = (state) => {
	return findReplies(state, null);
};