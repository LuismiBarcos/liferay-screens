'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

const NativeBlogsEntryDisplayScreenlet = requireNativeComponent('BlogsEntryDisplayScreenlet');

export default class BlogsEntryDisplayScreenlet extends Component {
    render(){
        return(
            <NativeBlogsEntryDisplayScreenlet 
                {...this.props}
                onBlogEntryResponse={this._onBlogEntryResponse.bind(this)}
                onBlogEntryError={this._onBlogEntryError.bind(this)}
            />
        );
    }

    // Events
    _onBlogEntryResponse(event) {
        if(!this.props.onBlogEntryResponse) {
            return;
        }
        this.props.onBlogEntryResponse(event.nativeEvent.blogEntry);
    }

    _onBlogEntryError(event) {
        if(!this.props.onBlogEntryError) {
            return;
        }
        this.props.onBlogEntryError(event.nativeEvent.error);
    }
}