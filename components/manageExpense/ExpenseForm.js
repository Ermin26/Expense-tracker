import {TextInput, View, StyleSheet} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import Input from './input';




function ExpenseForm(){
    function amountChangeHandler(){}
    function dateChangeHandler(){}
    function textChangeHandler(){}
    return (
        <View>
            <Input label="Amount" textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: amountChangeHandler,
            }}/>
            <Input label="Date" textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                keyboardType: 'numeric',
                maxLength: 10,
                onChangeText: dateChangeHandler,
            }}/>
            <Input label="Description" textInputConfig={{
                multiline: true,
                autoCorrect: false,
                onChangeText: textChangeHandler,
            }}/>
        </View>
    )
}



export default ExpenseForm;

