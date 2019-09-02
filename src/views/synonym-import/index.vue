<template>
  <div :class="styles.synonym_import_box">
    <div :class="styles.top">
      <div style="width: 500px;"></div>
      <div>
        <Button type="primary" @click="clickImport">
          导入
        </Button>
      </div>
    </div>
    <div :class="styles.content">
      <!-- 表格 -->
      <Table
        :columns="tableData.columns"
        :data="tableData.data"
        ref="selection"
      ></Table>
      <!-- 翻页 -->
      <tpc-info-page
        :total="tableData.total"
        :page-size="tableData.pageSize"
        :current="tableData.page"
        @on-change="tableData.changePage"
        @on-page-size-change="tableData.changeSize"
      ></tpc-info-page>
    </div>
    <!-- 导入弹窗 -->
    <ImportModal :classData="importData.classData" />
  </div>
</template>

<script>
import tableApi from '@/api/terminology-import/index'
import api from '@/api/synonym-import/index'
import styles from './index.module.less'
import columns from './columns' // 返回表格columns数据
import ImportModal from './components/importModal/ImportModal'

export default {
  name: 'synonym-import',
  provide () {
    return {
      index: this
    }
  },
  components: {
    ImportModal
  },
  data () {
    return {
      importData: {
        modalState: false, // 导入弹窗状态
        classData: [] // 同义词分类数据
      },
      tableData: {
        total: 0,
        page: 1,
        pageSize: 10,
        data: [],

        /**
         * 翻页
         * @todo 点击翻页切换table数据，并刷新表格数据
         * @param {number} page - 翻转的页数
         */
        changePage: page => {
          this.selectTableIds = ''
          this.tableData.page = page
          this.getTableData()
        },

        /**
         * 显示条数
         * @todo 修改列表每页显示的数据条数，并刷新表格数据
         * @param {number} size - 显示的条数
         */
        changeSize: size => {
          this.selectTableIds = ''
          this.tableData.pageSize = size
          this.getTableData()
        },
        columns: columns(this)
      }
    }
  },
  created () {
    this.getTableData()
    this.getClassData()
  },
  methods: {

    /**
     * 获取表格数据
     * @todo 获取表格数据
     */
    async getTableData () {
      let Res = await tableApi.getTableData.connect({
        page: this.tableData.page,
        size: this.tableData.pageSize,
        type: 2
      })
      let res = Res.data
      if (res.returnCode !== 0) {
        this.$Notice.error({ title: res.returnMsg })
        return false
      }
      this.tableData.data = res.resultData
      this.tableData.total = res.total
    },

    /**
     * 获取同义词分类数据
     * @todo 获取同义词分类数据
     */
    async getClassData () {
      let Res = await api.getClass.connect()
      let res = Res.data
      if (res.returnCode !== 0) {
        this.$Notice.error({ title: res.returnMsg })
        return false
      }
      this.importData.classData = res.resultData
    },

    /**
     * 查询
     * @todo 点击查询，查询列表
     */
    // searchClick () {
    //   this.tableData.page = 1
    //   this.getTableData()
    // },

    /**
     * 点击导入
     * @todo 点击导入按钮
     */
    clickImport () {
      this.importData.modalState = true
    },

    /**
     * 下载
     * @todo 点击操作下载按钮
     * @param {namber} id - 下载的id
     */
    async downLoad (id) {
      let Res = await tableApi.downLoadBloodReport.returnUrl({ id })
      window.open(Res)
    }

  },
  computed: {
    styles () {
      return styles
    }
  }
}
</script>
