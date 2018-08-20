'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

const NativeWebContentListScreenlet = requireNativeComponent('WebContentListScreenlet');

export default class WebContentListScreenlet extends Component {
    render() {
        return(
            <NativeWebContentListScreenlet 
                {...this.props}
                onWebContentListResponse={this._onWebContentListResponse.bind(this)}
                onWebContentListError={this._onWebContentListError.bind(this)}
                onWebContentSelected={this._onWebContentSelected.bind(this)}
            />
        );
    }

    // Events
    _onWebContentListResponse(event){
        if(!this.props.onWebContentListResponse) {
            return;
        }
        this.props.onWebContentListResponse(event.nativeEvent.contents);
    }

    _onWebContentListError(event){
        if(!this.props.onWebContentListError) {
            return;
        }
        this.props.onWebContentListError(event.nativeEvent.error);
    }

    _onWebContentSelected(event){
        if(!this.props.onWebContentSelected) {
            return;
        }
        this.props.onWebContentSelected(event.nativeEvent.content);
    }
}