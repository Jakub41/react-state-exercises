import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
    render() {
        const { comments, onFetch, onShowErrorMessage } = this.props;
        if (!comments || comments.length === 0) {
            return null;
        }
        const commentList = comments.map(comment => {
            return <Comment key={comment._id} data={comment} onFetch={onFetch} onShowErrorMessage={onShowErrorMessage} />
        })
        return (
            <div>
                {commentList}
            </div>
        )
    }

}
export default CommentList;