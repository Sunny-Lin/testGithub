<template>
  <div :class="styles.form_list_box">
    <!-- 表单 -->
    <Form ref="formValidate" :model="formData" :label-width="80">
      <FormItem
        v-for="(item, index) in formData.data"
        :key="item.key"
        :label="item.label"
        :rules="item.rules"
        :prop="'data.' + index + '.value'"
      >
        <!-- 输入框 -->
        <Input
          v-if="item.type === 'string'"
          type="text"
          v-model="item.value"
          :disabled="item.key === 'user' ? item.disabled : formData.disabled"
          :placeholder="item.placeholder"
        />
        <!-- 选择框 -->
        <!-- <Select
          v-if="item.type === 'select'"
          :disabled="formData.disabled"
          v-model="item.value"
          :placeholder="item.placeholder"
        >
          <Option v-for="sub in item.data" :value="sub.value" :key="sub.value">
            {{ sub.label }}
          </Option>
        </Select> -->
      </FormItem>
      <div :class="styles.btn_box">
        <Button
          type="primary"
          @click="getTest"
          :disabled="testBtnState"
          :loading="testBtnloading"
        >
          测试
        </Button>
        <Button
          type="primary"
          @click="getReset"
          v-if="testBtnState"
          style="margin-left:10px"
        >
          重置
        </Button>
      </div>
    </Form>
  </div>
</template>

<script>
import api from '@/api/structural-comparison/index'
import formListDataUI from './formListData'
import styles from './formList.module.less'
export default {
  name: 'form-list-page',
  props: {},
  data () {
    return {
      testBtnloading: false, // 测试按钮loading
      testBtnState: false, // 测试按钮状态
      formData: {
        disabled: false,
        data: []
      }
    }
  },
  created () {
    this.formData.data = JSON.parse(JSON.stringify(formListDataUI))
  },
  methods: {
    /**
     * 测试数据
     * @todo 点击测试按钮，测试表单数据
     */
    async getTest () {
      this.$refs.formValidate.validate(async (valid) => {
        if (!valid) {
          this.$Message.error('请填写必选项!')
          return false
        }
        this.testBtnloading = true
        let form = this.collatingFormData(this.formData.data)
        try {
          let Res = await api.getTest.connect(form)
          let res = Res.data
          this.testBtnloading = false
          if (res.code !== 1) {
            this.$Notice.error({ title: res.msg })
            return false
          }
          this.testBtnState = true
          this.formData.disabled = true
          this.$Notice.success({ title: '测试通过' })
          this.$emit('testSuccess', res.data)
        } catch (e) {
          this.testBtnloading = false
        }
      })
    },

    /**
    * 整理提交的数据格式
    * @todo 整理提交的数据格式，返回整理后的数据
    * @param {object} data - 需要整理的数据
    * @return {object} 返回整理后的数据
    */
    collatingFormData (data) {
      let obj = {
        type: 'exp'
      }
      data.map(item => {
        obj[item.key] = item.value
      })
      return obj
    },

    /**
     * 重置
     * @todo 清空表单，解禁测试按钮，同时禁用选择列表按钮
     */
    getReset () {
      this.formData.data = JSON.parse(JSON.stringify(formListDataUI))
      this.formData.disabled = false
      this.testBtnState = false
      this.$emit('testErro')
    }
  },
  computed: {
    styles () {
      return styles
    }
  }
}
</script>
