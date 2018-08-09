'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

const NativeCommentListScreenlet = requireNativeComponent('CommentListScreenlet');

export default class CommentListScreenlet extends Component {
    render() {
        return(
            <NativeCommentListScreenlet 
                {...this.props}
                onListResponseComments={this._onListResponseComments.bind(this)}
                onCommentListError={this._onCommentListError.bind(this)}
                onSelectedComment={this._onSelectedComment.bind(this)}
                onDeletedComment={this._onDeletedComment.bind(this)}
                onCommentDelete={this._onCommentDelete.bind(this)}
                onUpdatedComment={this._onUpdatedComment.bind(this)}
                onCommentUpdate={this._onCommentUpdate.bind(this)}
            />
        );
    }

    //Events
    _onListResponseComments(event){
        debugger;
        if(!this.props.onListResponseComments) {
            return;
        }
        this.props.onContentsReceived(event.nativeEvent.comment)
    }

    _onCommentListError(event){
        debugger;
        if(!this.props.onCommentListError) {
            return;
        }
        this.props.onCommentListError(event.nativeEvent.error)
    }

    _onSelectedComment(event){
        debugger;
        if(!this.props.onSelectedComment) {
            return;
        }
        this.props.onSelectedComment(event.nativeEvent.comment)
    }

    _onDeletedComment(event){
        debugger;
        if(!this.props.onDeletedComment) {
            return;
        }
        this.props.onDeletedComment(event.nativeEvent.comment)
    }

    _onCommentDelete(event){
        debugger;
        if(!this.props.onCommentDelete) {
            return;
        }
        this.props.onCommentDelete(event.nativeEvent.comment, event.nativeEvent.error)
    }

    _onUpdatedComment(event){
        debugger;
        if(!this.props.onUpdatedComment) {
            return;
        }
        this.props.onUpdatedComment(event.nativeEvent.comment)
    }

    _onCommentUpdate(event){
        debugger;
        if(!this.props.onCommentUpdate) {
            return;
        }
        this.props.onCommentUpdate(event.nativeEvent.comment, event.nativeEvent.error)
    }
}