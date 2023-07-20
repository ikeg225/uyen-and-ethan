"use client";

import styles from './newExpenseTracker.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ExpenseTracker() {
    const router = useRouter();
    const [code, setCode] = useState('')

    useEffect(() => {
      if (typeof window !== "undefined") {
        const code = localStorage.getItem("code");
        if (code !== '03092002' && code !== '01262002') {
          router.push('/')
        }
        setCode(code);
      }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const date = e.target[0].value
        const category = categorySelected(e.target[1][0].selected, e.target[1][1].selected, e.target[1][2].selected, e.target[1][3].selected, e.target[1][4].selected, e.target[1][5].selected, e.target[1][6].selected, e.target[1][7].selected, e.target[1][8].selected, e.target[1][9].selected)
        const amount = e.target[2].value
        const description = e.target[3].value

        const data = {
          userId: localStorage.getItem("code"),
          date: date,
          category: category,
          description: description,
          amount: amount
        }
        
        const res = await fetch('/api/expenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        if (res.status === 200) {
          router.push('/expense-tracker')
        }
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Link href="/expense-tracker">
              <p>&lt;&lt; Spendings</p>
          </Link>
          <h1>Add an Expense</h1>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.input}>
            <label htmlFor="date">When did you spend it?</label>
            <input type="date" id="date" name="date" required/>
          </div>
          <div className={styles.input}>
            <label htmlFor="category">What category is this expense?</label>
            <select name="category" id="category" required>
                <option value="eatingout">Eating out</option>
                <option value="shopping">Shopping</option>
                <option value="travel">Travel</option>
                <option value="entertainment">Entertainment</option>
                <option value="groceries">Groceries</option>
                <option value="coffee">Coffee</option>
                <option value="transportation">Transportation</option>
                <option value="bills">Bills</option>
                <option value="investment">Investment</option>
                <option value="misc">Misc</option>
            </select>
          </div>
          <div className={styles.input}>
            <label htmlFor="amount">How much did you spend?</label>
            <input type="number" step="0.01" id="amount" name="amount" placeholder="$xx.xx" required/>
          </div>
          <div className={styles.input}>
            <label htmlFor="description">What did you buy?</label>
            <input type="text" id="description" name="description" required placeholder="description" />
          </div>
          <input type="submit" value="Add Expense" className={styles.submit} />
        </form>
      </div>
    )
}  
  
function categorySelected(eatingout, shopping, travel, entertainment, groceries, coffee, transportation, bills, investment, misc) {
  if (eatingout) {
    return "Eating Out"
  } else if (shopping) {
    return "Shopping"
  } else if (travel) {
    return "Travel"
  } else if (entertainment) {
    return "Entertainment"
  } else if (groceries) {
    return "Groceries"
  } else if (coffee) {
    return "Coffee"
  } else if (transportation) {
    return "Transportation"
  } else if (bills) {
    return "Bills"
  } else if (investment) {
    return "Investment"
  } else if (misc) {
    return "Misc"
  }
}