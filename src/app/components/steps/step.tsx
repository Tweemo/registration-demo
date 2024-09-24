'use client'

import styles from './step.module.scss'
import { KeyboardEvent, useState } from 'react'
import clsx from 'clsx'

export default function Step({
  step,
  steps,
  currentStep,
  setCurrentStep,
}: {
  step: Step
  steps: Step[]
  currentStep: string
  setCurrentStep: (step: string) => void
}) {
  const [content, setContent] = useState<string>('')
  const { type, index, buttons } = step
  const emailRegexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  const hasContent = content.length > 0
  const previousStep = steps[index - 1]?.type
  const nextStep = steps[index + 1]?.type

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>, type: string) {
    e.preventDefault()

    if (type === 'email' && !emailRegexp.test(content)) {
      alert('Please enter a valid email address. E.g. example@example.com')
      return
    }
    if (type !== 'password') {
      setCurrentStep(nextStep)
      document.getElementById(nextStep)?.focus()
    }
    return
  }

  return (
    <div
      className={clsx(styles.step, type === currentStep && styles.step__active)}
    >
      <div className={styles.step__content}>
        <div className={styles.step__contentContainer}>
          <label htmlFor={type}>{type}</label>
          <input
            type={type === 'name' ? 'text' : type}
            id={type}
            name={type}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Enter your ${type}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && content.length > 0)
                handleKeyPress(e, type)
            }}
            required
          />
        </div>
        {type === 'password' && (
          <div className={styles.step__contentContainer}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
          </div>
        )}
      </div>

      <div
        className={clsx(
          styles.buttonContainer,
          index === 0 && styles.firstStep
        )}
      >
        {buttons.map((button) => {
          function handleClick() {
            if (button === 'back') setCurrentStep(previousStep)
            if (button === 'next') {
              if (type === 'email' && !emailRegexp.test(content)) {
                alert(
                  'Please enter a valid email address. E.g. example@example.com'
                )
                return
              }

              setCurrentStep(nextStep)
              document.getElementById(nextStep)?.focus()
            }
          }
          return (
            <button
              key={button}
              type={button !== 'register' ? 'button' : 'submit'}
              onClick={handleClick}
              disabled={button === 'next' && !hasContent}
            >
              {button}
            </button>
          )
        })}
      </div>
    </div>
  )
}
