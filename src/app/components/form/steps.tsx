'use client'

import styles from './steps.module.scss'
import { useState } from 'react'
import clsx from 'clsx'

type Step = 'name' | 'email' | 'password'

export default function Steps() {
  const steps: Step[] = ['name', 'email', 'password']

  const [currentStep, setCurrentStep] = useState<Step>('name')
  const emailRegexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )

  return (
    <>
      {steps.map((step, index) => {
        const [content, setContent] = useState<string>('')
        const hasContent = content.length > 0
        const previousStep: Step = steps[index - 1]
        const nextStep: Step = steps[index + 1]

        return (
          <div
            className={clsx(
              styles.step,
              step === currentStep && styles.step__active
            )}
          >
            <div className={styles.step__content}>
              <label htmlFor={step}>{step}</label>
              <input
                type={step === 'name' ? 'text' : step}
                id={step}
                name={step}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Enter your ${step}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && content.length > 0) {
                    e.preventDefault()

                    if (currentStep === 'email' && !emailRegexp.test(content)) {
                      alert(
                        'Please enter a valid email address. E.g. example@example.com'
                      )
                      return
                    }

                    if (currentStep !== 'password') {
                      setCurrentStep(nextStep)
                      document.getElementById(nextStep)?.focus()
                    }
                  }
                }}
                required
              />
              {step === 'password' && (
                <>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                  />
                </>
              )}
            </div>

            {/* Buttons */}
            <div className={styles.buttonContainer}>
              {step !== 'name' && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(previousStep)}
                  className={styles.button}
                >
                  Back
                </button>
              )}

              {step !== 'password' ? (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(nextStep)
                    document.getElementById(nextStep)?.focus()
                  }}
                  className={styles.button}
                  disabled={!hasContent}
                >
                  Next
                </button>
              ) : (
                <button className={styles.button} type="submit">
                  Register
                </button>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}
