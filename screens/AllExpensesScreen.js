import {StyleSheet} from 'react-native';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

function AllExpensesScreen(){
    const expensesCtx = useContext(ExpensesContext);
    return(
        <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText="No expenses registered find." />
    )
}



export default AllExpensesScreen;


const styles = StyleSheet.create({
    
});