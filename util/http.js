import axios from "axios";

const dbUrl = "https://react-native-course-f2882-default-rtdb.europe-west1.firebasedatabase.app"

export async function storeExpense(expenseData){
    const response = await axios.post(dbUrl + '/expenses.json',
        expenseData
    );
    const id = response.data.name;
    return id;
}

export async function getExpense(){
   const response = await axios.get(dbUrl + '/expenses.json');
   const expenses = [];
   for(const key in response.data){
    const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description
    };
    expenses.push(expenseObj);
   }
   return expenses;
}

export function updateExpense(id, expenseData){
    return axios.put(dbUrl + `/expenses/${id}.json`, expenseData);
}

export function deleteExpenses(id){
    return axios.delete(dbUrl + `/expenses/${id}.json`);
}