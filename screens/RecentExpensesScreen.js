import {StyleSheet} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

function RecentExpensesScreen(){
    return(
        <ExpensesOutput expensesPeriod="Last 7 days"/>
    )
}



export default RecentExpensesScreen;


const styles = StyleSheet.create({
    
});