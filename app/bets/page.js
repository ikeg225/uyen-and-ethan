"use client";

import styles from './bets.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ethan from './ethanBets.png'
import uyen from './uyenBets.png'
import Image from 'next/image';
import unknown from './unknown.png'

function codeToImage(code) {
    if (code === '03092002') return ethan;
    if (code === '01262002') return uyen;
    return unknown;
}

export default function Bets() {
    const [form, setForm] = useState(true)
    const [addBetButton, setAddBetButton] = useState("Add Bet")
    const [updateBetButton, setUpdateBetButton] = useState("Update Bet")
    const [bets, setBets] = useState([])
    const [name, setName] = useState('')
    const [earnings, setEarnings] = useState('--')

    useEffect(() => {
        if (typeof window !== "undefined") {
            const code = localStorage.getItem("code");
            if (code !== '03092002' && code !== '01262002') {
                router.push('/')
            } else {
                setName(code === '01262002' ? 'Uyen' : 'Ethan')
                async function fetchBets() {
                    const response = await fetch('/api/bets');
                    const res = await response.json();
                    const sorted_bets = await res.bets.sort((a, b) => b.betId - a.betId);
                    setBets(sorted_bets);
                }
                fetchBets();
                async function fetchEarnings() {
                    const response = await fetch('/api/bets/earnings');
                    const res = await response.json();
                    const ethanEarnings = await res.ethanEarnings;
                    const uyenEarnings = await res.uyenEarnings;
                    if (code === '01262002') {
                        setEarnings(uyenEarnings - ethanEarnings)
                    } else if (code === '03092002') {
                        setEarnings(ethanEarnings - uyenEarnings)
                    }
                }
                fetchEarnings();
            }
        }
    }, []);

    const handleBetAdd = async (e) => {
        e.preventDefault();

        const date = e.target[0].value
        const description = e.target[1].value
        const amount = e.target[2].value
        const winnerId = e.target[3][0].selected ? '' : e.target[3][1].selected ? '01262002' : '03092002'

        const data = {
            userIdWinner: winnerId,
            date: date,
            amount: amount,
            description: description
        }

        setAddBetButton("Adding...")

        const response = await fetch('/api/bets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await response.json();
        if (res.message === 'success') {
            setAddBetButton("Add Bet")
            data['betId'] = bets[0]['betId'] + 1
            setBets([data, ...bets]);
            if (winnerId.length > 0) {
                if (winnerId === localStorage.getItem('code')) {
                    setEarnings(parseInt(earnings) + parseInt(amount));
                } else {
                    setEarnings(parseInt(earnings) - parseInt(amount));
                }
            }
        }
    }

    const handleBetUpdate = async (e) => {
        e.preventDefault();

        const betId = e.target[0].value
        const winnerId = e.target[1][0].selected ? '' : e.target[1][1].selected ? '01262002' : '03092002'

        const data = {
            betId: betId,
            userIdWinner: winnerId
        }

        setUpdateBetButton("Updating...")

        const response = await fetch('/api/bets', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const res = await response.json();
        if (res.message === 'success') {
            setUpdateBetButton("Update Bet")
            const new_bets = bets.map(function (bet) {
                if (parseInt(bet['betId']) === parseInt(betId)) {
                    bet['userIdWinner'] = winnerId;
                    if (winnerId === localStorage.getItem('code')) {
                        setEarnings(parseInt(earnings) + parseInt(bet['amount']));
                    } else {
                        setEarnings(parseInt(earnings) - parseInt(bet['amount']));
                    }
                    return {
                        betId: betId,
                        userIdWinner: winnerId,
                        date: bet['date'],
                        amount: bet['amount'],
                        description: bet['description']
                    }
                }
                return bet;
            })
            setBets(new_bets)
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.navigation}>
                    <Link href="/browse">
                        <p>&lt;&lt; Browse</p>
                    </Link>
                    <p>Bets</p>
                </div>
                <div className={styles.title}>
                    <p>earnings</p>
                    <h1>{name}: ${earnings}</h1>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.formWrapper}>
                    <div className={styles.formOptions}>
                        <p onClick={() => setForm(true)} className={form ? styles.selected : ''}>Add new Bet</p>
                        <p onClick={() => setForm(false)} className={form ? '' : styles.selected}>Update a Bet</p>
                    </div>
                    {form && <form onSubmit={handleBetAdd} className={styles.form}>
                        <div className={styles.input}>
                            <label htmlFor="amount">Choose a date: </label>
                            <input className={styles.inputField} type="date" id="date" name="date" required/>
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="amount">What&apos;s the bet: </label>
                            <input className={styles.inputField} type="text" id="description" name="description" required placeholder="description" />
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="amount">How much was the bet: </label>
                            <input className={styles.inputField} type="number" step="1" id="amount" name="amount" placeholder="$xx" required/>
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="amount">Who was the winner: </label>
                            <select name="winner" id="winner" required>
                                <option value="00000000">No one yet</option>
                                <option value="01262002">Uyen</option>
                                <option value="03092002">Ethan</option>
                            </select>
                        </div>
                        <div className={styles.submitWrapper}>
                            <input type="submit" value={addBetButton} className={styles.submit} />
                        </div>
                    </form>}
                    {!form && <form onSubmit={handleBetUpdate} className={styles.form}>
                        <div className={styles.input}>
                            <label htmlFor="amount">Enter the Bet ID: </label>
                            <input className={styles.inputField} type="text" id="description" name="description" required placeholder="bet id" />
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="amount">Who was the winner: </label>
                            <select name="winner" id="winner" required>
                                <option value="00000000">No one yet</option>
                                <option value="01262002">Uyen</option>
                                <option value="03092002">Ethan</option>
                            </select>
                        </div>
                        <div className={styles.submitWrapper}>
                            <input type="submit" value={updateBetButton} className={styles.submit} />
                        </div>
                    </form>}
                </div>
                <div className={styles.bets}>
                    {bets.map((bet, index) => (
                        <div key={index} className={styles.bet}>
                            <div>
                                <div className={styles.betLeft}>
                                    <h2>#{bet.betId}</h2>
                                    <Image src={codeToImage(bet.userIdWinner)} height={30} width={30} />
                                </div>
                                <p>{bet.date}</p>
                            </div>
                            <p className={styles.description}>{bet.description}</p>
                            <p>${bet.amount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}