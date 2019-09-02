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
        <div>表名</div>
        <Input placeholder v-model="data.tableName" />
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
      <div>
        <div>时间</div>
        <DatePicker
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
        <div>描述</div>
        <Input placeholder v-model="data.describe" />
      </div>
      <!-- <div>
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
      </div> -->
    </tpc-search-group>
  </div>
</template>

<script>
export default {
  name: 'search_box2',
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
      this.$emit('searchClick')
    },

    // @todo 点击重置
    reset () {
      this.data.screen = '' // 关键字
      this.data.tableName = '' // 表名
      this.data.groupId = [] // 分组
      this.data.date = [] // 时间
      this.data.describe = '' // 描述
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
