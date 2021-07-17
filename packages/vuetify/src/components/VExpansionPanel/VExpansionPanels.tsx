// Styles
import './VExpansionPanel.sass'

// Components
// import { BaseItemGroup, GroupableInstance } from '../VItemGroup/VItemGroup'
// import VExpansionPanel from './VExpansionPanel'

// Utilities
import type { InjectionKey } from 'vue'
import { defineComponent } from 'vue'
import { makeTagProps } from '@/composables/tag'
import type { GroupItemProvide } from '@/composables/group'
import { makeGroupProps, useGroup } from '@/composables/group'

// Types
// interface VExpansionPanelInstance extends InstanceType<typeof VExpansionPanel> {}

export const VExpansionPanelSymbol: InjectionKey<GroupItemProvide> = Symbol.for('vuetify:v-expansion-panel')

/* @vue/component */
export default defineComponent({
  name: 'VExpansionPanels',

  // provide (): object {
  //   return {
  //     expansionPanels: this,
  //   }
  // },

  props: {
    ...makeTagProps(),
    ...makeGroupProps(),
    accordion: Boolean,
    disabled: Boolean,
    // flat: Boolean,
    hover: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean,
    readonly: Boolean,
    // tile: Boolean,
  },

  // computed: {
  //   classes (): object {
  //     return {
  //       ...BaseItemGroup.options.computed.classes.call(this),
  //       'v-expansion-panels': true,
  //       'v-expansion-panels--accordion': this.accordion,
  //       'v-expansion-panels--flat': this.flat,
  //       'v-expansion-panels--hover': this.hover,
  //       'v-expansion-panels--focusable': this.focusable,
  //       'v-expansion-panels--inset': this.inset,
  //       'v-expansion-panels--popout': this.popout,
  //       'v-expansion-panels--tile': this.tile,
  //     }
  //   },
  // },

  // created () {
  //   /* istanbul ignore next */
  //   if (this.$attrs.hasOwnProperty('expand')) {
  //     breaking('expand', 'multiple', this)
  //   }

  //   /* istanbul ignore next */
  //   if (
  //     Array.isArray(this.value) &&
  //     this.value.length > 0 &&
  //     typeof this.value[0] === 'boolean'
  //   ) {
  //     breaking(':value="[true, false, true]"', ':value="[0, 2]"', this)
  //   }
  // },

  // methods: {
  //   updateItem (item: GroupableInstance & VExpansionPanelInstance, index: number) {
  //     const value = this.getValue(item, index)
  //     const nextValue = this.getValue(item, index + 1)

  //     item.isActive = this.toggleMethod(value)
  //     item.nextIsActive = this.toggleMethod(nextValue)
  //   },
  // },

  setup (props, { slots }) {
    useGroup(props, VExpansionPanelSymbol)

    return () => (
      <props.tag
        class={[
          'v-expansion-panels',
          {
            'v-expansion-panels--accordion': props.accordion,
            // 'v-expansion-panels--flat': props.flat,
            'v-expansion-panels--hover': props.hover,
            'v-expansion-panels--focusable': props.focusable,
            'v-expansion-panels--inset': props.inset,
            'v-expansion-panels--popout': props.popout,
            // 'v-expansion-panels--tile': props.tile,
          },
        ]}
      >
        { slots.default?.() }
      </props.tag>
    )
  },
})
