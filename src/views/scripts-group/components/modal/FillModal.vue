<template>
  <div>
    <Modal
      :title="type === 'add' ? '新增' : '修改'"
      :mask-closable="false"
      v-model="index.fill.modal"
      @on-visible-change="cleanContent"
    >
      <Form ref="formValidate" :model="fromItemData" :label-width="80">
        <template v-for="(item, index) in fromItemData.data">
          <FormItem
            :key="item.key"
            :label="item.label"
            :rules="item.rules"
            :prop="'data.' + index + '.value'"
            v-if="type !== 'add' ? true : item.isHide"
          >
            <Input
              v-if="item.type === 'string'"
              type="text"
              v-model="item.value"
              :placeholder="item.placeholder"
            />
            <template v-if="type === 'edit'">
              <Cascader
                v-if="item.type === 'cascader'"
                change-on-select
                v-model="item.value"
                :data="groupData"
                :disabled="item.disabled"
                :placeholder="item.placeholder"
              ></Cascader>
            </template>
          </FormItem>
        </template>
      </Form>
      <div slot="footer" style="text-align: right">
        <Button @click="cancel" type="primary" ghost>取消</Button>
        <Button
          @click="sure"
          :disabled="addBtnState"
          type="primary"
          style="margin-left: 20px;"
          >确定
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import api from '@/api/scripts-group/index'
import itemData from './itemData'
export default {
  name: 'fill_modal',
  inject: ['index'],
  props: {
    type: {
      type: String
    }
  },
  data () {
    return {
      groupData: [], // 分组
      addBtnState: false, // 确定按钮是否禁用状态
      addFormData: {}, // 提交表单的form数据
      // 渲染表单数据
      fromItemData: {
        data: []
      }
    }
  },
  created () {
    // this.fromItemData.data = JSON.parse(JSON.stringify(itemData))
    // // 修改时整理修改的显示数据
    // if (this.type === 'edit') {
    //   this.getGroupData()
    //   this.collatingEditData(this.fromItemData.data, this.index.clickRow)
    // }
  },
  methods: {
    /**
     * 获取分组数据
     * @todo 获取分组数据
     */
    async getGroupData () {
      let Res = await api.getGroupData.connect()
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
     * 清理
     * @todo 隐藏弹窗时清理数据（填写）和提示内容
     * @param {boolean} state - iview的modal组件的返回参数：显示/隐藏
     */
    cleanContent (state) {
      // 清空 内容 和 提示
      if (!state) {
        this.addBtnState = false
        // this.$refs.formValidate.resetFields()
        // this.fromItemData.data.map(item => {
        //   item.value = ''
        // })
      }
      if (state) {
        this.fromItemData.data = JSON.parse(JSON.stringify(itemData))
        // 修改时整理修改的显示数据
        if (this.type === 'edit') {
          this.getGroupData()
          this.collatingEditData(this.fromItemData.data, this.index.clickRow)
        }
      }
    },
    /**
     * 取消按钮
     * @todo 点击取消按钮，隐藏填写弹窗
     */
    cancel () {
      this.index.fill.modal = false
    },

    /**
     * 确定按钮
     * @todo 点击确定按钮，添加用户
     */
    sure () {
      // 禁用保存按钮（防止多次提交，后面再解禁）
      this.addBtnState = true
      this.$refs.formValidate.validate(valid => {
        if (!valid) {
          this.addBtnState = false
          this.$Message.error('请填写必填项')
          return null
        }
        // 整理新增提交数据
        this.addFormData = this.collatingFormData(this.fromItemData.data)
        this.submit(this.addFormData)
      })
    },

    /**
     * 整理数据
     * @todo 整理提交时的数据
     * @param {array} data - 需要整理的原始数据
     * @return {object} - 返回提交的数据格式
     */
    collatingFormData (data) {
      let obj = {}
      data.map(item => {
        // 赋值
        item.key === 'groupName' && (obj[item.key] = item.value)
        if (this.type === 'edit') {
          item.key === 'groupId' && (obj.parentId = item.value.length > 0 ? item.value[item.value.length - 1] : null)
        }
      })
      // 表格
      if (this.index.addType === 'table') {
        obj.createUserId = this.$store.state.userData.userid
        if (this.type === 'add') {
          obj.parentId = this.index.clickRow.id
        }
        if (this.type === 'edit') {
          obj.id = this.index.clickRow.id
        }
      }
      // 新增
      if (this.index.addType === 'add') {
        obj.parentId = ''
        obj.createUserId = this.$store.state.userData.userid
      }
      return obj
    },

    /**
     * 提交
     * @todo 点击确定按钮，提交数据
     * @param {object} data - 提交的参数
     */
    async submit (data) {
      let Res = await api.addGroup.connect({ data })
      let res = Res.data
      this.addBtnState = false
      if (res.code !== 1) {
        this.$Notice.error({ title: res.msg })
        return false
      }
      this.$Message.success('成功')
      this.index.getGroupData()
      this.index.fill.modal = false
    },
    /**
     * 整理数据
     * @todo 修改时，渲染默认数据
     * @param {array} UI - 渲染的数据源
     * @param {object} data - 选中行的数据
     */
    collatingEditData (UI, data) {
      UI.map(item => {
        (item.key === 'groupName') && (item.value = data[item.key])
        if (item.key === 'groupId') {
          let arr = data.path.split(',').map(Number).filter(d => d)

          item.value = arr.filter(function (ele, idx, arr) {
            return arr.length - 1 !== idx
          })
        }
      })
    }
  },
  watch: {
    // 'index.rowId' (id) {
    //   id &&
    //     this.collatingEditData(
    //       this.fromItemData.data,
    //       this.index.clickRow
    //     )
    // }
  }
}
</script>
