'use-strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'
import ImageGalleryScreenlet from './../LiferayScreens/ImageGalleryScreenlet';

export default class ImageGallery extends Component {
    render() {
        return(
            <ImageGalleryScreenlet 
                style={styles.gallery}
                onContentsReceived={this._onContentsReceived}
                onGalleryError={this._onGalleryError}
                onItemSelected={this._onItemSelected}
                folderId={72155}
                repositoryId={20143}
            />
        );
    }

    // ImageGallery events
  _onContentsReceived() {
    console.log('Content received');
  }

  _onGalleryError(error) {
    console.log('Error -> ',error);
  }

  _onItemSelected(attributes){
    console.log('Item selected -> ', attributes);
  }
}

const styles = StyleSheet.create({
    gallery: {
      height: 400,
      width: 400
    }
});