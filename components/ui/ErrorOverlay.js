import {View, Text, StyleSheet} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import Button from './buttons';


function ErrorOverlay({message, onConfirm}){
    return <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>An error occured</Text>
        <Text style={styles.text}>Error: {message}</Text>
        <Button btnPressed={onConfirm}>Close</Button>
    </View>
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text:{
        textAlign: 'center',
        marginBottom: 8,
        color: 'white'
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
    },
});