'use client'

import { useState } from 'react'
import Step from './step'

export default function Steps() {
  const steps: Step[] = [
    { type: 'name', index: 0, buttons: ['next'] },
    { type: 'email', index: 1, buttons: ['back', 'next'] },
    { type: 'password', index: 2, buttons: ['back', 'register'] },
  ]
  const [currentStep, setCurrentStep] = useState<string>(steps[0].type)

  return (
    <>
      {steps.map((step, index) => (
        <Step
          key={index}
          step={step}
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ))}
    </>
  )
}
