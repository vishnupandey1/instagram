import React, { Component } from 'react';
import moment from 'moment';

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
 
  state = {
    comment: '',
    comments: this.props.post.comments || '',
    likesCount : this.props.post.likesCount || 0
  }

  handleLikes = () => {
    let { likesCount} = this.state;
    const { post_author_id, post_id } = this.props.post
    likesCount = ++likesCount
    userProfileRef.ref(`/users/${post_author_id}/posts/${post_id}`).update({
      likesCount: likesCount
    });
    this.setState({ likesCount:likesCount });
  }

  handleComment = async () => {
    const { comment } = this.state;
    if ('' === comment.trim()) {
      return;
    }
    const { current_user_id } = this.props;
    const { post_author_id, post_id } = this.props.post
    const { fullname } = await getUserDetail(current_user_id);
    userProfileRef.ref(`/users/${post_author_id}/posts/${post_id}/comments`).push({
      comment,
      time: Date.now(),
      comment_author: fullname,
      comment_author_id: current_user_id
    });
  }

  render () {
    return (
      <div className="post-preview" key={this.props.index} style={{height: 'auto'}}>
      <Card>
        <CardHeader
          avatar={
            <Avatar alt="avatar" src={this.props.post.avatar_src} />
            }
           title={this.props.post.post_author}
           subheader={moment(this.props.post.time).format('LL')}
           />
           <CardMedia
             Component="img"
             style={{height: 0,paddingTop: '80.25%'}}
             src={this.props.post.imageSrc}
             image={this.props.post.imageSrc}
             title="alt"
           />
           <CardActions disableActionSpacing>
             <IconButton aria-label="Likes" onClick={this.handleLikes}>
               <FavoriteIcon />
             </IconButton>
             Likes...{this.state.likesCount}
           </CardActions>
           <CardContent>
             <Typography component="div" style={{overflow: 'scroll'}}>
               {this.props.post.title}
             </Typography>
             <br/>
             <Divider variant="middle" />
             { '' !== this.state.comments && (
              <div style={{overflow: 'scroll'}}>
                <Comments commnets={this.state.comments}/>
              </div>
             )}
             <div >
               <Input
                 fullWidth
                 multiline={true}
                 disableUnderline
                 margin="dense"
                 placeholder="Add a commnet"
                 inputProps={{
                   'aria-label': 'Description',
                 }}
                 onChange={(e) => this.setState({comment: e.target.value})}
               />
               <IconButton aria-label="Add-commnet" onClick={this.handleComment}>
                 <AddCommentIcon />
               </IconButton>
             </div>
           </CardContent>
         </Card>
        <br/>
      </div>
    );
  }
}

export default PostPreview
