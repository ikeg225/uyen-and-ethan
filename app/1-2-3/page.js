"use client";

import styles from './1-2-3.module.css';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Textarea from 'react-expanding-textarea';
import Image from 'next/image';
import ethanOneTwoThree from './ethanOneTwoThree.png';
import uyenOneTwoThree from './uyenOneTwoThree.png';

function toDateAndTime(timestamp) {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';
    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
}

function codeToPhoto(code) {
    if (code === '01262002') return uyenOneTwoThree;
    if (code === '03092002') return ethanOneTwoThree;
}

export default function oneTwoThree() {
    const [submitText, setSubmitText] = useState("Submit");
    const [messages, setMessages] = useState([]);
    const [code, setCode] = useState("");

    useEffect(() => {
        textareaRef.current.focus()
    }, [])

    useEffect(() => {
        if (typeof window !== "undefined") {
            const code = localStorage.getItem("code");
            if (code !== '03092002' && code !== '01262002') {
              router.push('/')
            } else {
                setCode(code);
                async function fetchMessages() {
                    const response = await fetch('/api/1-2-3');
                    const res = await response.json();
                    const sorted_messages = await res.oneTwoThrees.sort((a, b) => b.timestamp - a.timestamp);
                    setMessages(sorted_messages);
                }
                fetchMessages();
            }
        }
    }, []);

    const textareaRef = useRef(null)

    const submitMessage = async () => {
        const comment = textareaRef.current.value;
        if (comment.length > 0) {
            setSubmitText("Submitting...");
            const userId = localStorage.getItem("code");
            const response = await fetch('/api/1-2-3', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, comment })
            });
            const res = await response.json();
            if (res.message === 'success') {
                textareaRef.current.value = "";
                setSubmitText("Submit");
                const newMessage = { userId, comment, timestamp: Date.now(), likedBy: "" };
                setMessages([newMessage, ...messages]);
            }
        }
    }

    const likeComment = async () => {
        const userId = localStorage.getItem("code");
        const timestamp = messages[0].timestamp;
        const response = await fetch('/api/1-2-3/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, timestamp })
        });
        const res = await response.json();
        if (res.message === 'success') {
            const newMessages = messages.map(message => {
                if (message.timestamp === timestamp) {
                    return { ...message, likedBy: userId }
                } else {
                    return message
                }
            });
            setMessages(newMessages);
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.navigation}>
                    <Link href="/browse"><p>&lt;&lt; browse</p></Link>
                    <p>1-2-3</p>
                </div>
                <h1>1. What made you happy?<br/>2. What are you grateful for?<br/>3. What did you do well?</h1>
            </div>
            <div className={styles.content}>
                <div className={styles.submission}>
                    <Textarea
                        className={styles.textarea}
                        maxLength="3000"
                        placeholder="Type here..."
                        ref={textareaRef}
                    />
                    <div className={styles.byline}>
                        {code && <Image src={codeToPhoto(code)} width={25} height={25} />}
                        <button onClick={submitMessage}>{submitText}</button>
                    </div>
                </div>
                <div>
                    {messages.map(message => (
                        <div key={message.timestamp} className={styles.message}>
                            <Image src={codeToPhoto(message.userId)} width={25} height={25} className={styles.topRow} />
                            <div className={styles.commentHeader}>
                                <p className={styles.timestamp}>{toDateAndTime(message.timestamp)}</p>
                                {console.log(message.likedBy)}
                                { code !== message.userId && message.likedBy.length === 0 && <p className={styles.like} onClick={likeComment}>Like!</p> }
                                { message.likedBy.length > 0 && <p>&#10084;</p> }
                            </div>
                            <p className={styles.comment}>{message.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}