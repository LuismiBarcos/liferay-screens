'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

import NativeUserPortraitScreenlet from './Bridges/UserPortraitScreenlet'

export default class UserPortraitScreenlet extends Component {
    render() {
        return (
            <NativeUserPortraitScreenlet 
                {... this.props}
            />
        );
    }

    // Common events
    _onUserPortraitLoaded(image) {
        if(!this.props.onUserPortraitLoaded) {
            return;
        }
        this.props.onUserPortraitLoaded(image)
    }

    // iOS events
    _onUserPortraitError(error) {
        if(!this.props.onUserPortraitError){
            return;
        }
        this.props.onUserPortraitError(error)
    }

    _onUserPortraitUploaded(attributes) {
        if(!this.props.onUserPortraitUploaded){
            return;
        }
        this.props.onUserPortraitUploaded(attributes)
    }

    _onUserPortraitUploadError(error) {
        if(!this.props.onUserPortraitUploadError){
            return;
        }
        this.props.onUserPortraitUploadError(error)
    }


    // Android events
    // _onUserPortraitLoadReceived(event) {
    //     if(!this.props.onUserPortraitLoadReceived) {
    //         return;
    //     }
    //     this.props.onUserPortraitLoadReceived(event.imageLoaded);
    // }

    _onUserPortraitUploaded(event) {
        if(!this.props.onUserPortraitUploaded) {
            return;
        }
        this.props.onUserPortraitUploaded(event.userPortraitLoadReceived);
    }

    _onUserPortraitError(event) {
        if(!this.props.onUserPortraitError) {
            return;
        }
        this.props.onUserPortraitError(event.error);
    }
}