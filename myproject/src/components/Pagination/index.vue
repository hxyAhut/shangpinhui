<template>
  <div class="pagination">
    <button :disabled='pageNo == 1' @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <button v-if="pageNo>3" @click="$emit('getPageNo', 1)" :class="{active: pageNo == 1}">1</button>
    <button v-if="pageNo>4">···</button>

    <!-- 中间连续页 -->
    <button :class="{active: pageNo == page}" v-for="(page,index) in getContinues.endPage" :key="index" v-if="page>getContinues.startPage - 1" @click="$emit('getPageNo', page)">{{page}}</button>
    
    <button v-if="pageNo<pages-3">···</button>
    <button :class="{active: pageNo == pages}" v-if="pageNo<pages-2" @click="$emit('getPageNo', pages)">{{pages}}</button>
    <button :disabled='pageNo == pages' @click="$emit('getPageNo', pageNo + 1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
      pages() {
        return Math.ceil(this.total/this.pageSize);
      },
      getContinues() {
        // 获得连续展示的页数
        // console.log(this)
        let {pageNo, pageSize, total, continues} = this;
        
        // 起始页
        let startPage = pageNo - parseInt(continues/2);
        // 结束页
        let endPage = pageNo + parseInt(continues/2);

        // 判断边界
        if (pageNo < 3) {
          startPage = 1;
          endPage = continues;
        }
        if (pageNo > this.pages-2) {
          endPage = this.pages;
          startPage = this.pages - continues + 1;
        }
        return {startPage, endPage} 
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
    .active {
      color: blue;
    }
  }
</style>
