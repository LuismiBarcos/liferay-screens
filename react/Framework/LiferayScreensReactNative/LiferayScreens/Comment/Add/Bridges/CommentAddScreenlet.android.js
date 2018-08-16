'use sctrict'
import React, {Component} from 'react';
import { NativeModules, requireNativeComponent, View } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const NativeCommentAddScreenlet = requireNativeComponent('CommentAddScreenlet');

export default class CommentAddScreenlet extends Component {
    constructor(props) {
        super(props);

        this._onAddCommentSuccess = this._onAddCommentSuccess.bind(this);
        this._onError = this._onError.bind(this);
    }

    componentWillMount(){
        // Events
        DeviceEventEmitter.addListener('onAddCommentSuccess', this._onAddCommentSuccess);
        DeviceEventEmitter.addListener('onError', this._onError);
    }
    
    render(){
        return(
            <NativeCommentAddScreenlet 
                {...this.props}
            />
        );
    }

    // Events
    _onAddCommentSuccess(event) {
        if(!this.props.onAddCommentSuccess) {
            return;
        }
        this.props.onAddCommentSuccess(JSON.parse(event.comment));
    }

    _onError(event) {
        if(!this.props.onError) {
            return;
        }
        this.props.onError(event.error);
    }
}