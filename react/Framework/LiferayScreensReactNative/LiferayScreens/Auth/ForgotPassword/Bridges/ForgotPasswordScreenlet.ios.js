'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'
 const NativeForgotPasswordScreenlet = requireNativeComponent('ForgotPasswordScreenlet');

 export default class ForgotPasswordScreenlet extends Component {    
    render(){
         return(
             <NativeForgotPasswordScreenlet 
                 {...this.props}
                 onForgotPasswordSent={this._onForgotPasswordSent.bind(this)}
                 onForgotPasswordError={this._onForgotPasswordError.bind(this)}
             />
         );
     }

     // Events
     _onForgotPasswordSent(event) {
        if(!this.props.onForgotPasswordSent){
            return;
        }
        this.props.onForgotPasswordSent(event.nativeEvent.passwordSent)
     }

     _onForgotPasswordError(event) {
        if(!this.props.onForgotPasswordError){
            return;
        }
        this.props.onForgotPasswordError(event.nativeEvent.error)
     }
 }