<template>
  <div :class="styles.fill_box">
    <Button
      :class="styles.go_back"
      @click="index.fill.modal = false"
      type="primary"
      ghost
      >返回</Button
    >
    <div :class="styles.content">
      <!-- 表单 -->
      <Form ref="formValidate" :model="fromItemData" :label-width="100">
        <template v-for="(item, index) in fromItemData.data">
          <FormItem
            :class="styles.form_item"
            :key="item.key"
            :label="item.label"
            :rules="item.rules"
            :style="formItemStyle(item.span)"
            :prop="'data.' + index + '.value'"
            v-if="type !== 'add' ? true : !item.isHide"
          >
            <!-- 输入框 -->
            <Input
              v-if="item.type === 'string'"
              :disabled="item.disabled"
              type="text"
              v-model="item.value"
              :placeholder="item.placeholder"
            />
            <!-- 选择框 -->
            <Select
              v-if="item.type === 'select'"
              :disabled="item.disabled"
              v-model="item.value"
              :placeholder="item.placeholder"
            >
              <Option
                v-for="sub in item.data"
                :key="sub.value"
                :value="sub.value"
                >{{ sub.display }}</Option
              >
            </Select>
            <!-- 文本域 -->
            <Input
              type="textarea"
              :rows="6"
              v-if="item.type === 'text'"
              :disabled="item.disabled"
              v-model="item.value"
              :placeholder="item.placeholder"
            />
            <!-- 日期 -->
            <DatePicker
              v-if="item.type === 'date'"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              v-model="item.value"
              style="width:100%"
              @on-change="changeDate(item, $event)"
            ></DatePicker>
          </FormItem>
        </template>
      </Form>
      <div :class="styles.btn" v-if="type !== 'look'">
        <Button type="primary" @click="save" :loading="addBtnState">
          保存
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/scripts-management/index'
import styles from './fill.module.less'
import itemData from './itemData'
export default {
  name: 'fill-page',
  inject: ['index'],
  props: {
    type: {
      type: String
    }
  },
  components: {

  },
  data () {
    return {
      addBtnState: false, // 保存按钮的状态
      imgItem: {}, // 选择缩略图项时储存数据
      fromItemData: {
        data: []
      }
    }
  },
  created () {
    this.fromItemData.data = JSON.parse(JSON.stringify(itemData))
    if (this.type === 'edit' || this.type === 'look') {
      this.collatingEditData(this.fromItemData.data, this.index.clickRow)
    }
  },
  mounted () { },
  methods: {
    /**
     * 样式设置
     * @todo 根据sapn设置样式
     * @param {number} span - 表示分割多少块
     * @return {string} 返回样式
     */
    formItemStyle (span) {
      return `width: ${100 / span}%`
    },

    /**
     * 保存
     * @todo 点击保存按钮保存
     */
    save () {
      this.$refs.formValidate.validate(valid => {
        if (!valid) {
          this.addBtnState = false
          this.$Message.error('请填写必填项')
          return null
        }
        this.add(this.collatingFormData(this.fromItemData.data))
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
        status: 1
      }
      data.map(item => {
        !item.isHide && (obj[item.key] = item.value)
      })
      // if (this.type === 'edit') {
      //   obj.id = this.index.clickRow.id
      // }
      return obj
    },

    /**
     * 提交数据
     * @todo 提交新闻数据
     * @param {object} form - 提交的参数数据
     */
    async add (data) {
      this.addBtnState = true
      let Res = await api.addScript.connect({ data })
      let res = Res.data
      if (res.code !== 1) {
        this.$Notice.error({ title: res.msg })
        return false
      }
      this.$Notice.success({ title: '保存成功' })
      this.addBtnState = false
      this.index.fill.modal = false
      this.index.tableData.page = 1
      this.index.getTableData()
    },

    /**
     * 整理数据
     * @todo 修改/查看时，渲染默认数据
     * @param {array} UI - 渲染的数据源
     * @param {object} data - 选中行的数据
     */
    collatingEditData (UI, data) {
      UI.map(item => {
        item.value = data[item.key] ? `${data[item.key]}` : ' '
        if (this.type === 'look') {
          item.disabled = true
          item.rules.required = false
        }
      })
      this.content = data.content
    },

    /**
     * 日期改变时
     * @todo 赋值日期格式
     * @param {object} item - 当前项的对象
     * @param {string} date - 格式化的日期
     */
    changeDate (item, date) {
      item.value = date
    }
  },
  computed: {
    styles () {
      return styles
    }
  },
  watch: {
    // "news.fill.modal"(state) {
    //   console.log(state);
    //   if (state) {
    //     this.fromItemData.data = JSON.parse(JSON.stringify(itemData));
    //     this.collatingEditData(this.fromItemData.data, this.news.clickRow);
    //   }
    // }
  }
}
</script>
