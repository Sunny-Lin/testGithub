<template>
  <div>
    <Modal
      :mask-closable="false"
      v-model="index.importData.modalState"
      footer-hide
      @on-visible-change="init"
    >
      <p slot="header" style="text-align:center">
        <span>导入</span>
      </p>
      <div>
        <!-- 表单 -->
        <Form ref="formValidate" :model="formData" :label-width="80">
          <FormItem
            v-for="(item, index) in formData.data"
            :key="item.key"
            :label="item.label"
            :rules="item.rules"
            :prop="'data.' + index + '.value'"
          >
            <Select
              v-if="item.type === 'select'"
              :disabled="item.disabled"
              v-model="item.value"
              :placeholder="item.placeholder"
            >
              <Option v-for="sub in classData" :key="sub.id" :value="sub.id">
                {{ sub.cateName }}
              </Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div style="text-align:center">
        <Button
          type="primary"
          @click="clickImport"
          :loading="btnState"
          style="text-again:center;margin-top:10px"
        >
          导入
        </Button>
        <input
          type="file"
          hidden
          accept=".xls,.xlsx"
          ref="fileBtn"
          @change="handleChange"
        />
      </div>
    </Modal>
  </div>
</template>

<script>
import api from '@/api/synonym-import/index'
import formUI from './formUI'
export default {
  name: 'import-modal',
  inject: ['index'],
  props: {
    classData: {
      type: Array
    }
  },
  data () {
    return {
      formData: {
        data: []
      },
      btnState: false // 标记按钮状态
    }
  },
  created () { },
  methods: {
    /**
     * 初始化数据
     * @todo 初始化数据，清空表单
     * @param {boolean} state - iview的modal返回的状态，true/false
     */
    init (state) {
      if (state) {
        this.$refs.formValidate.resetFields()
        this.formData.data = JSON.parse(JSON.stringify(formUI))
      }
    },

    /**
     * 点击导入
     * @todo 点击导入按钮
     */
    clickImport () {
      this.$refs.formValidate.validate((valid) => {
        if (!valid) {
          this.$Message.error('请填写必选项!')
          return false
        }
        this.$refs.fileBtn.click()
      })
    },

    async handleChange (e) {
      const files = Array.prototype.slice.call(e.target.files)
      const idData = this.collatingFormData(this.formData.data)
      if (!files) {
        return
      }
      let form = new FormData()
      form.append('file', files[0])
      form.append('id', idData.id)
      this.btnState = true
      try {
        let Res = await api.uploadTYCExcel.connect({ data: form })
        let res = Res.data
        this.$refs.fileBtn.value = null
        this.btnState = false
        if (res.returnCode !== 0) {
          this.$Notice.error({ title: res.returnMsg })
          return false
        }
        if (res.resultData === '') {
          this.$Notice.error({ title: '上传失败' })
          return false
        }
        // this.$Notice.success({ title: res.resultData })
        this.$Notice.open({
          render: h => {
            return h('span', {
              style: {
                whiteSpace: `pre-wrap`
              }
            },
            res.resultData
            )
          },
          // desc: res.resultData,
          duration: 0
        })
        this.index.importData.modalState = false
        this.index.getTableData()
      } catch (error) {
        this.btnState = false
      }
    },

    /**
    * 整理数据
    * @todo 整理提交的数据格式
    * @param {object} data - 需要整理的数据
    * @return {object} 返回整理后的数据
    */
    collatingFormData (data) {
      let obj = {}
      data.map(item => {
        obj[item.key] = item.value
      })
      return obj
    }
  },
  watch: {
    // 'index.markModalState': {
    //   handler (val) {
    //     this.formData.data = JSON.parse(JSON.stringify(formUI))
    //   },
    //   deep: true
    // }
  }
}
</script>
