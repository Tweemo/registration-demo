import styles from './page.module.scss'

export default function Success() {
  return (
    <div className={styles.container}>
      <h1>Registration successful</h1>
      <a href="/" className={styles.link}>
        <button>Go back</button>
      </a>
    </div>
  )
}
// Todo: add more
