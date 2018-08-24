'use-strict'
import React, {Component} from 'react';
import { StyleSheet, Dimensions } from 'react-native'

import ImageGalleryScreenlet from './../LiferayScreens/ImageGallery/ImageGalleryScreenlet';

export default class ImageGallery extends Component {
    render() {
        return(
            <ImageGalleryScreenlet 
                style={styles.gallery}
                folderId={72155}
                repositoryId={20143}
            />
        );
    }
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    gallery: {
      height: height - 55,
      width: width
    }
});