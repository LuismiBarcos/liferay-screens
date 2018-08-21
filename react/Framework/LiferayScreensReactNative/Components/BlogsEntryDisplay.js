'use strict'
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View,
  NativeModules
} from 'react-native';

import BlogsEntryDisplayScreenlet from "./../LiferayScreens/Blogs/BlogsEntryDisplayScreenlet";

export default class BlogsEntryDisplay extends Component {
    render(){
        return(
            <BlogsEntryDisplayScreenlet 
                {...this.props}
                style={styles.blogs}
                assetEntryId={40516}
            />
        );
    }
}

const styles = StyleSheet.create({
    blogs: {
      height: 350,
      width: 400
    }
});