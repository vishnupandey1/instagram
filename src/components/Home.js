import React from 'react';

import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { InstagramIcon } from './lib/CustomSVGIcons'
import grey from '@material-ui/core/colors/grey';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import InsertPost from './posts/InsertPost'
import { isLoggedInUser, getPosts } from './lib/Service';
import  PostPreview from './posts/PostPreview';

const grey500 = grey['500'];

class Home extends React.Component {

  state = {
    open:false,
    posts: [],
    current_user_id: '',
    user_name:''
  };
  
  async componentDidMount () {
   const current_user_id = await isLoggedInUser();
   const posts = await getPosts();
   console.log(posts)
   this.setState({posts: posts, current_user_id:current_user_id });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleSignout = () => {
    this.props.history.push("/signout")
  }

  handleClose = async () => {
    this.setState({ open: false });
    const posts = await getPosts();
    this.setState({posts: posts});
  };

  render() {

   if (this.state.current_user_id === '') {
     return <div> <Link to="/login">Please</Link> login to continue....If do not have account please <Link to="/signup">signup</Link> first!!!</div>
   }

   let renderPostPreview = '';
   if (this.state.posts.length > 0) {
     renderPostPreview = this.state.posts.map((post,key) => {
        return (
          <PostPreview 
            post={post}
            key={key}
            current_user_id={this.state.current_user_id}
          />
        )
     });
   }

    return (
     <div>
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
           <Button
             variant="contained"
             color="primary"
             onClick={this.handleOpen}
           >
             Upload post
           </Button>
           <Button
             variant="contained"
             color="secondary"
             onClick={this.handleSignout}
           >
             sign out
           </Button>
          </Toolbar>
        </AppBar>
        <div>
        { this.state.open && (
          <InsertPost
            current_user_id={this.state.current_user_id}
            open={this.state.open}
            handleClose={this.handleClose}
          />
        )}
        {renderPostPreview}
        </div>
      </div>
    );
  }
}

export default Home;
