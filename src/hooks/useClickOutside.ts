/* 点击元素外边，隐藏元素 */
import { ref, onMounted, onUnmounted, Ref } from 'vue'

// 接口定义函数的形状
interface useClickOutsideFunc {
  (elementRef: Ref<null | HTMLElement>): Ref<boolean>
}

const useClickOutside: useClickOutsideFunc = (
  elementRef: Ref<null | HTMLElement>
) => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}

export default useClickOutside
