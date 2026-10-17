import { defineAppSetup } from '@slidev/types'
import { copyDirective } from './copy'

// Registers v-copy for every slide and component (see setup/copy.ts)
export default defineAppSetup(({ app }) => {
  app.directive('copy', copyDirective)
})
