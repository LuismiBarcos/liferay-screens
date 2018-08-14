'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

const NativeWebContentDisplayScreenlet = requireNativeComponent('WebContentDisplayScreenlet');

export default class WebContentDisplayScreenlet extends Component {
    render(){
        return(
            <NativeWebContentDisplayScreenlet 
                {...this.props}
                onWebContentResponse={this._onWebContentResponse.bind(this)}
                onRecordContentResponse={this._onRecordContentResponse.bind(this)}
                onWebContentError={this._onWebContentError.bind(this)}
                onUrlClicked={this._onUrlClicked.bind(this)}
            />
        );
    }

    // Events
    _onWebContentResponse(event) {
        if(!this.props.onWebContentResponse){
            return;
        }
        this.props.onWebContentResponse(event.nativeEvent.html)
    }

    _onRecordContentResponse(event) {
        if(!this.props.onRecordContentResponse){
            return;
        }
        this.props.onRecordContentResponse(event.nativeEvent.record)
    }

    _onWebContentError(event) {
        if(!this.props.onWebContentError){
            return;
        }
        this.props.onWebContentError(event.nativeEvent.error)
    }

    _onUrlClicked(event) {
        if(!this.props.onUrlClicked){
            return;
        }
        this.props.onUrlClicked(event.nativeEvent.url)
    }
}