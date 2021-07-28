import { mount as cyMount } from '@cypress/vue'
import { createVuetify } from '../../src/entry-bundler'
import { mergeDeep } from '../../src/util'

Cypress.Commands.add('mount', (component, options, vuetifyOptions) => {
  const vuetify = createVuetify(vuetifyOptions)
  const defaultOptions = {
    global: {
      plugins: [vuetify],
      stubs: {
        transition: false,
        'transition-group': false,
      },
    },
  }

  return cyMount(component, mergeDeep(defaultOptions, options))
})
