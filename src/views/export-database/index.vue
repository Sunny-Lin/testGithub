<template>
  <div :class="styles.export_database_box">
    <div :class="styles.title">导出数据库结构</div>
    <!-- 表单 -->
    <div :class="styles.form_box">
      <div :class="styles.form">
        <FormList @testSuccess="testSuccess" @testErro="testErro" />
      </div>
    </div>
    <!-- 选择列表 -->
    <div :class="styles.select_box">
      <Button
        type="primary"
        @click="selectExport"
        :disabled="!this.formState"
      >
        导出
      </Button>
    </div>
    <!-- 导出 -->
    <ModalExport :allData="exportData" />
  </div>
</template>

<script>
import styles from './index.module.less'
import FormList from './components/formList/FormList'
import ModalExport from './components/modal/modalExport/ModalExport'

export default {
  name: 'export-database-page',
  components: {
    FormList,
    ModalExport
  },
  data () {
    return {
      formState: false, // 表单是否通过测试状态
      // 导出弹窗数据
      exportData: {
        modalState: false,
        data: []
      }
    }
  },
  created () { },
  methods: {
    /**
     * 测试通过
     * @todo 测试通过，显示选择表按钮
     * @param {object} data - 通过后返回的信息
     */
    testSuccess (data) {
      this.formState = true
    },

    /**
     * 重置测试
     * @todo 禁止选择列表按钮
     * @param {string} data - 传入重置了left/right的表单
     */
    testErro (data) {
      this.formState = false
    },

    /**
     * 导出
     * @todo 点击弹出导出弹窗
     */
    selectExport () {
      this.exportData.modalState = true
    }
  },
  computed: {
    styles () {
      return styles
    }
  }
}
</script>
