'use sctrict'
import React, {Component} from 'react';
import { NativeModules, requireNativeComponent, View } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const NativeCommentListScreenlet = requireNativeComponent('CommentListScreenlet');

export default class CommentListScreenlet extends Component {
    constructor(props) {
        super(props);

    }
    
    componentWillMount() {
        // Events
        
    }

    render() {
        return(
            <NativeCommentListScreenlet
                {...this.props}
            />
        );
    }
}