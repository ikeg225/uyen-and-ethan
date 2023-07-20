"use client"; 

import Image from 'next/image'
import styles from './page.module.css'
import logo from './logo.png'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [code, setCode] = useState('');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const code = localStorage.getItem("code");
      if (code === '03092002' || code === '01262002') {
        router.push('/browse')
      }
    }
    if (code === '03092002' || code === '01262002') {
      localStorage.setItem("code", code);
      router.push('/browse')
    }
  }, [code]);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          loading="lazy"
          src={logo}
          fill
          className={styles.logo}
        />
      </div>
      <input 
        className={styles.input} 
        placeholder="Enter your code..." 
        type="number" 
        value={code}
        onChange={e => setCode(e.target.value)}
      />
    </div>
  )
}
