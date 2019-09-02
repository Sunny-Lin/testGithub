<template>
  <div :class="styles.modal_table_box">
    <Modal
      :class="styles.modal"
      :mask-closable="false"
      v-model="allData.modalState"
      footer-hide
      @on-visible-change="init"
    >
      <p slot="header" style="text-align:center">
        <span>导出数据库结构</span>
      </p>
      <div style="text-align:center">
        <!-- 表单 -->
        <Form ref="formValidate" :model="allData" :label-width="80">
          <FormItem
            v-for="(item, index) in allData.data"
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
              :disabled="item.disabled"
              :placeholder="item.placeholder"
            />
            <!-- 多行输入框 -->
            <Input
              v-if="item.type === 'text'"
              :disabled="item.disabled"
              type="textarea"
              v-model="item.value"
              :placeholder="item.placeholder"
            />
          </FormItem>
        </Form>
        <!-- 导出 -->
        <Button
          type="primary"
          @click="getExport"
          :loading="exportBtnState"
          style="margin:10px"
        >
          导出
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import api from '@/api/export-database/index'
import styles from './modalExport.module.less'
import formUI from './formListData'

export default {
  name: 'modal-export-page',
  components: {
  },
  props: {
    allData: {
      type: Object
    }
  },
  data () {
    return {
      exportBtnState: false // 导出按钮loading
    }
  },
  created () {
    // this.allData.data = JSON.parse(JSON.stringify(formUI))
  },
  methods: {
    /**
     * 初始化数据
     * @todo 初始化数据，清空表单
     * @param {boolean} state - iview的modal返回的状态，true/false
     */
    init (state) {
      if (state) {
        this.allData.data = JSON.parse(JSON.stringify(formUI))
      }
    },
    /**
     * 点击导出按钮，进行列表导出
     * @todo 点击导出按钮，进行列表导出
     */
    async getExport () {
      this.$refs.formValidate.validate(async (valid) => {
        if (!valid) {
          this.$Message.error('请填写必填项!')
          return false
        }
        this.exportBtnState = true
        let form = this.collatingFormData(this.allData.data)
        let Res = await api.getExport.returnUrl(form)
        window.open(Res)
        this.allData.modalState = false
      })
    },

    /**
    * 整理对比提交的数据格式
    * @todo 整理对比提交的数据格式，返回整理后的数据
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
  computed: {
    styles () {
      return styles
    }
  }
}
</script>
