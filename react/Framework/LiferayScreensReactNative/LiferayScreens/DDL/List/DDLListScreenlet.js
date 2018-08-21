'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

import NativeDDLListScreenlet from './Bridges/DDLListScreenlet'

export default class DDLListScreenlet extends Component {
    render(){
        return(
            <NativeDDLListScreenlet 
                {...this.props}
                // iOS Events
                onDDLListResponseRecords={this._onDDLListResponseRecords.bind(this)}
                onDDLListError={this._onDDLListError.bind(this)}
                onDDLSelectedRecord={this._onDDLSelectedRecord.bind(this)}
            />
        );
    }

    // iOS Events
    _onDDLListResponseRecords(records) {
        console.log('_onDDLListResponseRecords -> ', records)
        if(!this.props.onDDLListResponseRecords) {
            return;
        }
        this.props.onDDLListResponseRecords(records);
    }

    _onDDLListError(error) {
        console.log('_onDDLListError -> ', error)
        if(!this.props.onDDLListError) {
            return;
        }
        this.props.onDDLListError(error);
    }

    _onDDLSelectedRecord(record) {
        console.log('_onDDLSelectedRecord -> ', record)
        if(!this.props.onDDLSelectedRecord) {
            return;
        }
        this.props.onDDLSelectedRecord(record);
    }
}