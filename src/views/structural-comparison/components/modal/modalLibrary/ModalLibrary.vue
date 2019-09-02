<template>
  <div>
    <Modal
      :class="styles.modal"
      :mask-closable="false"
      v-model="allData.modalState"
      width="800"
      footer-hide
      @on-visible-change="init"
    >
      <p slot="header" style="text-align:center">
        <span>整库对比</span>
      </p>
      <div style="text-align:center">
        <Input
          type="text"
          v-model="owner"
          placeholder="请输入库名"
          style="width:500px;display:block;margin:auto"
        />
        <!-- 对比 -->
        <Button
          type="primary"
          @click="contrast"
          :loading="contrastBtnState"
          :disabled="owner.length > 0 ? false : true"
          style="text-again:center;margin:10px"
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
import ModalResult from '../modalResult/ModalResult'
import styles from './modalLibrary.module.less'

export default {
  name: 'modal-result-page',
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
      owner: '',
      // owner: 'WAREHOUSE',
      contrastBtnState: false,
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
        this.owner = ''
        this.contrastBtnState = false
      }
    },
    /**
     * 点击对比按钮
     * @todo 点击对比按钮，进行对比
     */
    async contrast () {
      this.contrastBtnState = true
      try {
        let Res = await api.getContrast.connect({
          param: [{ owner: this.owner }]
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
    }
  },
  computed: {
    styles () {
      return styles
    }
  }
}
</script>
