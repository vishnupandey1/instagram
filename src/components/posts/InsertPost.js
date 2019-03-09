import * as React from 'react';

import styles from './PostPreview.module.css';
import MuiDialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import { storageRef, userProfileRef } from '../lib/firebase';
import { getUserDetail } from '../lib/Service';

class InsertPost extends React.Component {

  state = {
    open: this.props.open,
    imageSrc: '',
    title: ''
  }

  handleSelect = (e) => {
    let image = e.currentTarget.files[0];

    let reader = new FileReader();
    reader.onloadend = async (e) => {
      let blob = new Blob([image], { type: "image/jpeg" });
      const uploadTask = await storageRef.child(`images/${image.name}`).put(blob);
      const imageSrc = await uploadTask.ref.getDownloadURL();
      this.setState({ imageSrc })
    }
    reader.onerror = (e) => {
      console.log("Failed file read: " + e.toString());
    };
    reader.readAsDataURL(image);
    return;
  };

  handleSubmit = async () => {
    const { imageSrc, title } = this.state;
    const { current_user_id, handleClose } = this.props;
    const { avatar_src, fullname  } = await getUserDetail(current_user_id)
    userProfileRef.ref(`/users/${current_user_id}/posts`).push({
      imageSrc,
      title,
      time: Date.now(),
      likes: null,
      post_author: fullname,
      post_author_id: current_user_id,
      avatar_src: avatar_src
    });
    handleClose();
  }

  render () {

    const { open, imageSrc, } = this.state;
    const { handleClose } = this.props;

    return (
      <MuiDialog
        aria-labelledby="dialog"
        open={open}
        onClose={handleClose}
        scroll="body"
        disableBackdropClick
        disableEscapeKeyDown
        className={styles.modal}
      >
        <DialogTitle>
          <Typography variant="h6"  align="center" id="modal-title">
            Post theimage
          </Typography>
          <Divider />
        </DialogTitle>
        <DialogContent>
          { imageSrc && (
            <img
              src={imageSrc}
              height="400"
              width="100%"
              alt="m preview..."
            />
          )}
          <div className={styles.uploader}>
            <input
              type="file"
              name="pic"
              accept="image/*"
              onChange={this.handleSelect}
            />
          </div>
          <div>
            <Input
              fullWidth
              placeholder="Say something..."
              inputProps={{
                'aria-label': 'Description',
              }}
              onChange={(e) => this.setState({title: e.target.value})}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained"
            color="secondary"
            onClick={this.props.handleClose}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
       </DialogActions>
     </MuiDialog>
    )
  }
}

export default InsertPost;
