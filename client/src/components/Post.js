import React, { useState } from 'react';
import PostView from "./PostView";
import PostForm from "./PostForms/PostForm";



function Post (props) {
    const [editPost,setEditPost] = useState(false);

    const editThisPost = () => {
        setEditPost(!editPost)
    }

    return (
        <>
        {!editPost ? <PostView {...props} editThisPost={editThisPost} /> : <PostForm {...props} editThisPost={editThisPost} />}
        </>
    )
}

export default Post