import React from 'react';

import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { firebaseApp } from '../lib/firebase';

class Login extends React.Component {
 
  state={
    username:'',
    password:'',
    }

  handleOnChange = (name) => (e) => {
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("successfullylogin");
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log("email already exyst");
        this.setState({ error: error.message });
      });
    }

  render() {
    return (
      <React.Fragment>
      <Card className="login-page">
        <CardContent >
          <Typography align="center" variant="h3" color="textSecondary" gutterBottom>
            Instagram
          </Typography>
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
            label="Password"
            className="login-input"
            type="password"
            margin="normal"
            variant="outlined"
            onChange = {this.handleOnChange('password')}
          />

        </CardContent>
        <CardActions>
          <Button variant="contained" className ="login-button"color="primary" onClick={this.handleSubmit}>
            Sign in
          </Button>
        </CardActions>
      </Card>
      <Paper elevation={1} className="login-page">
        <Typography variant="h6" align="center" color="textSecondary" component="h3">
          {"Don't have an account? "} <Link to="/signup">Sign up</Link> 
        </Typography>
      </Paper>
      </React.Fragment>
    );
  }
}

export default Login;