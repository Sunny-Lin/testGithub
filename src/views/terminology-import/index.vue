<template>
  <div :class="styles.export_records_box">
    <div :class="styles.top">
      <div style="width: 500px;"></div>
      <div>
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
  </div>
</template>

<script>
import api from '@/api/terminology-import/index'
import styles from './index.module.less'
import columns from './columns' // 返回表格columns数据
export default {
  name: 'terminology-import',
  components: {},
  data () {
    return {
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
  },
  methods: {

    /**
     * 获取表格数据
     * @todo 获取表格数据
     */
    async getTableData () {
      let Res = await api.getTableData.connect({
        page: this.tableData.page,
        size: this.tableData.pageSize,
        type: 1
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
        let Res = await api.uploadAndSaveBloodExcel.connect({ data: form })
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
        this.$Notice.success({ title: res.resultData })
        this.getTableData()
      } catch (error) { }
    },

    /**
     * 下载
     * @todo 点击操作下载按钮
     * @param {namber} id - 下载的id
     */
    async downLoad (id) {
      let Res = await api.downLoadBloodReport.returnUrl({ id })
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
