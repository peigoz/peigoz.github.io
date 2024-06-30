import { basic } from './basic'
import { senior } from './senior'
import { engineer } from './engineer'
import { mixture } from './mixture'
import { notes } from './notes'

export const sidebar = {
  ...basic,
  ...senior,
  ...engineer,
  ...mixture,
  ...notes,
}
