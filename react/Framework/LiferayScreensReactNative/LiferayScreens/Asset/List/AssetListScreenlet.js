'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

import NativeAssetListScreenlet from './Bridges/AssetListScreenlet'

export default class AssetListScreenlet extends Component {
    render() {
        return(
            <NativeAssetListScreenlet 
                {...this.props}
                // iOS events
                onAssetListResponse={this._onAssetListResponse.bind(this)}
                onAssetListError={this._onAssetListError.bind(this)}
                onAssetSelected={this._onAssetSelected.bind(this)}
            />
        );
    }

    // iOS events
    _onAssetListResponse(assets) {
        console.log('_onAssetListResponse -> ', assets);
        if(!this.props.onAssetListResponse) {
            return;
        }
        this.props.onAssetListResponse(assets);
    }

    _onAssetListError(error) {
        console.log('_onAssetListError -> ', error);
        if(!this.props.onAssetListError) {
            return;
        }
        this.props.onAssetListError(error);
    }

    _onAssetSelected(asset) {
        console.log('_onAssetSelected -> ', asset);
        if(!this.props.onAssetSelected) {
            return;
        }
        this.props.onAssetSelected(asset);
    }
}