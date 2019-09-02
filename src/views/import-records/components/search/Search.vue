<template>
  <div class="search_box">
    <tpc-search-group
      @search="search"
      @reset="reset"
      placeholder="请输入版本"
      search="查询"
      width="100%"
      v-model="data.version"
    >
      <div>
        <div>版本</div>
        <Input placeholder="请输入版本" v-model="data.version" />
      </div>
      <div>
        <div>时间</div>
        <DatePicker
          v-model="data.date"
          format="yyyy-MM-dd"
          type="daterange"
          placement="bottom-start"
          split-panels
          placeholder="请选择时间范围"
          @on-change="selectData"
        ></DatePicker>
      </div>
      <div>
        <div>类型</div>
        <Select v-model="data.oper" placeholder="请选择类型">
          <Option value="import">
            import
          </Option>
          <Option value="export">
            export
          </Option>
        </Select>
      </div>
      <div>
        <div>描述</div>
        <Input placeholder="请输入描述" v-model="data.desc" />
      </div>
    </tpc-search-group>
  </div>
</template>

<script>
export default {
  name: 'search_box',
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {}
  },
  methods: {
    // @todo 点击搜索
    search () {
      this.$emit('searchClick')
    },

    // @todo 点击重置
    reset () {
      this.data.version = '' // 版本
      this.data.date = [] // 日期
      this.data.oper = '' // 类型
      this.data.desc = '' // 描述
    },

    /**
     * 选择日期
     * @todo 选中日期时赋值操作
     * @param {array} data - iview返回的参数，选中的日期（数组）
     */
    selectData (data) {
      this.data.date = data
    }
  }
}
</script>
