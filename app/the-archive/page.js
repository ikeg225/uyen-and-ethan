"use client";

import styles from './theArchive.module.css'
import Link from 'next/link'
import { useEffect } from 'react';

export default function TheArchive() {
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
                <Link href="/browse">
                    <p>&#x2190; Browse</p>
                </Link>
                <p className={styles.navTitle}>The Archive</p>
            </div>
            <div className={styles.content}>
                <Link href="/the-archive/2-years-ethan">
                    <div className={styles.message}>
                        <p className={styles.date}>7/23/2023</p>
                        <p>2 years - ethan</p>
                    </div>
                </Link>
                <Link href="/the-archive/valentines-ethan-2023">
                    <div className={styles.message}>
                        <p className={styles.date}>2/14/2023</p>
                        <p>valentines 2023 - ethan</p>
                    </div>
                </Link>
                <Link href="/the-archive/to-uyen-feel-better">
                    <div className={styles.message}>
                        <p className={styles.date}>9/29/2022</p>
                        <p>to uyen, feel better</p>
                    </div>
                </Link>
                <Link href="/the-archive/aloha-uyen">
                    <div className={styles.message}>
                        <p className={styles.date}>8/16/2022</p>
                        <p>aloha uyen</p>
                    </div>
                </Link>
                <Link href="/the-archive/1-year-ethan">
                    <div className={styles.message}>
                        <p className={styles.date}>7/23/2022</p>
                        <p>1 year - ethan</p>
                    </div>
                </Link>
                <Link href="/the-archive/2021-christmas-ethan">
                    <div className={styles.message}>
                        <p className={styles.date}>12/25/2021</p>
                        <p>2021 christmas - ethan</p>
                    </div>
                </Link>
                <Link href="/the-archive/end-of-summer-ethan">
                    <div className={styles.message}>
                        <p className={styles.date}>8/??/2021</p>
                        <p>end of summer - ethan</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}