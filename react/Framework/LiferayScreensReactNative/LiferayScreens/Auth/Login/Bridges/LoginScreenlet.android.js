'use strict';
import React, {Component} from 'react';
import { NativeModules, requireNativeComponent, View } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const NativeLoginScreenlet = requireNativeComponent('LoginScreenlet');

export default class LoginScreenlet extends Component {
    constructor(props){
        super(props);

        this._onLoginSuccess = this._onLoginSuccess.bind(this);
        this._onLoginError = this._onLoginError.bind(this);
        this._onAuthenticationBrowserShown = this._onAuthenticationBrowserShown.bind(this);
    }
    
    componentWillMount() {
        // Events
        DeviceEventEmitter.addListener('onLoginSuccess', this._onLoginSuccess);
        DeviceEventEmitter.addListener('onLoginError', this._onLoginError);
        DeviceEventEmitter.addListener('onAuthenticationBrowserShown', this._onAuthenticationBrowserShown);
    }
    
    render() {
        return(
            <NativeLoginScreenlet 
                {...this.props}
            />
        );
    }

    _onLoginSuccess(event) {
        console.log("login success!");
        if(!this.props.onLoginSuccess) {
            return;
        }
        this.props.onLoginSuccess(JSON.parse(event.user));
    }

    _onLoginError(event) {
        console.log("login fail!");
        if(!this.props.onLoginError) {
            return;
        }
        this.props.onLoginError(event.error);
    }

    _onAuthenticationBrowserShown() {
        console.log("authentication browser show");
        if(!this.props.onAuthenticationBrowserShown) {
            return;
        }
        this.props.onAuthenticationBrowserShown();
    }
}