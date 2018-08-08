'use strict'
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View,
  NativeModules
} from 'react-native';

import CommentListScreenlet from './../LiferayScreens/Comment/List/CommentListScreenlet';

export default class CommentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <CommentListScreenlet 
                style={styles.comments}
            />
        );
    }
}

const styles = StyleSheet.create({
    comments: {
        height: 300,
        width: 300,
    }
});