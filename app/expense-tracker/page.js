"use client";

import styles from './expenseTracker.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ExpenseTracker() {
    const [expenses, setExpenses] = useState([])
    const [spendings, setSpendings] = useState(0)
    const [byDayExpenses, setByDayExpenses] = useState([])

    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        
        return date.toLocaleString('en-US', { month: 'long' });
    }

    const date = new Date()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    useEffect(() => {
        if (typeof window !== "undefined") {
            const code = localStorage.getItem("code");
            if (code !== '03092002' && code !== '01262002') {
                router.push('/')
            } else {
                async function getExpenses() {
                    const res = await fetch(`/api/expenses/${localStorage.getItem("code")}`)
                    const json = await res.json()
                    const expenses = await json.expenses
                    setExpenses(expenses)

                    let spendings = 0
                    const day_expenses = {}
                    expenses.forEach((expense) => {
                        if (expense.month === month && expense.year === year) {
                            spendings += expense.amount
                        }
                        var key = expense.month + '/' + expense.day + '/' + expense.year
                        if (day_expenses[key] === undefined) {
                            day_expenses[key] = [[expense.amount, expense.category, expense.description]]
                        } else {
                            day_expenses[key].push([expense.amount, expense.category, expense.description])
                        }
                    })
                    // convert day_expences to a sorted array
                    const day_expenses_array = []
                    for (var key in day_expenses) {
                        var date = key.split('/')
                        day_expenses_array.push([{month: date[0], day: date[1], year: date[2]}, day_expenses[key]])
                    }
                    day_expenses_array.sort(function(a, b) {
                        const dateA = new Date(a[0].year, a[0].month, a[0].day);
                        const dateB = new Date(b[0].year, b[0].month, b[0].day);
                        return dateB - dateA;
                    });
                    setByDayExpenses(day_expenses_array)
                    setSpendings(spendings)
                }
                getExpenses()
            }
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.navigation}>
                    <Link href="/browse">
                        <p>&lt;&lt; Browse</p>
                    </Link>
                    <Link href="/expense-tracker/new">
                        <p>Add Expense &gt;&gt;</p>
                    </Link>
                </div>
                <p>{getMonthName(month)} Spendings</p>
                <h1>${spendings}</h1>
            </div>
            <div className={styles.expenses}>
                {byDayExpenses.map((expenses) => (
                    <div className={styles.dayExpense}>
                        <p className={styles.lightColor}>{expenses[0].day} {getMonthName(expenses[0].month)} {expenses[0].year}</p>
                        <div className={styles.expense}>
                            {expenses[1].map((item) => (
                                <div className={styles.item}>
                                    <div className={styles.itemInfo}>
                                        <p className={styles.darkGreen}>{item[1]}</p>
                                        <p className={styles.lightColor}>{item[2]}</p>
                                    </div>
                                    <p className={styles.darkGreen}>${item[0]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}