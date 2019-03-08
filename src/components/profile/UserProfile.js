import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { InstagramIcon } from '../lib/CustomSVGIcons'
import grey from '@material-ui/core/colors/grey';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import Gallery from './Gallery';
import Typography from '@material-ui/core/Typography';
import { getUserPosts } from '../lib/Service'; 

const grey500 = grey['500'];

const styles = {
  avatar: {
    marginLeft: 150,
    width: 150,
    height: 150,
  }
};

class UserProfile extends Component {
  state = {
    posts: []
  }

  async componentDidMount() {
    const posts = await getUserPosts(this.props.match.params.userId);
    this.setState({posts})
  }

  render() {
    const { posts } = this.state;
    console.log(posts)
    if (posts.length < 1) {
      return (<div> Loading... </div>)
    }

    return (
     <React.Fragment>
      <header className="user-profile-header">
      <AppBar position="static" color="default">
         <Toolbar>
           <Typography 
             className="instagram-header"
             variant="h6" 
             color="inherit"
           >
             <InstagramIcon/>
           </Typography>
           <span
             style={{
               backgroundColor: grey500,
               display: 'block',
               height: 32,
               marginLeft: '14px',
               marginRight: '14px',
               minWidth: 1
             }}
           />
           <div className="search">
            <div>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
            />
          </div>
         </Toolbar>
       </AppBar>
     </header>
       <div className="profile-info">
         <Avatar alt="useravatar" src={posts[0].avatar_src} style={styles.avatar} />
         <Typography variant="h3" align="center" gutterBottom>
           {posts[0].post_author}
         </Typography>
       </div>
       <Gallery posts={posts}/>
     </React.Fragment>
   )
  }
}

export default UserProfile