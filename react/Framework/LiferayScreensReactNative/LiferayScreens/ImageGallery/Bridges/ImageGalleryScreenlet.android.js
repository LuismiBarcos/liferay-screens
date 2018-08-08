'use strict'
import React, {Component} from 'react';
import { NativeModules, requireNativeComponent, View } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const NativeImageGalleryScreenlet = requireNativeComponent('ImageGalleryScreenlet');

export default class ImageGalleryScreenlet extends Component {
    constructor(props){
        super(props);

        this._onListPageFailed = this._onListPageFailed.bind(this);
        this._onListPageReceived = this._onListPageReceived.bind(this);
        this._onItemSelected = this._onItemSelected.bind(this);
        this._onImageGalleryError = this._onImageGalleryError.bind(this);
    }
    
    componentWillMount() {
        // Events
        DeviceEventEmitter.addListener('onListPageFailed', this._onListPageFailed);
        DeviceEventEmitter.addListener('onListPageReceived', this._onListPageReceived);
        DeviceEventEmitter.addListener('onItemSelected', this._onItemSelected);
        DeviceEventEmitter.addListener('onImageGalleryError', this._onImageGalleryError);
    }
    
    render(){
        return(
            <NativeImageGalleryScreenlet 
                {...this.props}
            />
        );
    }

    _onListPageFailed(event) {
        console.log('onListPageFailed android.js', event.error);
        if(!this.props.onListPageFailed) {
            return;
        }
        this.props.onListPageFailed(event.error);
    }

    _onListPageReceived(event) {
        console.log('Content received');
        debugger;
        if(!this.props.onListPageReceived) {
            return;
        }
        this.props.onListPageReceived(event.imageLoaded);
    }

    _onItemSelected(event) {
        console.log('Item selected');
        debugger;
        if(!this.props.onItemSelected) {
            return;
        }
        this.props.onItemSelected(event.imageLoaded);
    }

    _onImageGalleryError(event) {
        console.log('onImageGalleryError android.js');
        debugger;
        if(!this.props.onImageGalleryError) {
            return;
        }
        this.props.onImageGalleryError(event.imageLoaded);
    }
}