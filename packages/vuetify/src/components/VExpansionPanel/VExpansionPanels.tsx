// Styles
import './VExpansionPanel.sass'

// Types
import type { GroupItemProvide } from '@/composables/group'

// Composables
import { makeTagProps } from '@/composables/tag'
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeThemeProps, useTheme } from '@/composables/theme'

// Utilities
import { computed, InjectionKey } from 'vue'
import { defineComponent } from '@/util'

export const VExpansionPanelSymbol: InjectionKey<GroupItemProvide> = Symbol.for('vuetify:v-expansion-panel')

export default defineComponent({
  name: 'VExpansionPanels',

  props: {
    // accordion: Boolean,
    disabled: Boolean,
    // flat: Boolean,
    // hover: Boolean,
    // focusable: Boolean,
    // inset: Boolean,
    // popout: Boolean,
    readonly: Boolean,
    // tile: Boolean,
    // TODO: Should this be called variant?
    variant: {
      type: String,
      validator: (v: any) => ['accordion', 'inset', 'popout'].includes(v),
    },
    ...makeTagProps(),
    ...makeGroupProps(),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    useGroup(props, VExpansionPanelSymbol)
    const { themeClasses } = useTheme(props)

    const variantClass = computed(() => props.variant && `v-expansion-panels--${props.variant}`)

    return () => (
      <props.tag
        class={[
          'v-expansion-panels',
          {
            // 'v-expansion-panels--accordion': props.accordion,
            // 'v-expansion-panels--flat': props.flat,
            // 'v-expansion-panels--hover': props.hover,
            // 'v-expansion-panels--focusable': props.focusable,
            // 'v-expansion-panels--inset': props.inset,
            // 'v-expansion-panels--popout': props.popout,
            // 'v-expansion-panels--tile': props.tile,
          },
          themeClasses.value,
          variantClass.value,
        ]}
      >
        { slots.default?.() }
      </props.tag>
    )
  },
})
