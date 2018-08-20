import React, {Component} from 'react';
import {Platform, 
    StyleSheet, 
    Text, 
    View,
    Button,
    ScrollView,
    NativeModules
  } from 'react-native';
import Login from './Components/Login'
export default class HomeScreen extends Component {
    static navigationOptions = {
      title: 'Screenlets demo',
    };
    constructor(props) {
        super(props);
        this.state = {
          logged: false
        };
        this._onLoginSuccess = this._onLoginSuccess.bind(this);    
    }
      
    async componentWillMount(){
        try {
            var userId = await SessionContext.loadCredentials()
            if(userId.user != 0) {
                this.setState({
                    logged: true,
                    userId: userId.user
                });
            }
        } catch(e) {
            this.setState({
                logged: false,
            });
        }
    }
    
    render() {
        const { navigate } = this.props.navigation;
        if(this.state.logged) {
            return (
                <ScrollView >
                    <View style={styles.container}>
                        <View style={styles.button}>
                            <Button 
                                onPress={() => navigate('UserPortrait', { userId: this.state.userId })}
                                title="User portrait"
                            />
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.button}
                                onPress={() => navigate('ImageGallery')}
                                title="Image Gallery"
                            />
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.button}
                                onPress={() => navigate('CommentList')}
                                title="Comment List"
                            />
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.button}
                                onPress={() => navigate('SignUp')}
                                title="SignUp"
                            />
                        </View>
                        
                        <View style={styles.button}>
                            <Button style={styles.button}
                                onPress={() => navigate('Rating')}
                                title="Rating"
                            />
                        </View>

                        <View style={styles.button}>
                            <Button style={styles.button}
                                onPress={() => navigate('DDLForm')}
                                title="DDL Form"
                            />
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.button}
                                onPress={() => navigate('WebContentDisplay')}
                                title="Web Content Display"
                            />
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.button}
                                onPress={() => navigate('ImageDisplay')}
                                title="Image Display"
                            />
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.button}
                                onPress={() => navigate('VideoDisplay')}
                                title="Video display"
                            />
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.button}
                                onPress={() => navigate('AudioDisplay')}
                                title="Audio Display"
                            />
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.button}
                                onPress={() => navigate('CommentDisplay')}
                                title="Comment Display"
                            />
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.button}
                                onPress={() => navigate('CommentAdd')}
                                title="Comment Add"
                            />
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.button}
                                onPress={() => navigate('PdfDisplay')}
                                title="Pdf display"
                            />
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.button}
                                onPress={() => navigate('AssetList')}
                                title="Asset list"
                            />
                        </View>
                    </View>
                </ScrollView>
            );
        } else {
            return (
            <View style={styles.container}>
                <Login onLoginSuccess={this._onLoginSuccess} />
            </View>
            );
        }
    }

    //Login success
    _onLoginSuccess(userId) {
        this.setState({
            logged: true,
            userId: userId
        });
    }
}
const SessionContext = NativeModules.SessionContextManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
    button:{
        margin:5
    }
});