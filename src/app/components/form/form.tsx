'use client'

import styles from './form.module.scss'
import { FormEvent } from 'react'
import Steps from './steps'

export default function Form() {
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())

    if (data.password !== data.confirmPassword) {
      window.alert('Passwords do not match')
      return
    }

    try {
      const res = await fetch('/api/add-person', {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        throw new Error('Failed to register')
      }

      const result = await res.json()
      // Handle successful registration (e.g., redirect or show success message)
      console.log('Registration successful:', result)
    } catch (error) {
      window.alert(`Registration failed. Please try again. ${error}`)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Create an account</h1>
      <form
        onSubmit={handleRegister}
        method="POST"
        action="/api/add-person"
        className={styles.form}
      >
        <Steps />
      </form>
    </div>
  )
}
