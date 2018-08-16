'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

const NativeAudioDisplayScreenlet = requireNativeComponent('AudioDisplayScreenlet');

export default class AudioDisplayScreenlet extends Component {
    render(){
        return(
            <NativeAudioDisplayScreenlet 
                {...this.props}
                onFileAssetResponse={this._onFileAssetResponse.bind(this)}
                onFileAssetError={this._onFileAssetError.bind(this)}
            />
        );
    }

    // Events
    _onFileAssetResponse(event) {
        if(!this.props.onFileAssetResponse) {
            return;
        }
        this.props.onFileAssetResponse(event.nativeEvent.url)
    }

    _onFileAssetError(event) {
        if(!this.props.onFileAssetError) {
            return;
        }
        this.props.onFileAssetError(event.nativeEvent.error)
    }
}