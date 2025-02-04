import {Text, View, StyleSheet, Alert} from 'react-native';
import { useState } from 'react';
import { GlobalStyles } from '../../constants/styles';
import Button from '../ui/buttons';
import {getFormattedDate} from '../../util/date';

import Input from './input';




function ExpenseForm({cancel, submitMethodLabel, onSubmit, defaultValues}){
    //const [amount, setAmount] = useState(''); //! Set default value to string because everything from input field is a string
    const [inputValues, setInputValues] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : ' ',
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : ' ',
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : ' ',
            isValid: true,
        }
    });

    function inputChangeHandler(inputIdentifier,enteredValue){
        setInputValues((curInputValues)=>{
            return {
                ...curInputValues,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            }
        });
    }

    

    function submitData(){
        const expenseData = {
            amount: +inputValues.amount.value,
            date: new Date(inputValues.date.value),
            description: inputValues.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = !!expenseData.description || expenseData.description.trim().length > 0;
        if(amountIsValid && dateIsValid && descriptionIsValid){
            onSubmit(expenseData);
        }else{
            setInputValues((curInputs)=>{
                return{
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: { value: curInputs.description.value, isValid: descriptionIsValid },
                }
            })
        }
    };

    const formIsInvalid = !inputValues.amount.isValid || !inputValues.date.isValid || !inputValues.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Add expense</Text>
            <View style={styles.inputContainer}>
                <Input style={styles.rowInput} label="Amount"
                invalid = {!inputValues.amount.isValid}
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    //value: amount, //! This is connected to the amount constant
                    value: inputValues.amount.value
                }}/>
                <Input style={styles.rowInput} label="Date" invalid = {!inputValues.date.isValid} textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    keyboardType: 'numeric',
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputValues.date.value
                }}/>
            </View>
            <Input label="Description" invalid = {!inputValues.description.isValid} textInputConfig={{
                multiline: true,
                autoCorrect: false,
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputValues.description.value
            }}/>
            {formIsInvalid && <Text style={styles.errorMsg}>Invalid data</Text>}
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
    errorMsg:{
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
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

