import React from 'react';

const Gallery = (props) => {
  const { posts } = props;
  return (
    <div className="profile-page">
      {posts.map((post,i) => (
        <div className="profile-page-image"key={i}>
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