// Components
import { VFadeTransition } from '../transitions'
// import VExpansionPanel from './VExpansionPanel'
// import VIcon from '../VIcon'

// Mixins
// import Colorable from '../../mixins/colorable'
// import { inject as RegistrableInject } from '../../mixins/registrable'

// Directives
import ripple from '../../directives/ripple'
import { defineComponent, inject, ref } from 'vue'
import { VIcon } from '@/components'
import { VExpansionPanelSymbol } from './VExpansionPanels'
import { useBackgroundColor } from '@/composables/color'

// Utilities
// import { getSlot } from '../../util/helpers'
// import mixins, { ExtractVue } from '../../util/mixins'

// Types
// import Vue, { VNode, VueConstructor } from 'vue'

// const baseMixins = mixins(
//   Colorable,
//   RegistrableInject<'expansionPanel', VueConstructor<Vue>>('expansionPanel', 'v-expansion-panel-header', 'v-expansion-panel')
// )

// interface options extends ExtractVue<typeof baseMixins> {
//   $el: HTMLElement
//   expansionPanel: InstanceType<typeof VExpansionPanel>
// }

export default defineComponent({
  name: 'VExpansionPanelHeader',

  directives: { ripple },

  props: {
    disableIconRotate: Boolean,
    expandIcon: {
      type: String,
      default: '$expand',
    },
    hideActions: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: false,
    },
    color: String,
  },

  // data: () => ({
  //   hasMousedown: false,
  // }),

  // computed: {
  //   classes (): object {
  //     return {
  //       'v-expansion-panel-header--active': this.isActive,
  //       'v-expansion-panel-header--mousedown': this.hasMousedown,
  //     }
  //   },
  //   isActive (): boolean {
  //     return this.expansionPanel.isActive
  //   },
  //   isDisabled (): boolean {
  //     return this.expansionPanel.isDisabled
  //   },
  //   isReadonly (): boolean {
  //     return this.expansionPanel.isReadonly
  //   },
  // },

  // created () {
  //   this.expansionPanel.registerHeader(this)
  // },

  // beforeDestroy () {
  //   this.expansionPanel.unregisterHeader()
  // },

  // methods: {
  //   onClick (e: MouseEvent) {
  //     this.$emit('click', e)
  //   },
  //   genIcon () {
  //     const icon = getSlot(this, 'actions') ||
  //       [this.$createElement(VIcon, this.expandIcon)]

  //     return this.$createElement(VFadeTransition, [
  //       this.$createElement('div', {
  //         staticClass: 'v-expansion-panel-header__icon',
  //         class: {
  //           'v-expansion-panel-header__icon--disable-rotate': this.disableIconRotate,
  //         },
  //         directives: [{
  //           name: 'show',
  //           value: !this.isDisabled,
  //         }],
  //       }, icon),
  //     ])
  //   },
  // },

  // render (h): VNode {
  //   return h('button', this.setBackgroundColor(this.color, {
  //     staticClass: 'v-expansion-panel-header',
  //     class: this.classes,
  //     attrs: {
  //       tabindex: this.isDisabled ? -1 : null,
  //       type: 'button',
  //       'aria-expanded': this.isActive,
  //     },
  //     directives: [{
  //       name: 'ripple',
  //       value: this.ripple,
  //     }],
  //     on: {
  //       ...this.$listeners,
  //       click: this.onClick,
  //       mousedown: () => (this.hasMousedown = true),
  //       mouseup: () => (this.hasMousedown = false),
  //     },
  //   }), [
  //     getSlot(this, 'default', { open: this.isActive }, true),
  //     this.hideActions || this.genIcon(),
  //   ])
  // },

  setup (props, { slots }) {
    const hasMousedown = ref(false)
    const expansionPanel = inject(VExpansionPanelSymbol)

    if (!expansionPanel) throw new Error('[Vuetify]: v-expansion-panel-header needs to be placed inside v-expansion-panel')

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    return () => (
      <button
        class={[
          'v-expansion-panel-header',
          {
            'v-expansion-panel-header--active': expansionPanel.isSelected.value,
            'v-expansion-panel-header--mousedown': hasMousedown.value,
          },
          ...backgroundColorClasses.value,
        ]}
        style={backgroundColorStyles.value}
        tabindex={expansionPanel.disabled.value ? -1 : undefined}
        type="button"
        aria-expanded={expansionPanel.isSelected.value}
        v-ripple={props.ripple}
        onClick={expansionPanel.toggle}
        onMousedown={() => hasMousedown.value = true}
        onMouseup={() => hasMousedown.value = false}
      >
        { slots.default?.({ open: expansionPanel.isSelected.value }) }
        { !props.hideActions && (
          <VFadeTransition>
            <div
              class={[
                'v-expansion-panel-header__icon',
                {
                  'v-expansion-panel-header__icon--disable-rotate': props.disableIconRotate,
                },
              ]}
              v-show={!expansionPanel.disabled.value}
            >
              { slots.actions ? slots.actions() : <VIcon icon={props.expandIcon} /> }
            </div>
          </VFadeTransition>
        ) }
      </button>
    )
  },
})
