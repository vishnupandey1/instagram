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

  state = {
    email: '',
    password: '',
    error: false
    }

  handleOnChange = (name) => (e) => {
    this.setState({ [name]: e.target.value , error: false });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        localStorage.setItem("current_user_id", user.user.uid);
        console.log("successfullylogin");
        this.props.history.push('/');
    })
    .catch((error) => {
      this.setState({ error: true, email: '', password: '' });
    });
  }

  render() {
    const { email, password, error } = this.state;

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
            value={email}
            margin="normal"
            variant="outlined"
            onChange = {this.handleOnChange('email')}
          />

          <TextField
            label="Password"
            className="login-input"
            type="password"
            value={password}
            margin="normal"
            variant="outlined"
            onChange = {this.handleOnChange('password')}
          />

          { error && (
            <Typography variant="caption" color="secondary" gutterBottom>
              {"The email address or password that you've entered doesn't match any account. Sign up for an account."}
            </Typography>
          )}
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