<template>
  <div :class="styles.modal_table_box">
    <Modal
      :class="styles.modal"
      :mask-closable="false"
      v-model="allData.modalState"
      width="800"
      footer-hide
      @on-visible-change="init"
    >
      <p slot="header" style="text-align:center">
        <span>查询选择库表对比</span>
      </p>
      <div style="text-align:center">
        <!-- 查询 -->
        <div :class="styles.search_box">
          <Input
            v-model="searchData.owner"
            placeholder="请输入库名"
            style="width: 200px"
          />
          <Input
            v-model="searchData.tableName"
            placeholder="请输入表名"
            style="width: 200px;margin:0 10px"
          />
          <Button type="primary" @click="search" :loading="searchBtnState">
            查询
          </Button>
        </div>
        <!-- 列表 -->
        <div :class="styles.content_box">
          <div :class="styles.left_box">
            <!-- <div
              style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;"
            >
              <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll"
                >全选</Checkbox
              >
            </div> -->
            <div :class="styles.content">
              <!-- left多选 -->
              <CheckboxGroup v-model="leftSelect" v-if="!searchBtnState">
                <template v-for="(item, index) in leftData">
                  <Checkbox
                    v-if="!item.isHide"
                    :label="`${item.owner}-${item.tableName}`"
                    :key="`${item.tableName}-${index}`"
                    style="display:block;text-align:left;margin:5px 0;"
                  ></Checkbox>
                </template>
              </CheckboxGroup>
              <div v-else>加载中</div>
            </div>
            <Button
              type="primary"
              @click="add"
              :disabled="leftSelect.length > 0 ? false : true"
              style="margin:10px"
            >
              选择
            </Button>
          </div>
          <div :class="styles.right_box">
            <div :class="styles.content">
              <!-- right多选 -->
              <CheckboxGroup v-model="rightSelect">
                <template v-for="(item, index) in rightData">
                  <Checkbox
                    :label="item"
                    :key="`${item}-${index}`"
                    style="display:block;text-align:left;margin:5px 0;"
                  ></Checkbox>
                </template>
              </CheckboxGroup>
            </div>
            <Button
              type="primary"
              @click="del"
              :disabled="rightSelect.length > 0 ? false : true"
              style="margin:10px"
            >
              删除
            </Button>
          </div>
        </div>
        <!-- 对比 -->
        <Button
          type="primary"
          @click="contrast"
          :loading="contrastBtnState"
          :disabled="rightData.length > 0 ? false : true"
          style="margin:10px"
        >
          对比
        </Button>
      </div>
    </Modal>
    <!-- 结果 -->
    <ModalResult :allData="resultData" />
  </div>
</template>

<script>
import api from '@/api/structural-comparison/index'
import styles from './modalTable.module.less'
import ModalResult from '../modalResult/ModalResult'
export default {
  name: 'modal-table-page',
  components: {
    ModalResult
  },
  props: {
    allData: {
      type: Object
    }
  },
  data () {
    return {
      searchBtnState: false, // 查询按钮loading
      contrastBtnState: false, // 对比按钮loading
      searchData: {
        // owner: 'WAREHOUSE', // 库
        // tableName: 'ADC' // 表
        owner: '', // 库
        tableName: '' // 表
      },
      leftSelect: [], // 左侧选中数据
      leftData: [], // 左侧列表数据
      rightSelect: [], // 右侧选中数据
      rightData: [], // 右侧列表数据
      // 结果数据
      resultData: {
        modalState: false, // 结果弹窗状态
        content: '' // 结果内容
      }
    }
  },
  created () { },
  methods: {
    /**
     * 初始化数据
     * @todo 初始化数据，清空表单
     * @param {boolean} state - iview的modal返回的状态，true/false
     */
    init (state) {
      if (state) {
        this.searchData = {
          owner: '', // 库
          tableName: '' // 表
        }
        this.leftSelect = [] // 左侧选中数据
        this.leftData = [] // 左侧列表数据
        this.rightSelect = [] // 右侧选中数据
        this.rightData = [] // 右侧列表数据
      }
    },
    /**
     * 点击查询按钮，进行列表查询
     * @todo 点击查询按钮，进行列表查询
     */
    async search () {
      this.searchBtnState = true
      // console.log(1);
      try {
        // console.log(2);
        let Res = await api.getListData.connect({
          owner: this.searchData.owner,
          tableName: this.searchData.tableName
        })
        let res = Res.data
        this.testBtnloading = false
        if (res.code !== 1) {
          this.$Notice.error({ title: res.msg })
          return false
        }
        // console.log(res);
        this.searchBtnState = false
        this.leftData = res.data
        this.collatingData()
      } catch (e) {
        // console.log(3);
        this.searchBtnState = false
      }
    },

    /**
    * 整理数据格式
    * @todo 整理数据格式
    */
    collatingData () {
      this.leftData.map(item => {
        item.isHide = false
        this.rightData.map(sub => {
          let data = sub.split('-')
          if (item.owner === data[0] && item.tableName === data[1]) {
            item.isHide = true
          }
        })
      })
    },

    /**
     * 点击选择按钮
     * @todo 点击选择按钮，进行选择
     */
    add () {
      this.rightData.push(...this.leftSelect)
      this.leftSelect = []
      this.collatingData()
    },

    /**
     * 点击删除按钮
     * @todo 点击删除按钮，进行删除
     */
    del () {
      this.rightData = this.rightData.filter(item => (this.rightSelect.indexOf(item) === -1))
      this.rightSelect = []
      this.collatingData()
    },

    /**
     * 点击对比按钮
     * @todo 点击对比按钮，进行对比
     */
    async contrast () {
      this.contrastBtnState = true
      let form = this.collatingContrastData(this.rightData)
      try {
        let Res = await api.getContrast.connect({
          param: form
        })
        let res = Res.data
        this.contrastBtnState = false
        if (res.code !== 1) {
          this.$Notice.error({ title: res.msg })
          return false
        }
        this.resultData.content = res.data.script
        this.resultData.modalState = true
      } catch (e) {
        this.contrastBtnState = false
      }
    },

    /**
    * 整理对比提交的数据格式
    * @todo 整理对比提交的数据格式，返回整理后的数据
    * @param {object} data - 需要整理的数据
    * @return {object} 返回整理后的数据
    */
    collatingContrastData (data) {
      let obj = []
      data.map(item => {
        let arr = item.split('-')
        obj.push({
          owner: arr[0],
          tableName: arr[1]
        })
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
