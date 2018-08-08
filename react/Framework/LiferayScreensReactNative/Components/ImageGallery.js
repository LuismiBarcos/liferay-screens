'use-strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
    requireNativeComponent,
} from 'react-native'
import ImageGalleryScreenlet from './../LiferayScreens/ImageGallery/ImageGalleryScreenlet';

export default class ImageGallery extends Component {
    render() {
        return(
            <ImageGalleryScreenlet 
                style={styles.gallery}
                ref={(ref) => this.imageGalleryScreenlet = ref}
                onContentsReceived={this._onContentsReceived}
                onGalleryError={this._onGalleryError}
                onItemSelected={this._onItemSelected.bind(this)}
                onListPageFailed={this._onListPageFailed.bind(this)}
                // folderId={72155}
                // repositoryId={20143}
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

  _onListPageFailed(error) {
      console.log('_onListPageFailed -->',error)
  }
}

const styles = StyleSheet.create({
    gallery: {
      height: 400,
      width: 400
    }
});