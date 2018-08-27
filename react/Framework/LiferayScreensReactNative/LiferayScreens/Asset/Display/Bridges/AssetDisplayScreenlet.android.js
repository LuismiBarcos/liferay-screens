'use strict'
import React, {Component} from 'react';
import { requireNativeComponent } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const NativeAssetDisplayScreenlet = requireNativeComponent('AssetDisplayScreenlet');

export default class AssetDisplayScreenlet extends Component {
    constructor(props){
        super(props)
        this.state = {
            autoLoad: props.autoLoad || true,
            entryId: props.entryId || 0,
            className: props.className || "",
            classPK: props.classPK || 0,
            portletItemName: props.portletItemName || "",
        }
        this._onRetrieveAssetSuccess = this._onRetrieveAssetSuccess.bind(this);
        this._onError = this._onError.bind(this);
    }

    componentWillMount(){
        // Events
        DeviceEventEmitter.addListener('onRetrieveAssetSuccess', this._onRetrieveAssetSuccess);
        DeviceEventEmitter.addListener('onError', this._onError);
    }

    render(){
        return(
            <NativeAssetDisplayScreenlet 
                {...this.props}
                screenletAttributes={this.state}
            />
        );
    }

    // Events
    _onRetrieveAssetSuccess(event) {
        if(!this.props.onRetrieveAssetSuccess) {
            return;
        }
        this.props.onRetrieveAssetSuccess(JSON.parse(event.assetEntry));
    }

    _onError(event) {
        if(!this.props.onError) {
            return;
        }
        this.props.onError(event.error);
    }
}