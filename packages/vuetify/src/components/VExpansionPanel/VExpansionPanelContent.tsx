// Components
// import VExpansionPanel from './VExpansionPanel'
import { useBackgroundColor } from '@/composables/color'
import { defineComponent, inject } from 'vue'
import { VExpandTransition } from '../transitions'
import { VExpansionPanelSymbol } from './VExpansionPanels'

// Mixins
// import Bootable from '../../mixins/bootable'
// import Colorable from '../../mixins/colorable'
// import { inject as RegistrableInject } from '../../mixins/registrable'

// Utilities
// import { getSlot } from '../../util/helpers'
// import mixins, { ExtractVue } from '../../util/mixins'

// Types
// import Vue, { VNode, VueConstructor } from 'vue'

// const baseMixins = mixins(
//   Bootable,
//   Colorable,
//   RegistrableInject<'expansionPanel', VueConstructor<Vue>>('expansionPanel', 'v-expansion-panel-content', 'v-expansion-panel')
// )

// interface options extends ExtractVue<typeof baseMixins> {
//   expansionPanel: InstanceType<typeof VExpansionPanel>
// }

/* @vue/component */
export default defineComponent({
  name: 'VExpansionPanelContent',

  props: {
    color: String,
  },

  // data: () => ({
  //   isActive: false,
  // }),

  // computed: {
  //   parentIsActive (): boolean {
  //     return this.expansionPanel.isActive
  //   },
  // },

  // watch: {
  //   parentIsActive: {
  //     immediate: true,
  //     handler (val, oldVal) {
  //       if (val) this.isBooted = true

  //       if (oldVal == null) this.isActive = val
  //       else this.$nextTick(() => this.isActive = val)
  //     },
  //   },
  // },

  // created () {
  //   this.expansionPanel.registerContent(this)
  // },

  // beforeDestroy () {
  //   this.expansionPanel.unregisterContent()
  // },

  // render (h): VNode {
  //   return h(VExpandTransition, this.showLazyContent(() => [
  //     h('div', this.setBackgroundColor(this.color, {
  //       staticClass: 'v-expansion-panel-content',
  //       directives: [{
  //         name: 'show',
  //         value: this.isActive,
  //       }],
  //     }), [
  //       h('div', { class: 'v-expansion-panel-content__wrap' }, getSlot(this)),
  //     ]),
  //   ]))
  // },

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
