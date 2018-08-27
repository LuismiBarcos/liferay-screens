'use strict'
import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import VideoDisplayScreelet from "./../LiferayScreens/FileDisplay/VideoDisplayScreenlet";

export default class ImageDisplay extends Component {
  render(){
    return(
      <VideoDisplayScreelet 
        {...this.props}
        style={styles.video}
        className={"com.liferay.document.library.kernel.model.DLFileEntry"}
        classPK={38943}
      />
    );
  }
}

const styles = StyleSheet.create({
  video: {
    height: 350,
    width: 500
  }
});