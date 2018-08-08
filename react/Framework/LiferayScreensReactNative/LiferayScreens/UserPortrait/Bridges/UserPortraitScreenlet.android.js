'use strict'
import React, {Component} from 'react';
import { NativeModules, requireNativeComponent, View } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const NativeUserPortraitScreenlet = requireNativeComponent('UserPortraitScreenlet');

export default class UserPortraitScreenlet extends Component {
    constructor(props){
        super(props);

        this._onUserPortraitLoadReceived = this._onUserPortraitLoadReceived.bind(this);
        this._onUserPortraitUploaded = this._onUserPortraitUploaded.bind(this);
        this._onUserPortraitError = this._onUserPortraitError.bind(this);
    }
    
    componentWillMount() {
        // Events
        DeviceEventEmitter.addListener('onUserPortraitLoadReceived', this._onUserPortraitLoadReceived);
        DeviceEventEmitter.addListener('onUserPortraitUploaded', this._onUserPortraitUploaded);
        DeviceEventEmitter.addListener('onUserPortraitError', this._onUserPortraitError);
    }
    
    render(){
        return(
            <NativeUserPortraitScreenlet 
                {...this.props}
            />
        );
    }

    _onUserPortraitLoadReceived(event) {
        console.log('Image loaded!');
        if(!this.props.onUserPortraitLoadReceived) {
            return;
        }
        this.props.onUserPortraitLoadReceived(event.imageLoaded);
    }

    _onUserPortraitUploaded(event) {
        console.log('Image uploaded!');
        if(!this.props.onUserPortraitUploaded) {
            return;
        }
        this.props.onUserPortraitUploaded(event.onUserPortraitUploaded);
    }

    _onUserPortraitError(event) {
        console.log('Error!!');
        if(!this.props.onUserPortraitError) {
            return;
        }
        this.props.onUserPortraitError(event.error);
    }
}
