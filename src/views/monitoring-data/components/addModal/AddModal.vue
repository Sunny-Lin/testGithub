<template>
  <div>
    <Modal
      :mask-closable="false"
      v-model="index.addModal.modalState"
      footer-hide
      @on-visible-change="init"
    >
      <p slot="header" style="text-align:center">
        <span>新增</span>
      </p>
      <div style="text-align:center">
        <!-- 表单 -->
        <Form ref="formValidate" :model="formData" :label-width="80">
          <FormItem
            v-for="(item, index) in formData.data"
            :key="item.key"
            :label="item.label"
            :rules="item.rules"
            :prop="'data.' + index + '.value'"
          >
            <!-- 输入框 -->
            <Input
              v-if="item.type === 'string'"
              :disabled="item.disabled"
              type="text"
              v-model="item.value"
              :placeholder="item.placeholder"
            />
            <!-- 多行输入框 -->
            <!-- <Input
              v-if="item.type === 'text'"
              :disabled="item.disabled"
              type="textarea"
              v-model="item.value"
              :placeholder="item.placeholder"
            /> -->
            <!-- 级联选择框 -->
            <Cascader
              v-if="item.type === 'cascader'"
              change-on-select
              v-model="item.value"
              :data="groupData"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
            ></Cascader>
          </FormItem>
        </Form>
        <Button
          type="primary"
          @click="add"
          :loading="btnState"
          style="text-again:center;margin-top:10px"
        >
          保存
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import api from '@/api/monitoring-data/index'
import formUI from './formUI'
export default {
  name: 'add-modal',
  inject: ['index'],
  props: {
    groupData: {
      type: Array
    }
  },
  data () {
    return {
      formData: {
        data: []
      },
      btnState: false // 按钮状态
    }
  },
  created () {
    // this.formData.data = JSON.parse(JSON.stringify(formUI))
    // this.collatingEditData(this.formData.data, this.index.clickRow)
  },
  methods: {
    /**
     * 初始化数据
     * @todo 初始化数据，清空表单
     * @param {boolean} state - iview的modal返回的状态，true/false
     */
    init (state) {
      if (state) {
        this.$refs.formValidate.resetFields()
        this.formData.data = JSON.parse(JSON.stringify(formUI))
      }
    },

    /**
     * 保存
     * @todo 保存
     */
    async add () {
      this.$refs.formValidate.validate(async (valid) => {
        if (!valid) {
          this.$Message.error('请填写必选项!')
          return false
        }
        this.btnState = true
        let form = this.collatingFormData(this.formData.data)
        // console.log(form);
        let Res = await api.add.connect(form)
        let res = Res.data
        this.btnState = false
        if (res.code !== 1) {
          this.$Notice.error({ title: res.msg })
          return false
        }
        this.$Notice.success({ title: '保存成功' })
        this.index.addModal.modalState = false
        this.index.getTableData()
      })
    },

    /**
    * 整理数据
    * @todo 整理提交的数据格式
    * @param {object} data - 需要整理的数据
    * @return {object} 返回整理后的数据
    */
    collatingFormData (data) {
      let obj = {
        // markUserId: 1,
        // markUserId: this.$store.state.userData.userid,
        // id: this.index.clickRow.id
      }
      data.map(item => {
        if (item.key === 'groupId') {
          obj.groupId = item.value[item.value.length - 1]
        } else {
          obj[item.key] = item.value
        }
      })
      return obj
    }
  },
  watch: {
    // 'index.markModalState': {
    //   handler (val) {
    //     this.formData.data = JSON.parse(JSON.stringify(formUI))
    //   },
    //   deep: true
    // }
  }
}
</script>
