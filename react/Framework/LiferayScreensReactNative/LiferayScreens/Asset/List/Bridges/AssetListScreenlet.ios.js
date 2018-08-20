'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

const NativeAssetListScreenlet = requireNativeComponent('AssetListScreenlet');

export default class AssetListScreenlet extends Component {
    render(){
        return(
            <NativeAssetListScreenlet 
                {...this.props}
                onAssetListResponse={this._onAssetListResponse.bind(this)}
                onAssetListError={this._onAssetListError.bind(this)}
                onAssetSelected={this._onAssetSelected.bind(this)}
            />
        );
    }

    // Events
    _onAssetListResponse(event) {
        if(!this.props.onAssetListResponse) {
            return;
        }
        this.props.onAssetListResponse(event.nativeEvent.assets);
    }

    _onAssetListError(event) {
        if(!this.props.onAssetListError) {
            return;
        }
        this.props.onAssetListError(event.nativeEvent.error);
    }

    _onAssetSelected(event) {
        if(!this.props.onAssetSelected) {
            return;
        }
        this.props.onAssetSelected(event.nativeEvent.asset);
    }
}