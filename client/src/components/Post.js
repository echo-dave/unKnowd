import React, { useState } from 'react';
import PostView from "./PostView";
import PostForm from "./PostForms/PostForm";
import Event from "./Event";
import EventForm from "./PostForms/EventForm";



function Post (props) {
    const [editPost,setEditPost] = useState(false);
    const [editEvent,setEditEvent] = useState(false);

    const editThisPost = () => setEditPost(!editPost)
    const editThisEvent = () => setEditEvent(!editEvent)
    
    return (
        <>
        {(!props.eventShow && !editPost) ? <PostView {...props} editThisPost={editThisPost} /> 
        : (!props.eventShow && editPost) ? <PostForm {...props} editThisPost={editThisPost} /> 
        : null }
        
        {(props.eventShow && !editEvent) ? <Event {...props} editThisEvent={editThisEvent} /> 
        : (props.eventShow && editEvent) ?
        <EventForm {...props} editThisEvent={editThisEvent} /> 
        : null }

        </>
    )
}

export default Post