import {View, StyleSheet } from 'react-native';
import { useContext, useState } from 'react';
import { ExpensesContext } from '../store/expenses-context'
import { useLayoutEffect } from 'react';
import IconBtn from '../components/ui/IconBtn';
import { GlobalStyles } from '../constants/styles';
import ExpenseForm from '../components/manageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpenses } from '../util/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';


function ManageScreen({route, navigation}){
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const expenses = useContext(ExpensesContext);
    const editedExpense = route.params?.expenseId; //! This '?' prevent falling app if expenseId is undefined
    const selectedExpense = expenses.expenses.find(expense => expense.id === editedExpense);
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: editedExpense ? "Edit expense" : "Add Expense"
        })
    },[navigation,editedExpense]);

    async function deleteExpense(){
        setIsFetching(true);
        try{
            await deleteExpenses(editedExpense);
            expenses.deleteExpense(editedExpense);
            navigation.goBack();
        }catch(error){
            setError(error.message);
            setIsFetching(false);
        }
    };

    function cancel(){
        navigation.goBack();
    };
    async function confirm(expenseData){
        setIsFetching(true);
        try{
            if(editedExpense){
                expenses.updateExpense(editedExpense,expenseData);
                await updateExpense(editedExpense,expenseData);
            }else{
                const item_id = await storeExpense(expenseData);
                expenses.addExpense({...expenseData, id: item_id});
            }
            navigation.goBack();
        }catch(error){
            setError(error.message);
            setIsFetching(false);
        }
    };

    function errorHandler(){
        setError(null);
    }

    if(error && !isFetching){
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if(isFetching){
        return <LoadingOverlay />;
    }

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