'use-strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    requireNativeComponent,
} from 'react-native'

import NativeRatingScreenlet from './Bridges/RatingScreenlet'

export default class RatingScreenlet extends Component {
    render(){
        return(
            <NativeRatingScreenlet 
                {...this.props}
                onRatingOperationSuccess={this._onRatingOperationSuccess.bind(this)}
                onError={this._onError.bind(this)}
            />
        );
    }

    // Android events
    _onRatingOperationSuccess(user) {
        console.log('rating success! -> ', user);
        if(!this.props.onRatingOperationSuccess) {
            return;
        }
        this.props.onRatingOperationSuccess(user);
    }

    _onError(error) {
        console.log('rating error! -> ', error);
        if(!this.props.onError) {
            return;
        }
        this.props.onError(error);
    }
}