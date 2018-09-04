'use strict'
import React, {Component} from 'react';
import { View ,ScrollView, StyleSheet, Text } from 'react-native';

import UserPortrait from './../LiferayScreens/UserPortrait/UserPortraitScreenlet';
import CommentListScreenlet from './../LiferayScreens/Comment/List/CommentListScreenlet';
import ImageGalleryScreenlet from './../LiferayScreens/ImageGallery/ImageGalleryScreenlet';

export default class TestComponent extends Component {
    render(){
        return(
            <View>
                <UserPortrait 
                    style={styles.comments}
                    userId={20156}
                />
                <ImageGalleryScreenlet 
                        style={styles.gallery}
                        folderId={72155}
                        repositoryId={20143}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    comments: {
        height: 300,
        width: 300,
    },
    gallery: {
        height: 300,
        width: 300
      }
});