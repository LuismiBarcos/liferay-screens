'use strict'
import React, {Component} from 'react';
import { NativeModules, requireNativeComponent, View } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const NativeVideoDisplayScreenlet = requireNativeComponent('VideoDisplayScreenlet');

export default class VideoDisplayScreenlet extends Component {
    constructor(props) {
        super(props);

        this._onVideoPrepared = this._onVideoPrepared.bind(this);
        this._onVideoError = this._onVideoError.bind(this);
        this._onVideoCompleted = this._onVideoCompleted.bind(this);
        this._onRetrieveAssetSuccess = this._onRetrieveAssetSuccess.bind(this);
        this._onError = this._onError.bind(this);
    }

    componentWillMount(){
        // Events
        DeviceEventEmitter.addListener('onVideoPrepared', this._onVideoPrepared);
        DeviceEventEmitter.addListener('onVideoError', this._onVideoError);
        DeviceEventEmitter.addListener('onVideoCompleted', this._onVideoCompleted);
        DeviceEventEmitter.addListener('onRetrieveAssetSuccess', this._onRetrieveAssetSuccess);
        DeviceEventEmitter.addListener('onError', this._onError);
    }
    render() {
        return(
            <NativeVideoDisplayScreenlet 
                {...this.props}
            />
        );
    }

    // Events
    _onVideoPrepared(event) {
        if(!this.props.onVideoPrepared) {
            return;
        }
        this.props.onVideoPrepared();
    }

    _onVideoError(event) {
        if(!this.props.onVideoError) {
            return;
        }
        this.props.onVideoError(event.error);
    }

    _onVideoCompleted(event) {
        if(!this.props.onVideoCompleted) {
            return;
        }
        this.props.onVideoCompleted();
    }

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