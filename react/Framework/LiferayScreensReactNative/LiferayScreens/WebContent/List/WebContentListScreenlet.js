'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

import NativeWebContentListScreenlet from './Bridges/WebContentListScreenlet';

export default class WebContentListScreenlet extends Component {
    render() {
        return(
            <NativeWebContentListScreenlet 
                {...this.props}
                // iOS events
                onWebContentListResponse={this._onWebContentListResponse.bind(this)}
                onWebContentListError={this._onWebContentListError.bind(this)}
                onWebContentSelected={this._onWebContentSelected.bind(this)}
            />
        );
    }

    // iOS events
    _onWebContentListResponse(contents){
        console.log('_onWebContentListResponse -> ', contents);
        if(!this.props.onWebContentListResponse) {
            return;
        }
        this.props.onWebContentListResponse(contents);
    }

    _onWebContentListError(error){
        console.log('_onWebContentListError -> ', error);
        if(!this.props.onWebContentListError) {
            return;
        }
        this.props.onWebContentListError(error);
    }

    _onWebContentSelected(content){
        console.log('_onWebContentSelected -> ', content);
        if(!this.props.onWebContentSelected) {
            return;
        }
        this.props.onWebContentSelected(content);
    }
}