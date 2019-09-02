<template>
  <div :class="styles.export_records_box">
    <div :class="styles.top">
      <div style="width: 500px;">
        <Search :data="searchData" @searchClick="searchClick" />
      </div>
      <div>
        <!-- <Button type="primary" @click="getExportData">
            导出
          </Button> -->
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
import api from '@/api/export-records/index'
import styles from './index.module.less'
import Search from './components/search/Search'
import columns from './columns' // 返回表格columns数据
export default {
  name: 'export-records',
  provide () {
    return {
      index: this
    }
  },
  components: {
    Search
  },
  data () {
    return {
      searchData: {
        version: '', // 版本号
        date: [], // 日期
        oper: '', // 类型
        desc: '' // 描述
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
  },
  methods: {

    /**
     * 获取表格数据
     * @todo 获取表格数据
     */
    async getTableData () {
      let Res = await api.getTableData.connect({
        index: this.tableData.page,
        size: this.tableData.pageSize,
        timeFrom: this.searchData.date[0],
        timeTo: this.searchData.date[1],
        version: this.searchData.version,
        oper: this.searchData.oper,
        desc: this.searchData.desc
      })
      let res = Res.data
      if (res.code !== 1) {
        this.$Notice.error({ title: res.msg })
        return false
      }
      this.tableData.data = res.data.content
      this.tableData.total = res.data.totalElements
    },

    /**
     * 查询
     * @todo 点击查询，查询列表
     */
    searchClick () {
      this.tableData.page = 1
      this.getTableData()
    }
  },
  computed: {
    styles () {
      return styles
    }
  }
}
</script>
