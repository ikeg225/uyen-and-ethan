"use client";

import SOTD from './images/song-of-the-day.jpg';
import onetwothree from './images/1-2-3.jpg';
import AudioRecordings from './images/audio-recordings.jpg';
import Bets from './images/bets.jpg';
import EncouragementMessage from './images/encouragement-message.jpg';
import ExpenseTracker from './images/expense-tracker.jpg';
import LikeDislikes from './images/like-dislikes.jpg';
import PicsOfUs from './images/pics-of-us.jpg';
import TheArchive from './images/the-archive.jpg';
import WorkoutTracker from './images/workout-tracker.jpg';

import styles from './css/browse.module.css';
import ImageCover from './imagecover';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function Browse() {
  const router = useRouter();
  const [userExpenses, setUserExpenses] = useState(["--", "--"]);
  const [oneTwoThreeDate, setOneTwoThreeDate] = useState("--/--/--");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const code = localStorage.getItem("code");
      if (code !== '03092002' && code !== '01262002') {
        router.push('/')
      } else {
        async function getUserExpenses() {
          const res = await fetch("/api/expenses");
          const json = await res.json();
          const ethan_spendings = await json.ethan_spendings;
          const uyen_spendings = await json.uyen_spendings;
          setUserExpenses([ethan_spendings, uyen_spendings]);
        }
        getUserExpenses();
        async function getOneTwoThree() {
          const res = await fetch("/api/1-2-3/like");
          const json = await res.json();
          const date = await json.date;
          setOneTwoThreeDate(date);
        }
        getOneTwoThree();
      }
    }
  }, []);

  return (
    <div style={{width: '100%', height: '100%'}}>
      <Link href="/expense-tracker"><ImageCover src={ExpenseTracker} title={"Expense Tracker"} subtitle={`Ethan: $${userExpenses[0]} | Uyen: $${userExpenses[1]}`} /></Link>
      <Link href="/1-2-3"><ImageCover src={onetwothree} title={"1-2-3"} subtitle={oneTwoThreeDate}/></Link>
      <Link href="/song-of-the-day"><ImageCover src={SOTD} title={"Song of the Day"} subtitle={"Doses & Mimosas"}/></Link>    
      <Link href="/audio-recordings"><ImageCover src={AudioRecordings} title={"Audio Recordings"} subtitle={"11 recordings"}/></Link>
      <Link href="/bets"><ImageCover src={Bets} title={"Bets"} subtitle={"Uyen: $45"}/></Link>
      <Link href="/encouragement-message"><ImageCover src={EncouragementMessage} title={"Encouragement Message"} subtitle={"5/30/23"}/></Link>
      <Link href="/like-dislikes"><ImageCover src={LikeDislikes} title={"Like & Dislikes"} subtitle={"123 likes, 58 dislikes"}/></Link>
      <Link href="/pics-of-us"><ImageCover src={PicsOfUs} title={"Pics of Us"} subtitle={""}/></Link>
      <Link href="/the-archive"><ImageCover src={TheArchive} title={"The Archive"} subtitle={"2 years, 1 month, 1 day"}/></Link>
      <Link href="/workout-tracker"><ImageCover src={WorkoutTracker} title={"Workout Tracker"} subtitle={"20 times in the last 30 days"}/></Link>
    </div>
  )
}