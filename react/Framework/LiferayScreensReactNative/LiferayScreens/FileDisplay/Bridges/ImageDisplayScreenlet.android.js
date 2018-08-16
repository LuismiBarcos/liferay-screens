'use strict'
import React, {Component} from 'react';
import { NativeModules, requireNativeComponent, View } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const NativeImageDisplayScreenlet = requireNativeComponent('ImageDisplayScreenlet');

export default class ImageDisplayScreenlet extends Component {
    constructor(props) {
        super(props)

        this._onRetrieveAssetSuccess = this._onRetrieveAssetSuccess.bind(this);
        this._onError = this._onError.bind(this);
    }

    componentWillMount() {
        // Events
        DeviceEventEmitter.addListener('onRetrieveAssetSuccess', this._onRetrieveAssetSuccess);
        DeviceEventEmitter.addListener('onError', this._onError);
    }
    
    render(){
        return(
            <NativeImageDisplayScreenlet 
                {...this.props}
            />
        );
    }

    // Events
    _onRetrieveAssetSuccess(event) {
        if(!this.props.onRetrieveAssetSuccess) {
            return;
        }
        this.props.onRetrieveAssetSuccess(JSON.parse(event.assetEntry));
    }

    _onError(event) {
        if(!this.props.onError) {
            return;
        }
        this.props.onError(event.error);
    }
}