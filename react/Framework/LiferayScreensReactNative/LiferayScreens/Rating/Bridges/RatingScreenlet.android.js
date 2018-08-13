'use srict'
import React, {Component} from 'react';
import { NativeModules, requireNativeComponent, View } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const NativeRatingScreenlet = requireNativeComponent('RatingScreenlet');

export default class RatingScreenlet extends Component {
    constructor(props){
        super(props);

        this.state = {
            "loaded":false
        };

        this._onRatingOperationSuccess = this._onRatingOperationSuccess.bind(this);
        this._onError = this._onError.bind(this);
    }
    
    componentWillMount(){
        //Events
        DeviceEventEmitter.addListener('onRatingOperationSuccess', this._onRatingOperationSuccess);
        DeviceEventEmitter.addListener('onError', this._onError);
    }

    render(){
        return(
            <NativeRatingScreenlet 
                {...this.props}
            />
        );
    }

    _onRatingOperationSuccess(event) {
        console.log('rating success!');
        if(!this.props.onRatingOperationSuccess) {
            return;
        }
        this.setState({
            "loaded":true
        });
        this.props.onRatingOperationSuccess(event.user);
    }

    _onError(event) {
        console.log('error!');
        if(!this.props.onError) {
            return;
        }
        this.props.onError(event.error);
    }   
}