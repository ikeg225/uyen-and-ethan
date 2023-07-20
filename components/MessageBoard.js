"use client";

import styles from './MessageBoard.module.css';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Textarea from 'react-expanding-textarea';
import Image from 'next/image';
import ethanMessageProfilePic from './ethanMessageProfilePic.png';
import uyenMessageProfilePic from './uyenMessageProfilePic.png';

function toDateAndTime(timestamp) {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';
    return `${month}/${day}/${year} ${hours === 0 ? 12 : hours}:${minutes < 10 ? 0 : ''}${minutes} ${ampm}`;
}

function codeToPhoto(code) {
    if (code === '01262002') return uyenMessageProfilePic;
    if (code === '03092002') return ethanMessageProfilePic;
}

export default function MessageBoard({ title, subTitle, primaryColor, headerTextColor, apiName}) {
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
                    const response = await fetch(`/api/${apiName}`);
                    const res = await response.json();
                    const sorted_messages = await res.messages.sort((a, b) => b.timestamp - a.timestamp);
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
            const response = await fetch(`/api/${apiName}`, {
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
        const response = await fetch(`/api/${apiName}/like`, {
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
            <div className={styles.header} style={{ backgroundColor: primaryColor, color: headerTextColor }}>
                <div className={styles.navigation}>
                    <Link href="/browse" style={{color: headerTextColor}} ><p>&lt;&lt; browse</p></Link>
                    <p>{title}</p>
                </div>
                <h1 dangerouslySetInnerHTML={{__html: subTitle}} />
            </div>
            <div className={styles.content}>
                <div className={styles.submission} style={{border: `solid 2px ${primaryColor}` }} >
                    <Textarea
                        className={styles.textarea}
                        maxLength="3000"
                        placeholder="Type here..."
                        ref={textareaRef}
                    />
                    <div className={styles.byline}>
                        {code && <Image src={codeToPhoto(code)} width={25} height={25} />}
                        <button onClick={submitMessage} style={{ backgroundColor: primaryColor, color: headerTextColor }} >{submitText}</button>
                    </div>
                </div>
                <div>
                    {messages.map(message => (
                        <div key={message.timestamp} className={styles.message}>
                            <Image src={codeToPhoto(message.userId)} width={25} height={25} className={styles.topRow} />
                            <div className={styles.commentHeader}>
                                <p className={styles.timestamp}>{toDateAndTime(message.timestamp)}</p>
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