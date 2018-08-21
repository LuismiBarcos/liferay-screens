'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

import NativeWebScreenlet from './Bridges/WebScreenlet'

export default class WebScreenlet extends Component {
    render() {
        return(
            <NativeWebScreenlet 
                {...this.props}
                // iOS Events
                onPageLoaded={this._onPageLoaded.bind(this)}
                onWebError={this._onWebError.bind(this)}
                onNotify={this._onNotify.bind(this)}
            />
        );
    }

    // iOS events
    _onPageLoaded(url) {
        console.log('_onPageLoaded -> ', url)
        if(!this.props.onPageLoaded){
            return;
        }
        this.props.onPageLoaded(url)
    }

    _onWebError(error) {
        console.log('_onWebError -> ', error)
        if(!this.props.onWebError){
            return;
        }
        this.props.onWebError(error)
    }

    _onNotify(namespace, message) {
        console.log('_onNotify -> ', namespace, message)
        if(!this.props.onNotify){
            return;
        }
        this.props.onNotify(namespace, message);
    }
}