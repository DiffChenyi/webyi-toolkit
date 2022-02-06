<template>
  <div>
    <el-form :model="fields" :rules="rules" ref="form" label-width="100px">
      <el-form-item
        label="content"
        prop="content"
      >
        <el-input type="textarea" rows="8" v-model="fields.content"></el-input>
      </el-form-item>
      <el-form-item
        label="secret"
        prop="secret"
      >
        <el-input type="text" v-model="fields.secret"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    
    <uploader
                        previewType="json"
                        :types="['application/json']"
                        :file="jsonFile"
                        @change="changeJson"
                    ></uploader>
    <el-row>
      <el-col :span="8" v-for="(item) in lives" :key="item.uid">
        <el-card :body-style="{ padding: '0px' }" @click.native="joinLiveRoom(item)">
          <img :src="item.thumb" class="image" >
          <div style="padding: 14px;">
            <div>人气：{{item.nums}}</div>
            <div>标题：{{item.title || '无'}}</div>
            <div>名称：{{item.user_nicename}}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Uploader from "../../components/uploader.vue"
export default {
  name:"LiveList",
  components:{
    Uploader
  },
  data(){
    return {
      listMock: [
        {
								"uid": "510463",
								"title": "",
								"city": "好像在火星",
								"stream": "510463_1643203183",
								"pull": "rtmp://pull.zhblmg.cn/live/510463_1643203183",
								"thumb": "http://7n.bofadzu.cn/20220126211943_5ad9f565fdc88673c4169ef7ade4318a?imageView2/2/w/600/h/600",
								"isvideo": "0",
								"type": "0",
								"type_val": "0",
								"game_action": "0",
								"goodnum": "0",
								"anyway": "0",
								"nums": "198",
								"is_zhinan": 0,
								"is_vips": 0,
								"avatar": null,
								"avatar_thumb": null,
								"user_nicename": null,
								"sex": null,
								"level": null,
								"level_anchor": null,
								"game": ""
							},
							{
								"uid": "513145",
								"title": "",
								"city": "好像在火星",
								"stream": "513145_1643198202",
								"pull": "rtmp://pull.zhblmg.cn/live/513145_1643198202",
								"thumb": "http://7n.bofadzu.cn/20220122200756_aa3185281a7caed614fe679881ff7c63?imageView2/2/w/600/h/600",
								"isvideo": "0",
								"type": "0",
								"type_val": "0",
								"game_action": "0",
								"goodnum": "0",
								"anyway": "0",
								"nums": "20",
								"is_zhinan": 0,
								"is_vips": 0,
								"avatar": "http://7n.bofadzu.cn/20220122200756_aa3185281a7caed614fe679881ff7c63?imageView2/2/w/600/h/600",
								"avatar_thumb": "http://7n.bofadzu.cn/20220122200756_aa3185281a7caed614fe679881ff7c63?imageView2/2/w/200/h/200",
								"user_nicename": "小凶许",
								"sex": "1",
								"level": "7",
								"level_anchor": "11",
								"game": ""
							},
							{
								"uid": "613643",
								"title": "",
								"city": "好像在火星",
								"stream": "613643_1643202767",
								"pull": "rtmp://pull.zhblmg.cn/live/613643_1643202767",
								"thumb": "http://7n.bofadzu.cn/20220118142655_a66efaf6cc3cb9aa90bf5a90928ac486?imageView2/2/w/600/h/600",
								"isvideo": "0",
								"type": "0",
								"type_val": "0",
								"game_action": "0",
								"goodnum": "0",
								"anyway": "0",
								"nums": "68",
								"is_zhinan": 0,
								"is_vips": 0,
								"avatar": "http://7n.bofadzu.cn/20220118142655_a66efaf6cc3cb9aa90bf5a90928ac486?imageView2/2/w/600/h/600",
								"avatar_thumb": "http://7n.bofadzu.cn/20220118142655_a66efaf6cc3cb9aa90bf5a90928ac486?imageView2/2/w/200/h/200",
								"user_nicename": "小树",
								"sex": "1",
								"level": "6",
								"level_anchor": "7",
								"game": ""
							},
							{
								"uid": "58584",
								"title": "",
								"city": "好像在火星",
								"stream": "58584_1643198577",
								"pull": "rtmp://pull.zhblmg.cn/live/58584_1643198577",
								"thumb": null,
								"isvideo": "0",
								"type": "0",
								"type_val": "0",
								"game_action": "0",
								"goodnum": "0",
								"anyway": "0",
								"nums": "20",
								"is_zhinan": 0,
								"is_vips": 0,
								"avatar": null,
								"avatar_thumb": null,
								"user_nicename": null,
								"sex": null,
								"level": null,
								"level_anchor": null,
								"game": ""
							},
							{
								"uid": "661199",
								"title": "",
								"city": "好像在火星",
								"stream": "661199_1643203762",
								"pull": "rtmp://pull.zhblmg.cn/live/661199_1643203762",
								"thumb": "http://7n.bofadzu.cn/20220126212922_82244c52e54cadb56642b119c1ede828?imageView2/2/w/600/h/600",
								"isvideo": "0",
								"type": "0",
								"type_val": "0",
								"game_action": "0",
								"goodnum": "0",
								"anyway": "0",
								"nums": "36",
								"is_zhinan": 0,
								"is_vips": 0,
								"avatar": "http://7n.bofadzu.cn/20211204162526_3a500443cd495ca21ea0dec8dbd219ee?imageView2/2/w/600/h/600",
								"avatar_thumb": "http://7n.bofadzu.cn/20211204162526_3a500443cd495ca21ea0dec8dbd219ee?imageView2/2/w/200/h/200",
								"user_nicename": "蜀黍",
								"sex": "1",
								"level": "24",
								"level_anchor": "14",
								"game": ""
							}
      ],
      fields:{
        content:"",
        secret:""
      },
      rules: {
        content: [
          {
            required: true,
            message: "content不能为空",
            trigger: "blur",
          },
        ],
        secret: [
          {
            required: true,
            message: "secret不能为空",
            trigger: "blur",
          },
        ],
      },
      lives:[],
      jsonFile:""
    }
  },
  created(){
    window.document.title = '直播列表'
  },
  mounted(){
    // 静态数据
    // this.lives = this.listMock;
  },
  methods:{
    changeJson({file,tempFilePath}){
      console.log(tempFilePath)
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
    submitForm(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message({
            type:'success',
            message:'提交成功生成中...'
          })
        }
      });
    },
    resetForm(){
      this.$refs.resetForm.resetFields();
    },
    joinLiveRoom(item){
      this.$router.push({
        path:`/live/room/${item.stream}?pull=${item.pull}`
      })
    }
  }
}
</script>

<style scoped>
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>