'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

import NativeImageGalleryScreenlet from './Bridges/ImageGalleryScreenlet'

export default class ImageGalleryScreenlet extends Component {
    render() {
        return (
            <NativeImageGalleryScreenlet 
                {...this.props}
                onListPageFailed = {this._onListPageFailed.bind(this)}
            />
        );
    }

    // iOS Events
    _onContentsReceived(event) {
        if(!this.props.onContentsReceived) {
            return;
        }
        this.props.onContentsReceived(event.nativeEvent.image)
    }


    _onGalleryError(event) {
        if(!this.props.onGalleryError){
            return;
        }
        this.props.onGalleryError(event.nativeEvent.error)
    }

    _onItemSelected(event){
        if(!this.props.onItemSelected){
            return;
        }
        this.props.onItemSelected(event.nativeEvent.image)
    }

    // Android events
    _onListPageFailed(error) {
        console.log('Error loading the content -> ', error);
        if(!this.props.onListPageFailed) {
            return;
        }
        this.props.onListPageFailed(error);
    }

    _onListPageReceived(event) {
        console.log('Content received');
        debugger;
        if(!this.props.onListPageReceived) {
            return;
        }
        this.props.onListPageReceived(event.imageLoaded);
    }

    _onItemSelected(event) {
        console.log('Item selected');
        debugger;
        if(!this.props.onItemSelected) {
            return;
        }
        this.props.onItemSelected(event.imageLoaded);
    }

    _onUserPortraitError(event) {
        console.log('Error!!!!!');
        debugger;
        if(!this.props.onUserPortraitError) {
            return;
        }
        this.props.onUserPortraitError(event.imageLoaded);
    }
}
