import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {


    constructor() {
        super();
        this.state = {
            hasCamPermission: null,
            scanned: false,
            buttonState: "normal",
            scannedData: " "

        }
    }

    getCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCamPermission: status === "granted",
            scanned: false,
            buttonState: "clicked",
            scannedData: "Hello i am ready to scan"

        })
    }

    handlebarcodescanner = async ({ type, data }) => {
        this.setState({
            scanned: true,
            buttonState: "normal",
            scannedData: data
        })

    }


    render() {

        if (this.state.hasCamPermission === true && this.state.buttonState === "clicked") {

            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>

                  
                    <BarCodeScanner onBarCodeScanned={this.state.scanned ? undefined : this.handlebarcodescanner}
                        style={StyleSheet.absoluteFillObject} />


                </View>
            );

        }
        else if (this.state.buttonState === "normal"){

            return(
                <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >

                <View>
              <Image
                source={require("../assets/booklogo.jpg")}
                style={{width:200, height: 200}}/>
              <Text style={{textAlign: 'center', fontSize: 30}}>Wily</Text>
            </View>
                 

                    <Text style={{ color: 'red' }}>
                    {this.state.hasCamPermission?this.state.scannedData:"Request for camera Permission"}
                    </Text>
                    <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermission}>
                        <Text>SCAN QR CODE</Text>
                    </TouchableOpacity>


                </View >
            );

    }

}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    displayText: {
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    scanButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 0
    },
    buttonText: {
        fontSize: 20,
    }
});

