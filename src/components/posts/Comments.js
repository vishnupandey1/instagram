import React from 'react';
import { Link } from "react-router-dom";

import styles from './Comments.module.css';

const Comments = (props) => {

  let commentData = Object.values(props.commnets);
  let comments;
  if (commentData.length > 0 ) {
    comments = commentData.map((comment, key) => {
      return (
        <p key={key} className={styles.comment}>
          <Link className={styles.comment_author} to={`/user/${comment.comment_author_id}`}>{comment.comment_author}</Link> {comment.comment}
        </p>
      )
    })
  }
  return comments
}

export default Comments
