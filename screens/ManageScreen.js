import {View, Text, StyleSheet, TextInput} from 'react-native';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context'
import { useLayoutEffect } from 'react';
import IconBtn from '../components/ui/IconBtn';
import { GlobalStyles } from '../constants/styles';
import ExpenseForm from '../components/manageExpense/ExpenseForm';


function ManageScreen({route, navigation}){
    const expenses = useContext(ExpensesContext);
    const editedExpense = route.params?.expenseId; //! This '?' prevent falling app if expenseId is undefined
    const selectedExpense = expenses.expenses.find(expense => expense.id === editedExpense);
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
        navigation.goBack();
    };
    function confirm(expenseData){
        if(editedExpense){
            expenses.updateExpense(editedExpense,expenseData);
        }else{
            expenses.addExpense(expenseData);
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ExpenseForm submitMethodLabel={editedExpense ? 'Update' : 'Add'} 
            cancel={cancel}
             onSubmit={confirm}
             defaultValues={selectedExpense} />
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
    
    deleteContainer:{
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
});