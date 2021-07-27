// Components
import { VIcon } from '@/components'
import { VExpansionPanelSymbol } from './VExpansionPanels'

// Composables
import { useBackgroundColor } from '@/composables/color'

// Directives
import ripple from '@/directives/ripple'

// Utilities
import { inject } from 'vue'
import { defineComponent } from '@/util'
import { VBtn } from '../VBtn'

export default defineComponent({
  name: 'VExpansionPanelHeader',

  directives: { ripple },

  props: {
    expandIcon: {
      type: String,
      default: '$expand',
    },
    collapseIcon: {
      type: String,
      default: '$collapse',
    },
    hideActions: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: false,
    },
    color: String,
  },

  setup (props, { slots }) {
    const expansionPanel = inject(VExpansionPanelSymbol)

    if (!expansionPanel) throw new Error('[Vuetify]: v-expansion-panel-header needs to be placed inside v-expansion-panel')

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    return () => (
      // <button
      //   class={[
      //     'v-expansion-panel-header',
      //     {
      //       'v-expansion-panel-header--active': expansionPanel.isSelected.value,
      //     },
      //     ...backgroundColorClasses.value,
      //   ]}
      //   style={backgroundColorStyles.value}
      //   tabindex={expansionPanel.disabled.value ? -1 : undefined}
      //   type="button"
      //   aria-expanded={expansionPanel.isSelected.value}
      //   v-ripple={props.ripple}
      //   onClick={expansionPanel.toggle}
      // >
      //   { slots.default?.({
      //     expanded: expansionPanel.isSelected.value,
      //     disabled: expansionPanel.disabled.value,
      //   }) }
      //   { !props.hideActions && (
      //     <div class="v-expansion-panel-header__icon">
      //       {
      //         slots.actions ? slots.actions()
      //         : <VIcon icon={expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon} />
      //       }
      //     </div>
      //   ) }
      // </button>
      <VBtn
        class={[
          'v-expansion-panel-header',
          {
            'v-expansion-panel-header--active': expansionPanel.isSelected.value,
          },
        ]}
        type="button"
        aria-expanded={expansionPanel.isSelected.value}
        color={props.color}
        ripple={props.ripple}
        onClick={expansionPanel.toggle}
        block
        disabled={expansionPanel.disabled.value}
        append-icon={expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon}
        rounded="0"
        elevation="0"
      >
        { slots.default?.({
          expanded: expansionPanel.isSelected.value,
          disabled: expansionPanel.disabled.value,
        }) }
      </VBtn>
    )
  },
})
