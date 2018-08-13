'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

const NativeRatingScreenlet = requireNativeComponent('RatingScreenlet');

export default class RatingScreenlet extends Component {
    render(){
        return(
            <NativeRatingScreenlet 
                {...this.props}
                onRatingRetrieve={this._onRatingRetrieve.bind(this)}
                onRatingDeleted={this._onRatingDeleted.bind(this)}
                onRatingUpdated={this._onRatingUpdated.bind(this)}
                onRatingError={this._onRatingError.bind(this)}
            />
        );
    }

    // Events
    _onRatingRetrieve(event) {
        if(!this.props.onRatingRetrieve) {
            return;
        }
        this.props.onRatingRetrieve(event.nativeEvent.rating)
    }

    _onRatingDeleted(event) {
        if(!this.props.onRatingDeleted) {
            return;
        }
        this.props.onRatingDeleted(event.nativeEvent.rating)
    }

    _onRatingUpdated(event) {
        if(!this.props.onRatingUpdated) {
            return;
        }
        this.props.onRatingUpdated(event.nativeEvent.rating)
    }

    _onRatingError(event) {
        if(!this.props.onRatingError) {
            return;
        }
        this.props.onRatingError(event.nativeEvent.error)
    }
}