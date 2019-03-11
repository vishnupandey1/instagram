import React, { Component } from 'react';

import styles from './UserProfile.module.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { InstagramIcon } from '../lib/CustomSVGIcons'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Gallery from './Gallery';
import Typography from '@material-ui/core/Typography';
import { getUserPosts } from '../lib/Service'; 
import  PostPreview from '../posts/PostPreview';

const style = {
  avatar: {
    marginLeft: 150,
    width: 150,
    height: 150,
    marginTop: '25px'
  }
};

class UserProfile extends Component {
  state = {
    posts: [],
    activeTab: 'Grid'
  }

  async componentDidMount() {
    const posts = await getUserPosts(this.props.match.params.userId);
    this.setState({posts})
  }

  handleOnChange = (name) => (e) => {
    this.setState({ activeTab: name });
  };

  render() {
    const { posts, activeTab } = this.state;
    if (posts.length < 1) {
      return (<div> Loading... </div>)
    }

    let renderPostPreview = '';
    if ('List' === activeTab) {
      if (posts.length > 0) {
        renderPostPreview = posts.map((post,key) => {
           return (
             <PostPreview
               post={post}
               key={key}
               current_user_id={this.props.match.params.userId}
             />
           )
        });
      }
    }

    return (
      <React.Fragment>
        <AppBar  position="fixed" color="default">
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
            >
              <InstagramIcon/>
            </Typography>
            <span
              className={styles.seperator}
            />
            <div className={styles.search}>
              <div>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={styles.profile}>
          <Avatar alt="useravatar" src={posts[0].avatar_src} style={style.avatar} />
          <div className={styles.user_name}>
            <Typography variant="h3" align="center" gutterBottom>
              {posts[0].post_author}
            </Typography>
          </div>
        </div>
        <div className={styles.button}>
          <Button 
            variant="outlined"
            size="medium"  
            onClick={this.handleOnChange('Grid')}
          >
            Grid
          </Button>
          <Button 
            variant="outlined"
            size="medium"  
            onClick={this.handleOnChange('List')}
          >
            List
          </Button>
        </div>
        {renderPostPreview}
        {  'Grid' === activeTab && (
          <Gallery posts={posts}/>
        )}
      </React.Fragment>
    )
  }
}

export default UserProfile