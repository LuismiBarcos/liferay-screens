'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

import NativeBlogsEntryDisplayScreenlet from './Bridges/BlogsEntryDisplayScreenlet';

export default class BlogsEntryDisplayScreenlet extends Component {
    render(){
        return(
            <NativeBlogsEntryDisplayScreenlet 
                {...this.props}
                //iOS events
                onBlogEntryResponse={this._onBlogEntryResponse.bind(this)}
                onBlogEntryError={this._onBlogEntryError.bind(this)}
            />
        );
    }

    // iOS events
    _onBlogEntryResponse(blogEntry) {
        console.log('_onBlogEntryResponse -> ', blogEntry);
        if(!this.props.onBlogEntryResponse) {
            return;
        }
        this.props.onBlogEntryResponse(blogEntry);
    }

    _onBlogEntryError(error) {
        console.log('_onBlogEntryError -> ', error);
        if(!this.props.onBlogEntryError) {
            return;
        }
        this.props.onBlogEntryError(error);
    }
}