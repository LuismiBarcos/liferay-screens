'use strict'
import React, {Component} from 'react';
import { NativeModules, requireNativeComponent, View } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const NativeWebContentListScreenlet = requireNativeComponent('WebContentListScreenlet');

export default class WebContentListScreenlet extends Component {
    constructor(props) {
        super(props);

        this._onListPageFailed = this._onListPageFailed.bind(this);
        this._onListPageReceived = this._onListPageReceived.bind(this);
        this._onListItemSelected = this._onListItemSelected.bind(this);
        this._onError = this._onError.bind(this);
    }

    componentWillMount() {
        // Events
        DeviceEventEmitter.addListener('onListPageFailed', this._onListPageFailed);
        DeviceEventEmitter.addListener('onListPageReceived', this._onListPageReceived);
        DeviceEventEmitter.addListener('onListItemSelected', this._onListItemSelected);
        DeviceEventEmitter.addListener('onError', this._onError);
    }

    render() {
        return(
            <NativeWebContentListScreenlet 
                {...this.props}
            />
        );
    }

    // Events
    _onListPageFailed(event) {
        if(!this.props.onListPageFailed) {
            return;
        }
        this.props.onListPageFailed(event.pageNumber, event.error);
    }

    _onListPageReceived(event) {
        if(!this.props.onListPageReceived) {
            return;
        }
        this.props.onListPageReceived(event.list);
    }

    _onListItemSelected(event) {
        if(!this.props.onListItemSelected) {
            return;
        }
        this.props.onListItemSelected(event.itemSelected);
    }

    _onError(event) {
        if(!this.props.onError) {
            return;
        }
        this.props.onError(event.error);
    }
}