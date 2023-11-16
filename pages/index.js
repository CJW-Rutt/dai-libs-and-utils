import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import getAPI from '@/libs/getAPI'
import { useCounter } from '@/utils/counter'

export default function Home() {
	const [characters, setCharacters] = useState([]);
	const [loading, setLoading] = useState(false);

	async function getCharacters() {
		try {
			setLoading(true);
			const { results } = await getAPI("people/");
			setCharacters(results);
		} catch(error) {
			throw new Error(error);;
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getCharacters();
	}, [])

	const { count, setCount, increment, decrement, reset } = useCounter(0); // destructure counter.js

	const multiplyByTwo  = () => setCount(x => x * 2);

	return (
		<>
			<main className={`${styles.main}`}>
				<div>
					<h2>Star Wars and JS Counters</h2>
					<ul>
						{loading && <p>Searching...Loading Data</p>}
						{
							characters && 
							characters.map((character, index) => (
								<li key={index}>{character.name}</li>
						))
						}
					</ul>
				</div>
				<div className={styles.counterContainer}>
					<div >
						<h2 className={styles.title}>A Counter For You</h2>
						<p className={styles.title}>Count is {count}</p>
					</div>
					<div className={styles.rowContainer}>
						<div className={styles.topButtons}>
							<button className={styles.button}  onClick={increment}>Increment</button>
							<button  className={styles.button} onClick={decrement}>Decrement</button>
						</div>
						<div className={styles.bottomButtons}>
							<button className={styles.button} onClick={reset}>Reset</button>
							<button className={styles.button} onClick={multiplyByTwo}>Multiply by Two</button>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
