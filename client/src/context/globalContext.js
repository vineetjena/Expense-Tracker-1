import React, { createContext, useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;


const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

//Calculate Income

    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    };

    const getIncomes=async ()=>{
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome=async(id)=>{
        const res=await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome=0;
        incomes.forEach((income)=>{
            totalIncome=totalIncome+income.amount
        })
        return totalIncome;
    }

//Calculate Expense

    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    };

    const getExpenses=async ()=>{
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense=async(id)=>{
        const res=await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalExpense=0;
        expenses.forEach((expense)=>{
            totalExpense=totalExpense+expense.amount
        })
        return totalExpense;
    }
    
    return (
        <GlobalContext.Provider value={{ 
            addIncome,
            getIncomes,
            incomes, 
            deleteIncome,
            totalIncome,
            expenses,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            error 
            }}>
                {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
