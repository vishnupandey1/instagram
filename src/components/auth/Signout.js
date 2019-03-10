import React from 'react';

import { firebaseApp } from '../lib/firebase';

class Signout extends React.Component {
  constructor(props) {
    super(props);
    this.signout()
   }

  signout = () =>{
    return firebaseApp.auth().signOut()
  }

  render() {
    localStorage.removeItem("current_user_id");
    this.props.history.push('/login');
    return null;
  }
}

export default Signout;
