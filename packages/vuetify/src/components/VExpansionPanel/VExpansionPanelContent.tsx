// Components
import { VExpandTransition } from '../transitions'
import { VExpansionPanelSymbol } from './VExpansionPanels'

// Composables
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { inject } from 'vue'
import { defineComponent } from '@/util'

export default defineComponent({
  name: 'VExpansionPanelContent',

  props: {
    color: String,
  },

  setup (props, { slots }) {
    const expansionPanel = inject(VExpansionPanelSymbol)

    if (!expansionPanel) throw new Error('[Vuetify]: v-expansion-panel-content needs to be placed inside v-expansion-panel')

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    return () => (
      <VExpandTransition>
        <div
          v-show={expansionPanel.isSelected.value}
          class={[
            'v-expansion-panel-content',
            ...backgroundColorClasses.value,
          ]}
          style={backgroundColorStyles.value}
        >
          <div class="v-expansion-panel-content__wrapper">
            { slots.default?.() }
          </div>
        </div>
      </VExpandTransition>
    )
  },
})
