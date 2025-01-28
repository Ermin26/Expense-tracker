import { createContext, useReducer } from "react";

const Expenses = [
    {
        id: '1',
        description: 'Shoes',
        amount: 59.99,
        date: new Date('2021-12-19'),
    },
    {
        id: '2',
        description: 'Trousers',
        amount: 89.99,
        date: new Date('2021-01-19'),
    },
    {
        id: '3',
        description: 'Bananas',
        amount: 5.99,
        date: new Date('2024-12-19'),
    },
    {
        id: '4',
        description: 'Book',
        amount: 15.99,
        date: new Date('2025-01-28'),
    },
    {
        id: '5',
        description: 'Shoes',
        amount: 59.99,
        date: new Date('2021-12-19'),
    },
    {
        id: '6',
        description: 'Trousers',
        amount: 89.99,
        date: new Date('2021-01-19'),
    },
    {
        id: '7',
        description: 'Bananas',
        amount: 5.99,
        date: new Date('2025-01-22'),
    },
    {
        id: '8',
        description: 'Book',
        amount: 15.99,
        date: new Date('2025-01-27'),
    },
]


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amoun, date})=>{},
    deleteExpense: (id)=>{},
    updateExpense: (id, {description, amoun, date})=>{},
});

function expensesReducer(state, action){
    switch(action.type){
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id},...state]
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
    const[expensesState, dispatch] = useReducer(expensesReducer, Expenses);

    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData});
    }

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload: {id: id,data: expenseData}});
    }

    const value ={
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return (
        <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
    )
}


export default ExpensesContextProvider;