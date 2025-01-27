import {StyleSheet} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

function AllExpensesScreen(){
    return(
        <ExpensesOutput expensesPeriod="Total"/>
    )
}



export default AllExpensesScreen;


const styles = StyleSheet.create({
    
});