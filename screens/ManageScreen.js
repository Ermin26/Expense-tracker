import {View, Text, StyleSheet, TextInput} from 'react-native';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context'
import { useLayoutEffect } from 'react';
import IconBtn from '../components/ui/IconBtn';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/ui/buttons';
import ExpenseForm from '../components/manageExpense/ExpenseForm';


function ManageScreen({route, navigation}){
    const expenses = useContext(ExpensesContext);
    const editedExpense = route.params?.expenseId; //! This '?' prevent falling app if expenseId is undefined

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: editedExpense ? "Edit expense" : "Add Expense"
        })
    },[navigation,editedExpense]);

    function deleteExpense(){
        expenses.deleteExpense(editedExpense);
        navigation.goBack();
    };

    function cancel(){
        console.log("Cancelling");
        navigation.goBack();
    };

    function confirm(){
        console.log(editedExpense);
        if(editedExpense){
            expenses.updateExpense(editedExpense,{description: 'test', amount: 19.99, date: new Date('2024-05-19')});
        }else{
            expenses.addExpense({description: 'test', amount: 19.99, date: new Date('2025-01-27')});
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ExpenseForm />
            <View style={styles.buttonsWrapper}>
                <Button style={styles.buttonStyle} mode="flat" btnPressed={cancel}>Cancel</Button>
                <Button style={styles.buttonStyle} btnPressed={confirm}>{editedExpense ? 'Update' : 'Add'}</Button>
            </View>
            <View style={styles.deleteContainer}>
                {editedExpense && <IconBtn icon="trash" size={36} color={GlobalStyles.colors.error500} pressedBtn={deleteExpense} />}
            </View>
        </View>
    )


}



export default ManageScreen;


const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
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
    deleteContainer:{
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
});