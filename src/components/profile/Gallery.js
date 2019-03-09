import React from 'react';

import styles from './Gallery.module.css';

const Gallery = (props) => {
  const { posts } = props;
  return (
    <div className={styles.gallery}>
      {posts.map((post,i) => (
        <div className={styles.image} key={i}>
          <img 
            width="100%"
            height="100%" 
            src={post.imageSrc} 
            alt={'Vishnu'} />
         </div>
      ))}
    </div>
  )
}

export default Gallery