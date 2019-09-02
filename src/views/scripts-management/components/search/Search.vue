<template>
  <div class="search_box">
    <tpc-search-group
      @search="search"
      @reset="reset"
      search="查询"
      width="100%"
      v-model="data.screen"
    >
      <div>
        <div>关键字</div>
        <Input placeholder v-model="data.screen" />
      </div>
      <div>
        <div>脚本时间</div>
        <DatePicker
          v-if="data.type === 'search' || data.type === 'export'"
          v-model="data.date"
          format="yyyy-MM-dd"
          type="daterange"
          placement="bottom-start"
          split-panels
          placeholder=""
          @on-change="selectData"
        ></DatePicker>
      </div>
      <div>
        <div>标记时间</div>
        <DatePicker
          v-if="data.type === 'search' || data.type === 'export'"
          v-model="data.time"
          format="yyyy-MM-dd"
          type="daterange"
          placement="bottom-start"
          split-panels
          placeholder=""
          @on-change="selectTime"
        ></DatePicker>
      </div>
      <div>
        <div>分组</div>
        <Cascader
          change-on-select
          :data="groupData"
          v-model="data.groupId"
          placeholder=""
        ></Cascader>
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
    },
    groupData: {
      type: Array
    }
  },
  data () {
    return {
      searchData: {}
    }
  },
  methods: {
    // @todo 点击搜索
    search () {
      this.$emit('searchClick', this.data)
    },

    // @todo 点击重置
    reset () {
      // this.data.owner = '' // 拥有者
      // this.data.obbjname = '' // 对象名称
      // this.data.objtype = '' // 对象类型
      // this.data.markUserName = '' // 标记用户
      // this.data.event = '' // 事件
      // this.data.username = '' // 用户名
      // this.data.sqlText = '' // 脚本
      this.data.screen = '' // 关键字
      this.data.date = [] // 脚本日期
      this.data.time = [] // 标记时间
      this.data.groupId = [] // 分组
    },

    /**
     * 选择日期
     * @todo 选中日期时赋值操作
     * @param {array} data - iview返回的参数，选中的日期（数组）
     */
    selectData (data) {
      this.data.date = data
    },
    /**
     * 选择时间
     * @todo 选中时间时赋值操作
     * @param {array} data - iview返回的参数，选中的时间（数组）
     */
    selectTime (data) {
      this.data.time = data
    }
  }
}
</script>
