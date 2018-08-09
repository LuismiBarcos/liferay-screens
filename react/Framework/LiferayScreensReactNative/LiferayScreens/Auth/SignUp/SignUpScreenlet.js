'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

import NativeSignUpScreenlet from './Bridges/SignUpScreenlet';

export default class SignUpScreenlet extends Component {
    render(){
        return(
            <NativeSignUpScreenlet 
                {...this.props}
                onSignUpSuccess={this._onSignUpSuccess.bind(this)}
                onSignUpFailure={this._onSignUpFailure.bind(this)}
            />
        );
    }

    // Android events
    _onSignUpSuccess(user) {
        console.log('Sign up! -> new user', user);
        debugger;
        if(!this.props.onSignUpSuccess) {
            return;
        }
        this.props.onSignUpSuccess(user);
    }

    _onSignUpFailure(error) {
        console.log('Sign up error! -> ', error);
        debugger;
        if(!this.props.onSignUpFailure) {
            return;
        }
        this.props.onSignUpFailure(error);
    }
}