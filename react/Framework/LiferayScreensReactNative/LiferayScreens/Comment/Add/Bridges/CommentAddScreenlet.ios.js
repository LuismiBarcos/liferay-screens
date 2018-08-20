'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

const NativeCommentAddScreenlet = requireNativeComponent('CommentAddScreenlet');

export default class CommentAddScreenlet extends Component {
    render(){
        return(
            <NativeCommentAddScreenlet 
                {...this.props}
                onCommentAdded={this._onCommentAdded.bind(this)}
                onAddCommentError={this._onAddCommentError.bind(this)}
                onCommentUpdated={this._onCommentUpdated.bind(this)}
                onUpdateCommentError={this._onUpdateCommentError.bind(this)}
            />
        );
    }

    // Events
    _onCommentAdded(event) {
        if(!this.props.onCommentAdded) {
            return;
        }
        this.props.onCommentAdded(event.nativeEvent.comment)
    }

    _onAddCommentError(event) {
        if(!this.props.onAddCommentError) {
            return;
        }
        this.props.onAddCommentError(event.nativeEvent.error)
    }

    _onCommentUpdated(event) {
        if(!this.props.onCommentUpdated) {
            return;
        }
        this.props.onCommentUpdated(event.nativeEvent.comment)
    }

    _onUpdateCommentError(event) {
        if(!this.props.onUpdateCommentError) {
            return;
        }
        this.props.onUpdateCommentError(event.nativeEvent.error)
    }
}