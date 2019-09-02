<template>
  <div :class="styles.scripts_management_box">
    <div :class="styles.top">
      <div style="width: 500px;">
        <!-- 搜索 -->
        <Search
          :data="searchData"
          :groupData="groupData"
          @searchClick="searchClick"
        />
      </div>
      <div>
        <Button type="primary" @click="getExportData">
          导出
        </Button>
        <Button type="primary" @click="addModal.modalState = true" style="margin-left: 10px">
          新增
        </Button>
      </div>
    </div>
    <div :class="styles.content">
      <!-- 表格 -->
      <Table
        :columns="tableData.columns"
        :data="tableData.data"
        @on-select="selectTable"
        @on-select-cancel="selectTable"
        @on-select-all="selectTable"
        ref="selection"
        @on-select-all-cancel="selectTable"
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
    <!-- 删除提示弹出 -->
    <tpc-single-modal
      type="delete"
      v-model="delModal"
      @delete="del(clickRow.id)"
    ></tpc-single-modal>
    <!-- 标记弹框 -->
    <MarkModal :groupData="groupData" />
    <!-- 新增弹框 -->
    <AddModal :groupData="groupData" />
  </div>
</template>

<script>

import api from '@/api/monitoring-data/index'
import apiGroupData from '@/api/scripts-group/index'
import styles from './index.module.less'
import Search from './components/search/Search'
import MarkModal from './components/markModal/MarkModal'
import AddModal from './components/addModal/AddModal'
import columns from './columns' // 返回表格columns数据
export default {
  name: 'monitoring-data',
  provide () {
    return {
      index: this
    }
  },
  components: {
    Search,
    MarkModal,
    AddModal
  },
  data () {
    return {
      delModal: false, // 删除提示弹窗
      selectTableIds: '', // 列表选中的id（多选）
      searchData: {
        type: 'search',
        screen: '', // 关键字
        tableName: '', // 表名
        groupId: [], // 分组
        date: [], // 时间
        describe: '' // 描述
      },
      exportModal: false, // 导出弹框
      markModal: {
        modalState: false // 标记弹框
      },
      addModal: {
        modalState: false // 新增弹框
      },
      groupData: [], // 搜索的分组数据
      clickRow: {}, // 列表操作选中的数据
      fill: {
        modal: false
      },
      tableData: {
        total: 0,
        page: 1,
        pageSize: 10,
        data: [],
        columns: columns(this),

        /**
         * 翻页
         * @todo 点击翻页切换table数据，并刷新表格数据
         * @param {number} page - 翻转的页数
         */
        changePage: page => {
          this.tableData.page = page
          this.getTableData()
        },

        /**
         * 显示条数
         * @todo 修改列表每页显示的数据条数，并刷新表格数据
         * @param {number} size - 显示的条数
         */
        changeSize: size => {
          this.tableData.pageSize = size
          this.getTableData()
        }
      }
    }
  },
  created () {
    this.getTableData()
    this.getGroupData()
  },
  methods: {
    /**
     * 获取分组数据
     * @todo 获取分组数据
     */
    async getGroupData () {
      let Res = await apiGroupData.getGroupData.connect()
      let res = Res.data
      if (res.code !== 1) {
        this.$Notice.error({ title: res.msg })
        return false
      }
      this.groupData = this.collatingData(res.data)
    },

    /**
     * 整理分组数据
     * @todo 整理成级联数据格式
     * @param {array} data - 需要整理的数据（原始数据）
     * @return {array} 整理好的数据
     */
    collatingData (data) {
      return data.map(item => {
        item.value = item.id
        item.label = item.groupName
        if (item.children.length > 0) {
          this.collatingData(item.children)
        }
        return item
      })
    },

    /**
     * 获取表格数据
     * @todo 获取表格数据
     */
    async getTableData () {
      let Res = await api.getMonitorData.connect({
        index: this.tableData.page,
        size: this.tableData.pageSize,
        screen: this.searchData.screen,
        tableName: this.searchData.tableName,
        groupId: this.searchData.groupId[this.searchData.groupId.length - 1],
        timeFrom: this.searchData.date[0],
        timeTo: this.searchData.date[1],
        describe: this.searchData.describe
      })
      let res = Res.data
      if (res.code !== 1) {
        this.$Notice.error({ title: res.msg })
        return false
      }
      this.selectTableIds = ''
      this.tableData.data = res.data.content
      this.tableData.total = res.data.totalElements
    },

    /**
     * 选中表格
     * @todo 选中当前行表格
     * @param {object} data - 当前行数据
     */
    selectTable (data) {
      let ids = []
      data.length > 0 && data.map(item => {
        ids.push(item.id)
      })
      this.selectTableIds = ids.join(',')
    },

    /**
     * 导出
     * @todo 导出内容
     */
    async getExportData () {
      let Res = await api.getExportData.returnUrl({
        screen: this.searchData.screen,
        tableName: this.searchData.tableName,
        groupId: this.searchData.groupId[this.searchData.groupId.length - 1],
        timeFrom: this.searchData.date[0],
        timeTo: this.searchData.date[1],
        describe: this.searchData.describe,
        idList: this.selectTableIds
      })
      window.open(Res)
    },

    /**
     * 查询
     * @todo 点击查询，查询列表
     */
    searchClick () {
      this.tableData.page = 1
      this.getTableData()
    },

    /**
     * 删除
     * @todo 删除
     * @param {string} id - 删除的id
     */
    async del (ids) {
      let Res = await api.delMonitor.connect({ id: ids })
      let res = Res.data
      if (res.code !== 1) {
        this.$Notice.error({ title: res.msg })
        return false
      }
      this.$Notice.success({ title: '删除成功' })
      this.tableData.page = 1
      this.getTableData()
    }

    // /**
    //  * 新增
    //  * @todo 点击新增按钮，弹出新增弹窗
    //  */
    // clickAdd() {
    //   this.addModal.markModal = true
    // }
  },
  computed: {
    styles () {
      return styles
    }
  }
}
</script>
