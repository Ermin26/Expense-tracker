import {Text, TextInput, View, StyleSheet} from 'react-native';
import { GlobalStyles } from '../../constants/styles';


function Input({label, style, textInputConfig}){

    let inputStyles = [styles.input];
    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline);
    }

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput {...textInputConfig} style={inputStyles} />
        </View>
    )
}


export default Input;



const styles = StyleSheet.create({
    container:{
        marginHorizontal: 4,
        marginVertical: 10,
    },
    label:{
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
        fontSize: 12,
        padding: 4,
    },
    input:{
        backgroundColor: GlobalStyles.colors.primary100,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 6,
        fontSize: 18,
        padding: 8,
        borderRadius: 5,
        color: GlobalStyles.colors.primary700,
    },
    inputMultiline:{
        minHeight: 100,
        textAlignVertical: 'top',
    }
});