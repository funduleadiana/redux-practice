import { useEffect } from 'react';
import React from 'react';

import {fetchPost } from '../actions/postActions';
import {fetchComments} from '../actions/commentsActions';

import {Post} from '../components/Post'
import {Comment} from '../components/Comment'
import { connect } from 'react-redux';

const SinglePostPage = ({
    match,
    dispatch,
    post,
    comments,
    hasErrors,
    loading
})=> {
    useEffect(()=>{
        const {id} = match.params
        dispatch(fetchComments(id))
        dispatch(fetchPost(id))
    }, [dispatch, match])

const renderPost = () => {
    if(loading.post) return <p>Loading post...</p>
    if(hasErrors.post) return <p>Unable to load post :(</p>
    return <Post post={post}/>
}

    const renderComments = () => {
        if(loading.comments) return <p>Loading comments...</p>
        if(hasErrors.comments) return <p>Unable to display comments :(</p>

        return comments.map(comment => (
            <Comment key={comment.id} comment = {comment}/>
        ))
    }
    return(
        <section>
            {renderPost()}
            <h2>Comments</h2>
            {renderComments()}
        </section>
    )
}

const mapStatetoProps = state => ({
    post: state.post.post,
    comments: state.comments.comments,
    loading: {post: state.post.loading, comments: state.comments.loading},
    hasErrors: {post: state.post.hasErrors, comments: state.comments.hasErrors}
})


export default connect(mapStatetoProps)(SinglePostPage)