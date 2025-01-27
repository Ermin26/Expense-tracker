import { FlatList, Text, StyleSheet } from "react-native";
import { GlobalStyles } from '../../constants/styles';
import ExpenseItem from './ExpenseItem';

function rednerExpenses(itemData){
    return(
        <ExpenseItem {...itemData.item} />
    )
}

function ExpensesList({expenses}){
    return <FlatList data={expenses} renderItem={rednerExpenses} keyExtractor={(item)=> item.id} />
}

export default ExpensesList;

const styles = StyleSheet.create({
});