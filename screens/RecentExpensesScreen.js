import {StyleSheet} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { getExpense } from '../util/http'
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

function RecentExpensesScreen(){
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const expensesCtx = useContext(ExpensesContext);


    useEffect(()=>{
        async function getData() {
            setIsFetching(true);
            try{
                const expenses = await getExpense();
                expensesCtx.setExpenses(expenses);
            }catch(error){
                setError(error.message);
            }
            setIsFetching(false);
        }
        getData();
    },[])

    function errorHandler(){
        setError(null);
    }

    if(error && !isFetching){
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if(isFetching){
        return <LoadingOverlay />;
    }

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