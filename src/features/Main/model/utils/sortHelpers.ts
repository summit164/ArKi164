/* eslint-disable no-plusplus */
import { TypeHelper } from '../types'

type TypeSortHelpersParams = {
  helpers?: TypeHelper[]
}

export const sortHelpers = ({ helpers }: TypeSortHelpersParams) => {
  const array = [...(helpers ?? [])]

  // Rating is a string in TypeHelper. Sort by numeric value (desc).
  return array.sort((a, b) => {
    const aRating = Number.parseFloat(a.rating) || 0

    const bRating = Number.parseFloat(b.rating) || 0

    return bRating - aRating
  })
}
