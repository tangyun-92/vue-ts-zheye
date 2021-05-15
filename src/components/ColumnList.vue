/* 专栏列表组件 */
<template>
  <div>
    <div class="row">
      <div v-for="column in list" :key="column.id" class="col-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body text-center">
            <img
              :src="column.avatar"
              :alt="column.title"
              class="rounded-circle border border-light w-25 my-3"
            />
            <h5 class="card-title">{{ column.title }}</h5>
            <p class="card-text text-start">{{ column.description }}</p>
            <router-link :to="`/column/${column.id}`" class="btn btn-outline-primary">进入专栏</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '../testData'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    // 如果返回的 avatar 存在则显示，否则显示默认图片
    const columnList = computed(() => {
      return props.list.map((column) => {
        if (!column.avatar) {
          column.avatar = require('@/assets/logo.png')
        }
        return column
      })
    })

    return {
      columnList
    }
  }
})
</script>
