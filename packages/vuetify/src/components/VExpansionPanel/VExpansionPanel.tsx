// Components
// import VExpansionPanels from './VExpansionPanels'
// import VExpansionPanelHeader from './VExpansionPanelHeader'
// import VExpansionPanelContent from './VExpansionPanelContent'

import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { computed, defineComponent, provide } from 'vue'
import { VExpansionPanelSymbol } from './VExpansionPanels'

// Mixins
// import { factory as GroupableFactory } from '../../mixins/groupable'
// import { provide as RegistrableProvide } from '../../mixins/registrable'

// Utilities
// import { getSlot } from '../../util/helpers'
// import mixins from '../../util/mixins'

// Types
// import { VNode } from 'vue'

// type VExpansionPanelHeaderInstance = InstanceType<typeof VExpansionPanelHeader>
// type VExpansionPanelContentInstance = InstanceType<typeof VExpansionPanelContent>

export default defineComponent({
  name: 'VExpansionPanel',

  props: {
    ...makeGroupItemProps(),
    disabled: Boolean,
    readonly: Boolean,
    ...makeRoundedProps(),
    ...makeElevationProps(),
  },

  // data () {
  //   return {
  //     content: null as VExpansionPanelContentInstance | null,
  //     header: null as VExpansionPanelHeaderInstance | null,
  //     nextIsActive: false,
  //   }
  // },

  // computed: {
  //   classes (): object {
  //     return {
  //       'v-expansion-panel--active': this.isActive,
  //       'v-expansion-panel--next-active': this.nextIsActive,
  //       'v-expansion-panel--disabled': this.isDisabled,
  //       ...this.groupClasses,
  //     }
  //   },
  //   isDisabled (): boolean {
  //     return this.expansionPanels.disabled || this.disabled
  //   },
  //   isReadonly (): boolean {
  //     return this.expansionPanels.readonly || this.readonly
  //   },
  // },

  // methods: {
  //   registerContent (vm: VExpansionPanelContentInstance) {
  //     this.content = vm
  //   },
  //   unregisterContent () {
  //     this.content = null
  //   },
  //   registerHeader (vm: VExpansionPanelHeaderInstance) {
  //     this.header = vm
  //     vm.$on('click', this.onClick)
  //   },
  //   unregisterHeader () {
  //     this.header = null
  //   },
  //   onClick (e: MouseEvent) {
  //     if (e.detail) this.header!.$el.blur()

  //     this.$emit('click', e)

  //     this.isReadonly || this.isDisabled || this.toggle()
  //   },
  //   toggle () {
  //     this.$nextTick(() => this.$emit('change'))
  //   },
  // },

  // render (h): VNode {
  //   return h('div', {
  //     staticClass: 'v-expansion-panel',
  //     class: this.classes,
  //     attrs: {
  //       'aria-expanded': String(this.isActive),
  //     },
  //   }, getSlot(this))
  // },

  setup (props, { slots }) {
    const groupItem = useGroupItem(props, VExpansionPanelSymbol)
    const { roundedClasses } = useRounded(props, 'v-expansion-panel')
    const { elevationClasses } = useElevation(props)

    provide(VExpansionPanelSymbol, groupItem)

    const isBeforeSelected = computed(() => {
      const index = groupItem.group.items.value.indexOf(groupItem.id)
      return groupItem.group.selected.value.some(id => groupItem.group.items.value.indexOf(id) - index === 1)
    })

    const isAfterSelected = computed(() => {
      const index = groupItem.group.items.value.indexOf(groupItem.id)
      return groupItem.group.selected.value.some(id => groupItem.group.items.value.indexOf(id) - index === -1)
    })

    return () => (
      <div
        class={[
          'v-expansion-panel',
          {
            'v-expansion-panel--active': groupItem.isSelected.value,
            'v-expansion-panel--before-active': !groupItem.isSelected.value && isBeforeSelected.value,
            'v-expansion-panel--after-active': !groupItem.isSelected.value && isAfterSelected.value,
            'v-expansion-panel--disabled': props.disabled,
            // ...this.groupClasses,
          },
          ...roundedClasses.value,
          ...elevationClasses.value,
        ]}
        aria-expanded={groupItem.isSelected.value}
      >
        { slots.default?.() }
      </div>
    )
  },
})
