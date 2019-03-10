import { userProfileRef } from './firebase';

export const getPosts = async () => {
  let  posts = [];
  let datas = await userProfileRef.ref('users').once('value', snapshot => {
    snapshot.forEach(function(child) {
      child.forEach(function(snap) {
        snap.forEach(function(data) {
           let element = data.val();
           element.post_id = data.key;
           posts.push(element)
        });
      });
    });
  })
  posts.sort((a, b) => b.time - a.time);
  return posts;
}

export const getUserDetail = (user_id) => {
  const userData = userProfileRef.ref('/users/' + user_id).once('value')
      .then(function(snapshot) {
        return { 
          fullname : snapshot.val().fullname,
          avatar_src: snapshot.val().avatar_src
        }
      }
    )
  return userData;
}

export const getUserPosts = (user_id) => {
   let posts = userProfileRef.ref(`/users/${user_id}/posts`).once('value')
    .then(function(snapshot) {
      return Object.values(snapshot.val())
    })
  return posts;
}

export const checkExistingUser = async (user_id) => {
  let isExist;
  let posts = await userProfileRef.ref('/users/').once('value')
        .then(snapshot => Object.values(snapshot.val()).forEach( (snap) => {
        if (snap.user_id === user_id) {
          isExist = true;
        } else {
          isExist = false;
        }
      }
    )
  )
  return isExist;
}
