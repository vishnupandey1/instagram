import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { firebaseApp, userProfileRef } from '../lib/firebase';

const styles = {
  avatar: {
    marginLeft: 150,
    width: 100,
    height: 100,
  }
};

class Signup extends React.Component {

  state = {
    email: '',
    fullname: '',
    username:'',
    password:'',
    avatar_src: 'https://pngimage.net/wp-content/uploads/2018/05/default-avatar-png-9.png',
    }

  handleOnChange = (name) => (e) => {
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = () => {
    const { email, password, fullname, username, avatar_src } = this.state;
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const user_id = user.user.uid
        userProfileRef.ref('/users/' + user_id).set({
          email,
          fullname,
          username,
          user_id,
          avatar_src
        });
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  };

  render() {
    return (
      <Card className="login-page">
        <CardContent >
          <Typography align="center" variant="h3" color="textSecondary" gutterBottom>
            Instagram
          </Typography>
          <Typography align="center" variant="h6" color="textSecondary" gutterBottom>
            Sign up to see photos and videos from your friends.
          </Typography>
          <Avatar alt="useravatar" src={this.state.avatar_src} style={styles.avatar} />
          <TextField
            label="Enter your email"
            className="login-input"
            type="email"
            name="email"
            margin="normal"
            variant="outlined"
            onChange = {this.handleOnChange('email')}
          />
          <TextField
            label="Full Name"
            className="login-input"
            margin="normal"
            variant="outlined"
            onChange = {this.handleOnChange('fullname')}
          />
          <TextField
            label="Username"
            className="login-input"
            margin="normal"
            variant="outlined"
            onChange = {this.handleOnChange('username')}
          />
          <TextField
            label="Password"
            className="login-input"
            type="password"
            margin="normal"
            variant="outlined"
            onChange = {this.handleOnChange('password')}
          />
          <TextField
            label="Add avatar url"
            className="login-input"
            margin="normal"
            variant="outlined"
            onChange = {this.handleOnChange('avatar_src')}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            className ="login-button"
            color="primary"
            onClick={this.handleSubmit}
          >
            Sign up
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default Signup;