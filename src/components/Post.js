import React from 'react';

const Post = ({ post, handleCart }) => {
    return (
        <div className="card w-96 bg-primary text-primary-content">
            <div className="card-body">
                <h3>{post.id}</h3>
                <h2 className="card-title">{post.title}</h2>
                <div className="card-actions justify-end">
                    <button onClick={()=>handleCart(post)} className="btn">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Post;