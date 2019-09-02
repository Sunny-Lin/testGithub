<template>
  <div class="contain">
    <div class="add-business">
      <div style="width: 400px;">
        <!-- <Input
          search
          enter-button="查询"
          v-model="searchName"
          placeholder="请输入名称"
          @on-search="getGroupData"
        /> -->
      </div>
      <div>
        <Button style="margin-left: 10px;" type="primary" @click="newAdd"
          >新增</Button
        >
      </div>
    </div>
    <!-- 表格 -->
    <tpc-tree-table
      ref="table"
      sum-text="sum"
      index-text="#"
      :data="tableData.data"
      :columns="tableData.columns"
      :stripe="stripe"
      :border="border"
      :show-header="showHeader"
      :show-summary="showSummary"
      :show-row-hover="showRowHover"
      :show-index="showIndex"
      :tree-type="treeType"
      :is-fold="isFold"
      :expand-type="expandType"
      :selection-type="selectionType"
    >
      <!-- 操作栏 -->
      <template slot="opera" slot-scope="{ row }">
        <TpcTableAction
          :actionList="actionList"
          :params="row"
          @update="update"
          :grow="true"
        ></TpcTableAction>
      </template>
    </tpc-tree-table>
    <!-- 删除提示弹出 -->
    <tpc-single-modal
      type="delete"
      v-model="deletes.modal"
      @delete="deletes.confirmDelete(clickRow.id)"
    ></tpc-single-modal>
    <!-- 添加/修改 用户弹窗 -->
    <FillModal :type="fillType" />
  </div>
</template>

<script>
import api from '@/api/scripts-group/index'
import { TpcTableAction } from 'tp-common'
import FillModal from './components/modal/FillModal'
import columns from './columns'
export default {
  name: 'scripts-group',
  provide () {
    return {
      index: this
    }
  },
  components: {
    FillModal,
    TpcTableAction
  },
  props: {},
  watch: {},
  created () {
    this.getGroupData()
  },
  computed: {},
  methods: {

    /**
     * 获取分组表格数据
     * @todo 获取分组表格数据
     */
    async getGroupData () {
      let Res = await api.getGroupData.connect()
      let res = Res.data
      if (res.code !== 1) {
        this.$Notice.error({ title: res.msg })
        return false
      }
      this.tableData.data = res.data
    },

    /**
     * 新增机构
     * @todo 点击新增机构按钮
     */
    newAdd () {
      this.fillType = 'add'
      this.addType = 'add'
      this.fill.modal = true
    },

    /**
     * 操作栏
     * @todo 点击操作栏事件，执行相关方法
     * @param {string} type - 触发的事件（新增/修改/删除）
     * @param {object} even - 鼠标事件
     * @param {object} data - 所单击当前行的数据
     */
    update ({ type, event, data }) {
      this.clickRow = data
      // 新增
      if (type === 'add') {
        event.stopPropagation()
        this.fillType = 'add'
        this.addType = 'table'
        this.fill.modal = true
      }
      // 修改
      if (type === 'edit') {
        event.stopPropagation()
        this.fillType = 'edit'
        this.addType = 'table'
        this.fill.modal = true
      }
      // 删除
      if (type === 'del') {
        event.stopPropagation()
        this.deletes.modal = true
      }
    }
  },
  data () {
    return {
      addType: '', // add:右上角，table：表格
      fillType: '', // 弹窗的type，add：新增，eidt：修改
      rowId: null, // 修改时选中当前行的id
      actionList: [
        {
          text: '新增子集',
          hType: 'add'
        },
        {
          text: '修改',
          hType: 'edit'
        },
        {
          text: '删除',
          hType: 'del',
          color: '#ed4014'
        }
      ],
      stripe: false,
      border: false,
      showHeader: true,
      showSummary: false,
      showRowHover: true,
      showIndex: false,
      treeType: true,
      isFold: false,
      expandType: false,
      selectionType: false,
      searchName: '', // 顶部查询内容
      selected: [],
      tableData: {
        data: [],
        columns: columns
      },
      deletes: {
        modal: false,

        /**
         * 删除
         * @todo 删除列表操作选中的用户
         * @param {string} ids - 删除的ids（多个逗号隔开）
         */
        confirmDelete: async (ids) => {
          let Res = await api.delGroup.connect({ id: ids })
          let res = Res.data
          if (res.code !== 1) {
            this.$Notice.error({ title: res.data })
            return false
          }
          this.$Notice.success({ title: '删除成功' })
          this.getGroupData()
        }
      },
      clickRow: {}, // 列表操作选中的数据
      fill: {
        modal: false
      }
    }
  }
}
</script>

<style scoped lang='less'>
.contain {
  .add-business {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
