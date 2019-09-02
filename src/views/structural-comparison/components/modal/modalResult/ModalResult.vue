<template>
  <div>
    <Modal
      :mask-closable="false"
      v-model="allData.modalState"
      width="800"
      footer-hide
    >
      <p slot="header" style="text-align:center">
        <span>对比结果</span>
      </p>
      <div style="text-align:center">
        <!-- <Input
          type="textarea"
          v-model="allData.content"
          readonly
          :autosize="{ maxRows: 30, minRows: 5 }"
        /> -->
        <div style="width:100%;max-height:500px;overflow:auto;text-align:left">
          <tpc-sql-formatter
            :input="allData.content"
            ref="sqlFormatter"
          />
        </div>
        <Button
          type="primary"
          @click="allData.modalState = false"
          style="margin:10px"
        >
          关闭
        </Button>
        <Button type="primary" @click="copy" style="margin:10px">
          复制
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>

export default {
  name: 'modal-result-page',
  props: {
    allData: {
      type: Object
    }
  },
  data () {
    return {

    }
  },
  created () { },
  methods: {
    /**
     * 复制
     * @todo 复制
     */
    copy () {
      this.$refs.sqlFormatter.copy()
    }
  },
  computed: {
  }
}
</script>
