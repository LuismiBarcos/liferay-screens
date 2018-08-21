'use strict'
import React, {Component} from 'react';
import { NativeModules, requireNativeComponent, View } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const NativeWebScreenlet = requireNativeComponent('WebScreenlet');

export default class WebScreenlet extends Component {
    constructor(props) {
        super(props);

        this._onPageLoaded = this._onPageLoaded.bind(this);
        this._onScriptMessageHandler = this._onScriptMessageHandler.bind(this);
        this._onError = this._onError.bind(this);
    }

    componentWillMount() {
        // Events
        DeviceEventEmitter.addListener('onPageLoaded', this._onPageLoaded);
        DeviceEventEmitter.addListener('onScriptMessageHandler', this._onScriptMessageHandler);
        DeviceEventEmitter.addListener('onError', this._onError);
    }

    render() {
        return(
            <NativeWebScreenlet 
                {...this.props}
            />
        );
    }

    // Events

    _onPageLoaded(event) {
        if(!this.props.onWebContentReceived) {
            return;
        }
        this.props.onWebContentReceived(event.page);
    }

    _onScriptMessageHandler(event) {
        if(!this.props.onScriptMessageHandler) {
            return;
        }
        this.props.onScriptMessageHandler(event.message);
    }

    _onError(event) {
        if(!this.props.onError) {
            return;
        }
        this.props.onError(event.error);
    }
}