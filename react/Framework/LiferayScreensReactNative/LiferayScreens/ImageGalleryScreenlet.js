'use-strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

export default class ImageGalleryScreenlet extends Component {
    render() {
        return (
            <NativeImageGalleryScreenlet 
                {... this.props}
                style={this.props.style}
                onContentsReceived={this._onContentsReceived.bind(this)}
                onGalleryError={this._onGalleryError.bind(this)}
                onItemSelected={this._onItemSelected.bind(this)}
            />
        );
    }

    // Events
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
}

const NativeImageGalleryScreenlet = requireNativeComponent('ImageGalleryScreenlet');
