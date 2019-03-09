import React, { Component } from 'react';
import moment from 'moment';

import styles from './PostPreview.module.css';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { getUserDetail } from '../lib/Service'; 
import { userProfileRef } from '../lib/firebase';
import Comments from './Comments';

class PostPreview extends Component {
 
  constructor(props) {
    super(props);

    let comments = [];
    if (this.props.post.comments) {
      comments = Object.values(this.props.post.comments);
    }
    this.state = {
      comment: '',
      comments: comments,
      likesCount: this.props.post.likesCount || 0,
      likesData: this.props.post.likesData || [],
      like: false
    }
  }

  componentDidMount() {
    const { current_user_id } = this.props;
    if (this.state.likesData.includes(current_user_id)) {
      this.setState({ like: true });
    }
  }

  handleLikes = () => {
    let { likesCount, likesData, like} = this.state;
    const { current_user_id } = this.props;
    const { post_author_id, post_id } = this.props.post

    if (likesData.includes(current_user_id)) {
      const index = likesData.indexOf(current_user_id);
      console.log(likesData.splice(index, 1));
      likesCount = likesCount - 1;
      like = false;
    } else {
      likesData[likesData.length] = current_user_id;
      likesCount = likesCount + 1;
      like = true;
    }

    this.setState({ likesCount, likesData, like });
    userProfileRef.ref(`/users/${post_author_id}/posts/${post_id}`).update({
      likesCount,
      likesData
    });
  }

  handleComment = async () => {
    let { comment, comments } = this.state;
    if ('' === comment.trim()) {
      return;
    }
    const { current_user_id } = this.props;
    const { post_author_id, post_id } = this.props.post
    const { fullname } = await getUserDetail(current_user_id);

    let newCommnetData = {
      comment,
      time: Date.now(),
      comment_author: fullname,
      comment_author_id: current_user_id
    };
    
    comments[comments.length] = newCommnetData;
    this.setState({ comments, comment: '' });

    userProfileRef.ref(`/users/${post_author_id}/posts/${post_id}/comments`).push(newCommnetData);

  }

  render () {

    const { index, post } = this.props;
    const { comments, comment, likesCount, like } = this.state;
    const { avatar_src, post_author, time, imageSrc, title } = post;

    return (
      <div className={styles.preview} key={index}>
        <Card>
          <CardHeader
            avatar={
              <Avatar alt="avatar" src={avatar_src} />
              }
             title={post_author}
             subheader={moment(time).format('LL')}
           />
           <CardMedia
             Component="img"
             style={{height: 0,paddingTop: '80.25%'}}
             src={imageSrc}
             image={imageSrc}
             title="alt"
           />
           <CardActions disableActionSpacing>
             <IconButton aria-label="Likes" onClick={this.handleLikes}>
               <FavoriteIcon color={ like ? "secondary": "default" } />
             </IconButton>
             Likes...{likesCount}
           </CardActions>
           <CardContent>
             <Typography component="div" style={{overflow: 'scroll'}}>
               {title}
             </Typography>
             <br/>
             <Divider variant="middle" />
             { comments.length > 0 && (
              <div style={{overflow: 'scroll'}}>
                <Comments commnets={comments}/>
                <Divider variant="middle" />
              </div>
             )}
             <Input
               fullWidth
               multiline={true}
               disableUnderline
               margin="dense"
               value={comment}
               placeholder="Add a commnet"
               inputProps={{
                 'aria-label': 'Description',
               }}
               onChange={(e) => this.setState({comment: e.target.value})}
             />
             <IconButton aria-label="Add-commnet" onClick={this.handleComment}>
               <AddCommentIcon />
             </IconButton>
           </CardContent>
         </Card>
        <br/>
      </div>
    );
  }
}

export default PostPreview
