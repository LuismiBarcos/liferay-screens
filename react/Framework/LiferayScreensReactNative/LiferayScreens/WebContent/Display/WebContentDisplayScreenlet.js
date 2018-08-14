'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

import NativeWebContentDisplayScreenlet from './Bridges/WebContentDisplayScreenlet'

export default class WebContentDisplayScreenlet extends Component {
    render() {
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

    //iOS Events
    _onWebContentResponse(html) {
        console.log('_onWebContentResponse -> ', html);
        if(!this.props.onWebContentResponse){
            return;
        }
        this.props.onWebContentResponse(html)
    }

    _onRecordContentResponse(record) {
        console.log('_onRecordContentResponse -> ', record);
        if(!this.props.onRecordContentResponse){
            return;
        }
        this.props.onRecordContentResponse(record)
    }

    _onWebContentError(error) {
        console.log('_onWebContentError -> ', error);
        if(!this.props.onWebContentError){
            return;
        }
        this.props.onWebContentError(error)
    }

    _onUrlClicked(url) {
        console.log('_onUrlClicked -> ', url);
        if(!this.props.onUrlClicked){
            return;
        }
        this.props.onUrlClicked(url)
    }
}