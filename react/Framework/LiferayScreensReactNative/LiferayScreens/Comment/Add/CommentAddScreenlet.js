'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

import NativeCommentAddScreenlet from './Bridges/CommentAddScreenlet';

export default class CommentAddScreenlet extends Component {
    render(){
        return(
            <NativeCommentAddScreenlet 
                {...this.props}
                // iOS events
                onCommentAdded={this._onCommentAdded.bind(this)}
                onAddCommentError={this._onAddCommentError.bind(this)}
                onCommentUpdated={this._onCommentUpdated.bind(this)}
                onUpdateCommentError={this._onUpdateCommentError.bind(this)}
            />
        );
    }

    // iOS events
    _onCommentAdded(comment) {
        console.log('_onCommentAdded -> ', comment);
        if(!this.props.onCommentAdded) {
            return;
        }
        this.props.onCommentAdded(comment)
    }

    _onAddCommentError(error) {
        console.log('_onAddCommentError -> ', error);
        if(!this.props.onAddCommentError) {
            return;
        }
        this.props.onAddCommentError(error)
    }

    _onCommentUpdated(comment) {
        console.log('_onCommentUpdated -> ', comment);
        if(!this.props.onCommentUpdated) {
            return;
        }
        this.props.onCommentUpdated(comment)
    }

    _onUpdateCommentError(error) {
        console.log('_onUpdateCommentError -> ', error);
        if(!this.props.onUpdateCommentError) {
            return;
        }
        this.props.onUpdateCommentError(error)
    }
}