import { addDecorator, addParameters, configure } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

addDecorator(withKnobs)

addParameters({
  options: {
    name: '@4react/forms',
    showPanel: true,
    panelPosition: 'right'
  },
  knobs: {
    escapeHTML: false
  }
})

configure(() => {
  require('./stories/_stories.js')
}, module)
