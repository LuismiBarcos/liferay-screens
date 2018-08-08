'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

import NativeCommentListScreenlet from './Bridges/CommentListScreenlet';

export default class CommentListScreenlet extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <NativeCommentListScreenlet 
                {...this.props}
            />
        );
    }
}