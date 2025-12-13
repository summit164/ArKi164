/* eslint-disable no-plusplus */
import { TypeHelper } from '../types'

type TypeSortHelpersParams = {
  helpers: TypeHelper[]
}

export const sortHelpers = ({ helpers }: TypeSortHelpersParams) => {
  const array = helpers?.map(({ rating, ...helper }) => ({ ...helper, rating: rating ?? 0 }))

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (helpers?.[i]?.rating < array?.[j]?.rating) {
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
    }
  }

  return [...array]
}
