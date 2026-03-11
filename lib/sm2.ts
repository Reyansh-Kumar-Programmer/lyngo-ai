export interface Card {
  easeFactor: number     // default 2.5
  interval: number       // default 1 (days)
  repetitions: number    // default 0
  nextReviewDate: string // ISO date string
}

/**
 * Implementation of the SM-2 spaced repetition algorithm.
 * grade 0–1: reset repetitions to 0, interval to 1
 * grade 2: repeat interval, don't increment repetitions
 * grade 3–5: increment repetitions, calculate new interval
 */
export default function reviewCard(card: Card, grade: 0 | 1 | 2 | 3 | 4 | 5): Card {
  let { easeFactor, interval, repetitions } = card

  if (grade >= 3) {
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetitions++
  } else if (grade === 2) {
    // repeat interval, don't increment repetitions
  } else {
    // grade 0-1
    repetitions = 0
    interval = 1
  }

  // New easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  
  // Clamp easeFactor minimum to 1.3
  if (easeFactor < 1.3) easeFactor = 1.3

  const nextReviewDate = new Date()
  nextReviewDate.setDate(nextReviewDate.getDate() + interval)

  return {
    easeFactor,
    interval,
    repetitions,
    nextReviewDate: nextReviewDate.toISOString(),
  }
}
