'use strict'
import React, {Component} from 'react';
import { NativeModules, requireNativeComponent, View } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const NativeWebContentDisplayScreenlet = requireNativeComponent('WebContentDisplayScreenlet');

export default class WebContentDisplayScreenlet extends Component {
    constructor(props) {
        super(props);

        this._onWebContentReceived = this._onWebContentReceived.bind(this);
        this._onUrlClicked = this._onUrlClicked.bind(this);
        this._onWebContentTouched = this._onWebContentTouched.bind(this);
        this._onError = this._onError.bind(this);
    }

    componentWillMount(){
        //Events
        DeviceEventEmitter.addListener('onWebContentReceived', this._onWebContentReceived);
        DeviceEventEmitter.addListener('onUrlClicked', this._onUrlClicked);
        DeviceEventEmitter.addListener('onWebContentTouched', this._onWebContentTouched);
        DeviceEventEmitter.addListener('onError', this._onError);
    }
    
    render(){
        return(
            <NativeWebContentDisplayScreenlet 
                {...this.props}
            />
        );
    }

    // Events
    _onWebContentReceived(event) {
        if(!this.props.onWebContentReceived) {
            return;
        }
        this.props.onWebContentReceived(event.html);
    }

    _onUrlClicked(event) {
        if(!this.props.onUrlClicked) {
            return;
        }
        this.props.onUrlClicked(event.url);
    }

    _onWebContentTouched(event) {
        if(!this.props.onWebContentTouched) {
            return;
        }
        this.props.onWebContentTouched(event.touched);
    }

    _onError(event) {
        if(!this.props.onError) {
            return;
        }
        this.props.onError(event.error);
    }
}