<template>
  <div>
    <video ref='videoQuery' />
  </div>
</template>

<script>
import Video from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-flash';
export default {
  name:"LiveRoom",
  components:{
    
  },
  data() {
    return {

    }
  },
  created(){
    window.document.title = '直播中'
  },
  mounted(){
    // console.log('作为路径的用params接收',this.$route.params.stream)
    // console.log('作为参数的用query接收',this.$route.query.pull)

    const instance = Video(this.$refs.videoQuery, {
        autoplay: true, // 是否自动播放
        controls: true, // 是否显示控件
    })

    instance.src({
        src: this.$route.query.pull,  // rtmp://pull.zhblmg.cn/live/714243_1643207810
        type: 'rtmp/flv',
    })

  }
}
</script>

<style scoped>
</style>