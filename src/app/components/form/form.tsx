'use client'

import styles from './form.module.scss'

type DataProps = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function Form() {
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data: DataProps = Object.fromEntries(formData.entries()) as DataProps
    // Data object to contain the data to be sent to the server
    console.log(data)

    if (data.password !== data.confirmPassword) {
      // Handle password mismatch
      window.alert('Passwords do not match')
      return
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    // Eventually this should be sent to the server and DB
    console.log(res)
  }

  return (
    <div className={styles.container}>
      <h1>Registration form for something</h1>
      <form
        onSubmit={handleRegister}
        method="POST"
        action="/api/register"
        className={styles.form}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          id="confirmPassword"
          name="confirmPassword"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
