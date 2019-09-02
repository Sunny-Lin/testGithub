<template>
  <div :class="styles.export_records_box">
    <Button type="primary" @click="clickImport">
      导入
    </Button>
    <input
      type="file"
      hidden
      accept=".xls,.xlsx"
      ref="fileBtn"
      @change="handleChange"
    />
    <!-- 上传结果 -->
    <Modal :class="styles.msg_box" v-model="msgModal" title="信息" footer-hide>
      <div :class="styles.msg">{{ msg }}</div>
      <Button type="primary" @click="clickOk">
        确定
      </Button>
    </Modal>
  </div>
</template>

<script>
import styles from './index.module.less'
import api from '@/api/regular-import/index'
export default {
  name: 'regular-import',
  components: {},
  data () {
    return {
      msg: '',
      msgModal: false
    }
  },
  created () { },
  methods: {
    /**
    * 点击导入
    * @todo 点击导入按钮
    */
    clickImport () {
      this.$refs.fileBtn.click()
    },

    async handleChange (e) {
      const files = Array.prototype.slice.call(e.target.files)
      if (!files) {
        return
      }
      let form = new FormData()
      form.append('file', files[0])
      try {
        let Res = await api.uploadAndSaveRegxExcel.connect({ data: form })
        let res = Res.data
        this.$refs.fileBtn.value = null
        if (res.returnCode !== 0) {
          this.$Notice.error({ title: res.returnMsg })
          return false
        }
        if (res.resultData === '') {
          this.$Notice.error({ title: '上传失败' })
          return false
        }
        this.msg = res.resultData
        this.msgModal = true
      } catch (error) { }
    },

    /**
     * 点击确定，隐藏消息弹窗
     * @todo 点击确定，隐藏消息弹窗
     */
    clickOk () {
      this.msgModal = false
    }
  },
  computed: {
    styles () {
      return styles
    }
  }
}
</script>
