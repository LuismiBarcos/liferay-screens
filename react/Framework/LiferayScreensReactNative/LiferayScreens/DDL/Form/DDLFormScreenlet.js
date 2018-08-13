'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

import NativeDDLFormScreenlet from './Bridges/DDLFormScreenlet';

export default class DDLFormScreenlet extends Component {
    render(){
        return(
            <NativeDDLFormScreenlet 
                {...this.props}
                onFormLoaded={this._onFormLoaded.bind(this)} 
                onFormLoadError={this._onFormLoadError.bind(this)}
                onRecordLoaded={this._onRecordLoaded.bind(this)} 
                onRecordLoadError={this._onRecordLoadError.bind(this)}
                onFormSubmitted={this._onFormSubmitted.bind(this)} 
                onFormSubmitError={this._onFormSubmitError.bind(this)} 
                onDocumentFieldUploadStarted={this._onDocumentFieldUploadStarted.bind(this)} 
                onUploadProgress={this._onUploadProgress.bind(this)} 
                onUploadFinished={this._onUploadFinished.bind(this)} 
                onUploadError={this._onUploadError.bind(this)}
            />
        );
    }

    // iOS Events
    _onFormLoaded(record) {
        console.log('_onFormLoaded -> ', record);
        if(!this.props.onFormLoaded){
            return;
        }
        this.props.onFormLoaded(record)
    }

    _onFormLoadError(error) {
        console.log('_onFormLoadError -> ', error)
        if(!this.props._onFormLoadError){
            return;
        }
        this.props._onFormLoadError(error)
    }

    _onRecordLoaded(record) {
        console.log('_onRecordLoaded -> ', record)
        if(!this.props.onRecordLoaded){
            return;
        }
        this.props.onRecordLoaded(record)
    }

    _onRecordLoadError(error) {
        console.log('_onRecordLoadError -> ', error)
        if(!this.props.onRecordLoadError){
            return;
        }
        this.props.onRecordLoadError(error)
    }

    _onFormSubmitted(record) {
        console.log('_onFormSubmitted -> ', record)
        if(!this.props.onFormSubmitted){
            return;
        }
        this.props.onFormSubmitted(record)
    }

    _onFormSubmitError(error) {
        console.log('_onFormSubmitError -> ', error)
        if(!this.props.onFormSubmitError){
            return;
        }
        this.props.onFormSubmitError(error)
    }

    _onDocumentFieldUploadStarted(field) {
        console.log('_onDocumentFieldUploadStarted -> ', field)
        if(!this.props.onDocumentFieldUploadStarted){
            return;
        }
        this.props.onDocumentFieldUploadStarted(field)
    }

    _onUploadProgress(field, bytes, totalBytes) {
        console.log('_onUploadProgress -> ', field, bytes, totalBytes);
        if(!this.props.onUploadProgress){
            return;
        }
        this.props.onUploadProgress(field, bytes, totalBytes)
    }

    _onUploadFinished(field, result) {
        console.log('_onUploadFinished -> ', field, result);
        if(!this.props.onUploadFinished){
            return;
        }
        this.props.onUploadFinished(field, result)
    }

    _onUploadError(error) {
        console.log('_onUploadError -> ', error)
        if(!this.props.onUploadError){
            return;
        }
        this.props.onUploadError(error);
    }
}