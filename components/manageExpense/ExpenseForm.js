import {Text, View, StyleSheet} from 'react-native';
import { useState } from 'react';
import { GlobalStyles } from '../../constants/styles';
import Button from '../ui/buttons';
import {getFormattedDate} from '../../util/date';

import Input from './input';




function ExpenseForm({cancel, submitMethodLabel, onSubmit, defaultValues}){
    //const [amount, setAmount] = useState(''); //! Set default value to string because everything from input field is a string
    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : ' ',
        date: defaultValues ? getFormattedDate(defaultValues.date) : ' ',
        description: defaultValues ? defaultValues.description : ' '
    });

    function inputChangeHandler(inputIdentifier,enteredValue){
        setInputValues((curInputValues)=>{
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue
            }
        });
    }

    function submitData(){
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description
        }

        onSubmit(expenseData);

    };

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Add expense</Text>
            <View style={styles.inputContainer}>
                <Input style={styles.rowInput} label="Amount" textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    //value: amount, //! This is connected to the amount constant
                    value: inputValues.amount
                }}/>
                <Input style={styles.rowInput} label="Date" textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    keyboardType: 'numeric',
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputValues.date
                }}/>
            </View>
            <Input label="Description" textInputConfig={{
                multiline: true,
                autoCorrect: false,
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputValues.description
            }}/>
            <View style={styles.buttonsWrapper}>
                <Button style={styles.buttonStyle} mode="flat" btnPressed={cancel}>Cancel</Button>
                <Button style={styles.buttonStyle} btnPressed={submitData}>{submitMethodLabel}</Button>
            </View>
        </View>
    )
}




export default ExpenseForm;

const styles = StyleSheet.create({
    form:{
        marginTop: 20,
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        justifyContent:'center',
        textAlign:'center',
        marginVertical: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 10,
    },
    rowInput:{
        flex: 1,
    },
    buttonsWrapper:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        marginVertical: 16,
    },
    buttonStyle:{
        minWidth: 120,
        marginHorizontal: 8,
    },
})

