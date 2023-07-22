"use client";

import styles from './TheArchiveMessage.module.css'
import { useEffect } from 'react';
import Link from 'next/link'

export default function TheArchiveMessage({ title, date, message }) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            const code = localStorage.getItem("code");
            if (code !== '03092002' && code !== '01262002') {
                router.push('/')
            }
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.navigation}>
                <Link href="/the-archive">
                    <p className={styles.navLink}>&#x2190; The Archive</p>
                </Link>
                <p className={styles.navTitle}>{title}</p>
            </div>
            <div className={styles.content}>
                <p className={styles.date}>{date}</p>
                <p className={styles.message}>{message}</p>
            </div>
        </div>
    )
}