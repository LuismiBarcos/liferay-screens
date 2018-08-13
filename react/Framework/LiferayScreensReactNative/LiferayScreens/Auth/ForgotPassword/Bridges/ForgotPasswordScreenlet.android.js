'use strict'
import React, {Component} from 'react';
import { NativeModules, requireNativeComponent, View } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const NativeForgotPasswordScreenlet = requireNativeComponent('ForgotPasswordScreenlet');

export default class ForgotPasswordScreenlet extends Component {
    constructor(props){
        super(props);

        this._onForgotPasswordRequestSuccess = this._onForgotPasswordRequestSuccess.bind(this);
        this._onForgotPasswordRequestFailure = this._onForgotPasswordRequestFailure.bind(this);
    }
    componentWillMount(){
        //Events
        DeviceEventEmitter.addListener('onForgotPasswordRequestSuccess', this._onForgotPasswordRequestSuccess);
        DeviceEventEmitter.addListener('onForgotPasswordRequestFailure', this._onForgotPasswordRequestFailure);
    }
    
    render(){
        return(
            <NativeForgotPasswordScreenlet 
                {...this.props}
            />
        );
    }

    // Events

    _onForgotPasswordRequestSuccess(event) {
        if(!this.props.onForgotPasswordRequestSuccess) {
            return;
        }
        this.props.onForgotPasswordRequestSuccess(event.passwordSent);
    }

    _onForgotPasswordRequestFailure(event) {
        if(!this.props.onForgotPasswordRequestFailure) {
            return;
        }
        this.props.onForgotPasswordRequestFailure(event.error);
    }
}