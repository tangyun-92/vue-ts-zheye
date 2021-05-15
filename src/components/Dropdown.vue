/* 下拉组件 */
<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      class="btn btn-outline-light my-2 dropdown-toggle"
      href="#"
      @click.prevent="toggleOpen"
    >
      {{ title }}
    </a>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    // 控制下拉菜单显示隐藏
    const isOpen = ref(false)
    // dropdown的DOM
    const dropdownRef = ref<null | HTMLElement>(null)
    // 下拉菜单点击事件
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    // 点击下拉菜单外面，隐藏下拉菜单
    const isClickOutside = useClickOutside(dropdownRef)
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })

    return {
      isOpen,
      dropdownRef,
      toggleOpen,
      isClickOutside
    }
  }
})
</script>
