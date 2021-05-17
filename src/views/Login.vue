<template>
  <div>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          type="text"
          placeholder="请输入邮箱地址"
          ref="inputRef"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          :rules="passwordRules"
          v-model="passwordVal"
          type="password"
          placeholder="请输入密码"
        ></validate-input>
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { useRouter } from 'vue-router'
import ValidateForm from '@/components/ValidateForm.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'login',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const inputRef = ref()
    const emailVal = ref('tangyun1992@qq.com')
    const passwordVal = ref('a111111')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      { type: 'password', message: '密码长度限制6-20位，且必须包含数字和英文' }
    ]
    const onFormSubmit = (res: boolean) => {
      if (res) {
        const params = {
          name: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('login', params).then(() => {
          router.push(`/`)
        })
      }
    }

    return {
      emailRules,
      passwordRules,
      emailVal,
      passwordVal,
      onFormSubmit,
      inputRef
    }
  }
})
</script>