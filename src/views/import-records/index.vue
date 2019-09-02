<template>
  <div :class="styles.export_records_box">
    <div style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 20px">
      <div style="width: 50%">
        <Search style="width: 100%" :data="searchData" @searchClick="searchClick" />
      </div>
      <div>
        <Upload style="display: flex;justify-content: flex-end;align-items: center"
                action="//jsonplaceholder.typicode.com/posts/" :before-upload="handleUpload">
          <Button type="primary">导入</Button>
        </Upload>
      </div>
    </div>
    <div :class="styles.content">
      <!-- 表格 -->
      <Table
        :columns="tableData.columns"
        :data="tableData.data"
        ref="selection"
      ></Table>
      <!-- 翻页 -->
      <tpc-info-page
        :total="tableData.total"
        :page-size="tableData.pageSize"
        :current="tableData.page"
        @on-change="tableData.changePage"
        @on-page-size-change="tableData.changeSize"
      ></tpc-info-page>
    </div>
  </div>
</template>

<script>
import api from '@/api/export-records/index'
import importApi from '@/api/import-records/index'
import styles from './index.module.less'
import Search from './components/search/Search'
import columns from './columns' // 返回表格columns数据
import axios from 'axios';

export default {
  name: 'import-records',
  provide () {
    return {
      index: this
    }
  },
  components: {
    Search
  },
  data () {
    return {
      searchData: {
        version: '', // 版本号
        date: [], // 日期
        oper: '', // 类型
        desc: '' // 描述
      },
      tableData: {
        total: 0,
        page: 1,
        pageSize: 10,
        data: [],

        /**
         * 翻页
         * @todo 点击翻页切换table数据，并刷新表格数据
         * @param {number} page - 翻转的页数
         */
        changePage: page => {
          this.selectTableIds = ''
          this.tableData.page = page
          this.getTableData()
        },

        /**
         * 显示条数
         * @todo 修改列表每页显示的数据条数，并刷新表格数据
         * @param {number} size - 显示的条数
         */
        changeSize: size => {
          this.selectTableIds = ''
          this.tableData.pageSize = size
          this.getTableData()
        },
        columns: columns(this)
      }
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
//上传前
    handleUpload(file) {
      //判断上传文件类型
      let fileType = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();
      if (['zip'].indexOf(fileType) < 0) {
        this.$Notice.warning({
          title: "请上传zip压缩文件"
        });
        return false;
      }
      this.file = file;
      this.upload();
      return false;
    },
    async upload () {
  let form = new FormData()
  form.append('zipFile', this.file)
  try {
    let Res = await importApi.dmpFileUpload.connect({ data: form })
    let res = Res.data
    if (res.msg === '成功') {
      // this.$Notice.success({title: '上传成功'});
      this.file = null;
      this.$Notice.success({
        title: '上传成功',
      });
      this.tableData.page = 1;
      this.getTableData();
    } else {
      this.$Notice.error({
        title: '上传失败',
      });
    }
  } catch (error) {
    this.file = null;
  }
},
    // upload() {
    //   let url = importApi.dmpFileUpload.returnUrl();
    //   let form = new FormData();
    //
    //   form.append('zipFile', this.file);
    //
    //   axios({
    //     url: url.substring(0, url.length - 1),
    //     method: 'post',
    //     data: form,
    //     headers: {'Content-Type': undefined},
    //     withCredentials: true
    //   }).then((response) => {
    //     console.log(response);
    //     if (response.data.msg === '成功') {
    //     // this.$Notice.success({title: '上传成功'});
    //     this.file = null;
    //     this.$Notice.success({
    //       title: '上传成功',
    //     });
    //     this.tableData.page = 1;
    //     this.getTableData();
    //   } else {
    //     this.$Notice.error({
    //       title: '上传失败',
    //     });
    //   }
    // }).catch((error) => {
    //     this.file = null;
    // });
    // },
    /**
     * 获取表格数据
     * @todo 获取表格数据
     */
    async getTableData () {
      let Res = await api.getTableData.connect({
        index: this.tableData.page,
        size: this.tableData.pageSize,
        timeFrom: this.searchData.date[0],
        timeTo: this.searchData.date[1],
        version: this.searchData.version,
        oper: 'import',
        desc: this.searchData.desc
      })
      let res = Res.data
      if (res.code !== 1) {
        this.$Notice.error({ title: res.msg })
        return false
      }
      this.tableData.data = res.data.content
      this.tableData.total = res.data.totalElements
    },

    /**
     * 查询
     * @todo 点击查询，查询列表
     */
    searchClick () {
      this.tableData.page = 1
      this.getTableData()
    }
  },
  computed: {
    styles () {
      return styles
    }
  }
}
</script>
