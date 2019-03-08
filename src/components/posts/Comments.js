import React from 'react';

import { Link } from "react-router-dom";

const styles = {
  comment_author:{
    fontWeight: 'bold',
    marginRight: 5,
    textDecoration: 'none',
    color: 'black',
  },
  comment:{
    marginTop: 10,
    marginBottom: 0
  }
}

const Comments = (props) => {

  let commentData = Object.values(props.commnets);
  let comments;
  if (commentData.length > 0 ) {
    comments = commentData.map((comment, key) => {
      return (
        <p key={key} style={styles.comment}>
          <Link style={styles.comment_author} to={`/user/${comment.comment_author_id}`}>{comment.comment_author}</Link> {comment.comment}
        </p>
      )
    })
  }
  return comments
}

export default Comments
