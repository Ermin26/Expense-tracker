import { createContext, useReducer } from "react";


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amoun, date})=>{},
    setExpenses: (expenses) => {},
    deleteExpense: (id)=>{},
    updateExpense: (id, {description, amoun, date})=>{},
});

function expensesReducer(state, action){
    switch(action.type){
        case 'ADD':
            return [action.payload,...state]
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updateItemIndex = state.findIndex((expense)=> expense.id === action.payload.id);
            const updateExpense = state[updateItemIndex];
            const updateItem = {...updateExpense, ...action.payload.data};
            const updatedExpense = [...state];
            updatedExpense[updateItemIndex] = updateItem;
            return updatedExpense;
        case 'DELETE':
            return state.filter((expense)=> expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({children}){
    const[expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData});
    }

    function setExpenses(expenses){
        dispatch({type: 'SET', payload: expenses});
    }

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload: {id: id,data: expenseData}});
    }

    const value ={
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return (
        <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
    )
}


export default ExpensesContextProvider;