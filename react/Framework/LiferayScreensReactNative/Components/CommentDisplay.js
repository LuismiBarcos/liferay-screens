'use strict'
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View,
  NativeModules
} from 'react-native';

import CommentDisplayScreenlet from './../LiferayScreens/Comment/Display/CommentDisplayScreenlet';

export default class CommentDisplay extends Component {
    render() {
        return(
            <CommentDisplayScreenlet 
                style={styles.comment}
                commentId={63710}
            />
        );
    }
}

const styles = StyleSheet.create({
    comment: {
        height: 300,
        width: 300,
    }
});