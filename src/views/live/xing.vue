<template>
  <div>
    <el-button class="cover-button">
      <span class="cover-button__text">上传文件</span>
      <!-- 必须要使用原生input，才能获取到file类型的事件回调参数 -->
      <input type="file" ref="uploaderQuery" @change="changeFile" class="cover-button__input" />
    </el-button> 
    <br/>  
    <br/>  
    <el-button type="danger" @click="resetFile" :disabled="!hasFile">重置文件</el-button>

    <el-row>
      <el-col :span="8" v-for="(item) in lives" :key="item.uid">
        <el-card :body-style="{ padding: '0px' }">
            <img class="live-image" :src="item.thumb" @error="listenImageError(item)" v-if="item.thumb">
            <div class="live-image-empty" v-else>封面已失效</div>

            <div class="live-info">
              <div>人气：{{item.nums}}</div>
              <div>标题：{{item.title || '无'}}</div>
              <div>名称：{{item.user_nicename}}</div>
              <el-tag @click.native="changeCopy(item)">复制</el-tag>
            </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:"LiveXing",
  data(){
    return {
      lives:[]
    }
  },
  computed:{
    hasFile(){
      return this.$refs.uploaderQuery && this.$refs.uploaderQuery.value;
    }
  },
  methods:{
    changeFile(e){
      let file = e.target.files[0];
      // let tempFilePath = window.URL.createObjectURL(file);

      const _this = this;
      let reader = new FileReader();
      reader.readAsText(file,"utf-8");
      reader.onload = function(){
          //读取完毕后输出结果
          const fileContent = JSON.parse(this.result)
          if(fileContent.data && fileContent.data.info){
            _this.lives = fileContent.data.info[0].list
          }
      }
    },
    resetFile(){
      if(this.$refs.uploaderQuery.value){
        this.$refs.uploaderQuery.value = null;
      }
    },
    listenImageError(item){
      const _index = this.lives.findIndex((v)=> v.uid === item.uid)
      this.lives[_index].thumb = null
    },
    changeCopy(item){
      console.log(item)
        this.$copyText(item.pull).then(()=>{
          this.$message({
            type:'success',
            message:'复制成功'
          })
        },()=>{
          this.$message({
            type:'error',
            message:'复制失败'
          })
        })
    }
  }
}
</script>

<style scoped>
.cover-button{
  position:relative;
  overflow:hidden;
}
.cover-button__text{
  cursor:pointer;
}
.cover-button__input{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  cursor:pointer;
}
.live-image {
  width: 100%;
  height: 150px;
  display: block;
}
.live-image-empty{
  width: 100%;
  height: 150px;
  line-height: 150px;
  font-size: 13px;
  color: #999;
  background-color:#f4f4f4;
  text-align:center;
}
.live-info{
  padding: 15px;
  height: 120px;
}
</style>