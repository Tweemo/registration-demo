'use client'

import styles from './form.module.scss'
import { FormEvent } from 'react'
import Steps from '../steps/steps'

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
    window.location.href = '/success'
  }

  return (
    <div className={styles.container}>
      <div>
        <h1>Create an account</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit lacinia viverra
          purus volutpat odio, dis urna suspendisse sem duis tempor magna mollis
          ut dignissim per, id aptent varius sagittis sollicitudin torquent
          sapien pharetra nascetur etiam ornare.
        </p>
      </div>
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
