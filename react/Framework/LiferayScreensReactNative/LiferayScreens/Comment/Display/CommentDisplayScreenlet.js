'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

import NativeCommentDisplayScreenlet from './Bridges/CommentDisplayScreenlet';

export default class CommentDisplayScreenlet extends Component {
    render(){
        return(
            <NativeCommentDisplayScreenlet 
                {...this.props}
                // iOS events
                onCommentLoaded={this._onCommentLoaded.bind(this)}
                onLoadCommentError={this._onLoadCommentError.bind(this)}
                onCommentDeleted={this._onCommentDeleted.bind(this)}
                onDeleteComment={this._onDeleteComment.bind(this)}
                onCommentUpdated={this._onCommentUpdated.bind(this)}
                onUpdateComment={this._onUpdateComment.bind(this)}
            />
        );
    }

    // iOS Events
    _onCommentLoaded(comment) {
        console.log('_onCommentLoaded -> ', comment);
        if(!this.props.onCommentLoaded) {
            return;
        }
        this.props.onCommentLoaded(comment)
    }

    _onLoadCommentError(error) {
        console.log('_onLoadCommentError -> ', error);
        if(!this.props.onLoadCommentError) {
            return;
        }
        this.props.onLoadCommentError(error)
    }
    
    _onCommentDeleted(comment) {
        console.log('_onCommentDeleted -> ', comment);
        if(!this.props.onCommentDeleted) {
            return;
        }
        this.props.onCommentDeleted(comment)
    }
    
    _onDeleteComment(comment, error) {
        console.log('_onDeleteComment -> ', comment, error);
        if(!this.props.onDeleteComment) {
            return;
        }
        this.props.onDeleteComment(comment, error)
    }
    
    _onCommentUpdated(comment) {
        console.log('_onCommentUpdated -> ', comment);
        if(!this.props.onCommentUpdated) {
            return;
        }
        this.props.onCommentUpdated(comment)
    }
    
    _onUpdateComment(comment, error) {
        console.log('_onUpdateComment -> ', comment, error);
        if(!this.props.onUpdateComment) {
            return;
        }
        this.props.onUpdateComment(comment, error);
    }
}

