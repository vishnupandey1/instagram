import React from 'react';

import { Link } from "react-router-dom";
import Divider from '@material-ui/core/Divider';

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
    comments = commentData.map((comment) => {
      return (
        <p key={1} style={styles.comment}>
          <Link style={styles.comment_author} to={`/user/${comment.comment_author_id}`}>{comment.comment_author}</Link> {comment.comment}
          <Divider variant="middle" />
        </p>
      )
    })
  }
  return comments
}

export default Comments