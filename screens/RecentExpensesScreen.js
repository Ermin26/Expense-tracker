import {StyleSheet} from 'react-native';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

function RecentExpensesScreen(){
    const expensesCtx = useContext(ExpensesContext);
    const recentExpenses = expensesCtx.expenses.filter((expense) =>{
        const today = new Date();
        const date7daysAgo = getDateMinusDays(today, 7);
        return (expense.date > date7daysAgo) && (expense.date <= today) ;
    });
    return(
        <ExpensesOutput expenses ={recentExpenses}  expensesPeriod="Last 7 days" fallbackText="No expenses registered for the last 7 days" />
    )
}



export default RecentExpensesScreen;


const styles = StyleSheet.create({
    
});