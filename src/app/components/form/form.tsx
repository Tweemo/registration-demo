'use client'

import styles from './form.module.scss'
import { FormEvent, useState } from 'react'
import clsx from 'clsx'

export default function Form() {
  const [step, setStep] = useState<'name' | 'email' | 'password'>('name')

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
      console.log(res)
      if (!res.ok) {
        throw new Error('Failed to register')
      }

      const result = await res.json()
      console.log('Registration successful:', result)
      // Handle successful registration (e.g., redirect or show success message)
    } catch (error) {
      window.alert(`Registration failed. Please try again.`)
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
        <div
          className={clsx(
            styles.formStep,
            step === 'name' && styles.formStep__active
          )}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
          />
          {/* Validate name is set before moving to the next step */}
          <button type="button" onClick={() => setStep('email')}>
            Next
          </button>
        </div>

        <div
          className={clsx(
            styles.formStep,
            step === 'email' && styles.formStep__active
          )}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          {/* Validate email is set before moving to the next step */}
          <button type="button" onClick={() => setStep('name')}>
            Back
          </button>
          <button type="button" onClick={() => setStep('password')}>
            Next
          </button>
        </div>

        <div
          className={clsx(
            styles.formStep,
            step === 'password' && styles.formStep__active
          )}
        >
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
          <button type="button" onClick={() => setStep('email')}>
            Back
          </button>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}
