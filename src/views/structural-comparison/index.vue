<template>
  <div :class="styles.structural_comparison_box">
    <div :class="styles.title">数据库结构对比</div>
    <!-- 表单 -->
    <div :class="styles.form_box">
      <!-- 左 -->
      <div :class="styles.form_left">
        <FormList
          :type="`left`"
          @testSuccess="testSuccess"
          @testErro="testErro"
        />
      </div>
      <!-- 右 -->
      <div :class="styles.form_right">
        <FormList
          :type="`right`"
          @testSuccess="testSuccess"
          @testErro="testErro"
        />
      </div>
    </div>
    <!-- 选择列表 -->
    <div :class="styles.select_box">
      <Button
        type="primary"
        @click="selectTable"
        :disabled="!(this.leftState && this.rightState)"
      >
        库表对比
      </Button>
      <Button
        type="primary"
        @click="selectLibrary"
        :disabled="!(this.leftState && this.rightState)"
        style="margin-left:10px"
      >
        整库对比
      </Button>
    </div>
    <!-- 库表弹窗 -->
    <ModalTable :allData="selectTableData" />
    <!-- 库弹窗 -->
    <ModalLibrary :allData="selectLibraryData" />
  </div>
</template>

<script>
import styles from './index.module.less'
import FormList from './components/formList/FormList'
import ModalTable from './components/modal/modalTable/ModalTable'
import ModalLibrary from './components/modal/modalLibrary/ModalLibrary'

export default {
  name: 'structural_comparison_box',
  components: {
    FormList,
    ModalTable,
    ModalLibrary
  },
  data () {
    return {
      leftState: false, // 左表单是否通过测试状态
      rightState: false, // 右表单是否通过测试状态
      // 库表
      selectTableData: {
        modalState: false,
        data: []
      },
      // 库
      selectLibraryData: {
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
      data.type === 'left' && (this.leftState = true)
      data.type === 'right' && (this.rightState = true)
    },

    /**
     * 重置测试
     * @todo 禁止选择列表按钮
     * @param {string} data - 传入重置了left/right的表单
     */
    testErro (data) {
      data === 'left' && (this.leftState = false)
      data === 'right' && (this.rightState = false)
    },

    /**
     * 选择库表
     * @todo 点击弹出选择库表弹窗
     */
    selectTable () {
      this.selectTableData.modalState = true
    },
    /**
     * 选择库对比
     * @todo 点击弹出选择库弹窗
     */
    selectLibrary () {
      this.selectLibraryData.modalState = true
    }
  },
  computed: {
    styles () {
      return styles
    }
  }
}
</script>
