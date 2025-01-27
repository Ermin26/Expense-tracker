import {View, Text, StyleSheet} from 'react-native';
import { useLayoutEffect } from 'react';
import IconBtn from '../components/ui/IconBtn';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/ui/buttons';


function ManageScreen({route, navigation}){
    const editedExpense = route.params?.expenseId; //! This '?' prevent falling app if expenseId is undefined

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: editedExpense ? "Edit expense" : "Add Expense"
        })
    },[navigation,editedExpense]);

    function deleteExpense(){
        navigation.goBack();
    };

    function cancel(){
        console.log("Cancelling");
        navigation.goBack();
    };

    function confirm(){
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
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
        alignItems: 'center'
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