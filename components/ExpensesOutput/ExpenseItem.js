import {View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from '../../constants/styles';
import {getFormattedDate} from '../../util/date';



function ExpenseItem({id,description, amount, date}){
    const navigation = useNavigation();
    function expensePressHandler(){
        navigation.navigate('ManageScreen', {
            expenseId: id,
        });
    }


    return(
        <Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.expenseItem}>
                <View style={styles.textContainer}>
                    <Text style={[styles.textBase,styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text  style={styles.amount}>$ {amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}



export default ExpenseItem;

const styles= StyleSheet.create({
    expenseItem:{
        flexDirection:'row',
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4
    },
    textContainer:{
        maxWidth: '70%',
        padding: 4
    },
    textBase:{
        color: GlobalStyles.colors.primary50,
    },
    description:{
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    priceContainer:{
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:4,
        height: 50,
    },
    amount:{
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
        minWidth: 70,
        textAlign: 'center',
    },
    pressed:{
        opacity: .75,
    }
});