'use strict'
import React, {Component} from 'react';
import { NativeModules, requireNativeComponent, View } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const NativeSignUpScreenlet = requireNativeComponent('SignUpScreenlet');

export default class SignUpScreenlet extends Component {
    constructor(props){
        super(props);

        this._onSignUpSuccess = this._onSignUpSuccess.bind(this);
        this._onSignUpFailure = this._onSignUpFailure.bind(this);
    }
    componentWillMount() {
        // Events
        DeviceEventEmitter.addListener('onSignUpSuccess', this._onSignUpSuccess);
        DeviceEventEmitter.addListener('onSignUpFailure', this._onSignUpFailure);
    }
    render(){
        return(
            <NativeSignUpScreenlet 
                {...this.props}
            />
        );
    }

    // Events
    _onSignUpSuccess(event) {
        console.log('Sign up!');
        debugger;
        if(!this.props.onSignUpSuccess) {
            return;
        }
        this.props.onSignUpSuccess(JSON.parse(event.user));
    }

    _onSignUpFailure(event) {
        console.log('Sign up error!');
        debugger;
        if(!this.props.onSignUpFailure) {
            return;
        }
        this.props.onSignUpFailure(event.error);
    }
}