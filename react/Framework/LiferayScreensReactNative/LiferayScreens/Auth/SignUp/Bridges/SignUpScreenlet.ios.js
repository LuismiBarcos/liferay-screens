'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

const NativeUserPortraitScreenlet = requireNativeComponent('SignUpScreenlet');

export default class SignUpScreenlet extends Component {
    render(){
        return(
            <NativeUserPortraitScreenlet 
                {...this.props}
                onSignUpResponseUserAttributes={this._onSignUpResponseUserAttributes.bind(this)}
                onSignUpError={this._onSignUpError.bind(this)}
            />
        );
    }

    // Events 
    _onSignUpResponseUserAttributes(event) {
        console.log("SignUp done!");
        debugger;
        if(!this.props.onSignUpSuccess) {
            return;
        }
        this.props.onSignUpSuccess(event.nativeEvent.user)
    }

    _onSignUpError(event) {
        console.log("SignUp fail!");
        debugger;
        if(!this.props.onSignUpFailure) {
            return;
        }
        this.props.onSignUpFailure(event.nativeEvent.error);
    }
}