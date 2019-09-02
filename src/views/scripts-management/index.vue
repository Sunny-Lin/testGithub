<template>
  <div :class="styles.scripts_management_box">
    <template v-if="!fill.modal">
      <div :class="styles.top">
        <div style="width: 500px;">
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
          <Button type="primary" @click="add" style="margin-left:10px;">
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
        >
          <!-- 脚本 -->
          <template slot-scope="{ row }" slot="sqlText">
            <tpc-text-cell :content="row.sqlText" />
          </template>
        </Table>
        <!-- 翻页 -->
        <tpc-info-page
          :total="tableData.total"
          :page-size="tableData.pageSize"
          :current="tableData.page"
          @on-change="tableData.changePage"
          @on-page-size-change="tableData.changeSize"
        ></tpc-info-page>
      </div>
    </template>
    <!-- 填写 -->
    <Fill v-if="fill.modal" :type="type" />
    <!-- 标记弹框 -->
    <MarkModal :groupData="groupData" />
    <!-- 删除提示弹出 -->
    <tpc-single-modal
      type="delete"
      v-model="delModal"
      @delete="del(clickRow.id)"
    ></tpc-single-modal>
  </div>
</template>

<script>
import api from '@/api/scripts-management/index'
import apiGroupData from '@/api/scripts-group/index'
import styles from './index.module.less'
import Fill from './components/fill/Fill'
import MarkModal from './components/markModal/MarkModal'
import Search from './components/search/Search'
import columns from './columns' // 返回表格columns数据
export default {
  name: 'scripts-management',
  provide () {
    return {
      index: this
    }
  },
  components: {
    Fill,
    MarkModal,
    Search
  },
  data () {
    return {
      delModal: false, // 删除提示弹窗
      selectTableIds: '', // 列表选中的id（多选）
      searchData: {
        type: 'search',
        screen: '', // 关键字
        // owner: '', // 拥有者
        // obbjname: '', // 对象名称
        // objtype: '', // 对象类型
        // markUserName: '', // 标记用户
        // event: '', // 事件
        // username: '', // 用户名
        // sqlText: '', // 脚本
        date: [], // 脚本日期
        time: [], // 标记日期
        groupId: [], // 分组
        btnName: '查询'
      },
      markModal: {
        markModalState: false // 标记弹框
      },
      exportModal: false, // 导出弹框
      groupData: [], // 搜索的分组数据
      type: '', // 新增/修改
      clickRow: {}, // 列表操作选中的数据
      fill: {
        modal: false
      },
      deletes: {
        modal: false
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
      let Res = await api.getEventTableData.connect({
        index: this.tableData.page,
        size: this.tableData.pageSize,
        timeFrom: this.searchData.date[0],
        timeTo: this.searchData.date[1],
        updateDateFrom: this.searchData.time[0],
        updateDateTo: this.searchData.time[1],
        groupId: this.searchData.groupId[this.searchData.groupId.length - 1],
        screen: this.searchData.screen
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
      // console.log({
      //   timeFrom: this.searchData.date[0],
      //   timeTo: this.searchData.date[1],
      //   updateDateFrom: this.searchData.time[0],
      //   updateDateTo: this.searchData.time[1],
      //   groupId: this.searchData.groupId[this.searchData.groupId.length - 1],
      //   screen: this.searchData.screen,
      //   idList: this.selectTableIds
      // })
      let Res = await api.getExportData.returnUrl({
        timeFrom: this.searchData.date[0],
        timeTo: this.searchData.date[1],
        updateDateFrom: this.searchData.time[0],
        updateDateTo: this.searchData.time[1],
        groupId: this.searchData.groupId[this.searchData.groupId.length - 1],
        screen: this.searchData.screen,
        idList: this.selectTableIds
      })
      window.open(Res)
    },

    /**
     * 查询
     * @todo 点击查询，查询列表
     * @param {object} data - 查询条件
     */
    searchClick (data) {
      this.tableData.page = 1
      this.selectTableIds = ''
      this.getTableData()
    },

    /**
     * 新增
     * @todo 点击新增按钮，打开填写页面
     */
    add () {
      this.type = 'add'
      this.fill.modal = true
    },

    /**
     * 删除
     * @todo 删除
     * @param {string} id - 删除的id
     */
    async del (id) {
      let data = {
        id
      }
      let Res = await api.addScript.connect({ data })
      let res = Res.data
      if (res.code !== 1) {
        this.$Notice.error({ title: res.msg })
        return false
      }
      this.$Notice.success({ title: '删除成功' })
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
