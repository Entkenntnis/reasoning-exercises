import clsx from 'clsx'
import Head from 'next/head'
import { useState } from 'react'
import { ExerciseData, exercisesData } from '../data/exercises'

import { Exercise } from './Exercise'

export default function Main() {
  const [activeExercise, setActiveExercise] = useState(-1)
  const [doneExercises, setDoneExercises] = useState<number[]>([])

  if (activeExercise > 0) {
    return (
      <Exercise
        id={activeExercise}
        onClose={(done) => {
          if (done && !doneExercises.includes(activeExercise)) {
            setDoneExercises((val) => [...val, activeExercise])
          }
          setActiveExercise(-1)
        }}
      />
    )
  }

  function renderExercise(exercise: ExerciseData) {
    return (
      <div
        key={exercise.id}
        className={clsx(
          'mx-3 border  rounded p-2 cursor-pointer mt-6',
          doneExercises.includes(exercise.id)
            ? 'border-gray-300'
            : 'border-blue-800 hover:bg-blue-50'
        )}
        onClick={() => {
          setActiveExercise(exercise.id)
        }}
      >
        <h3 className="text-lg">{exercise.title}</h3>
      </div>
    )
  }

  function renderCategory(category: ExerciseData['category']) {
    return (
      <>
        <h2 className="mx-3 mt-10 text-xl font-bold">{category}</h2>
        {exercisesData
          .filter((e) => e.category == category)
          .map((exercise) => renderExercise(exercise))}
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Reasoning Exercises</title>
      </Head>
      <div>
        <div className="max-w-[580px] mx-auto relative mb-6">
          <h1 className="mt-10 mb-4 text-3xl font-bold mx-3">
            Reasoning Exercises
          </h1>
          <p className="mx-3">
            Verständnis-orientierte interaktive Mathematik-Aufgaben
          </p>
          {renderCategory('6. Klasse')}
          {renderCategory('Spaß & Co.')}
        </div>
      </div>
    </>
  )
}
