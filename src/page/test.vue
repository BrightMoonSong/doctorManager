<template lang="html">
  <div id="apps">
    <el-upload class="avatar-uploader"
    :action="'/admin/update/avatar/'"
    :show-file-list="false"
    :on-success="uploadImg"
    :limit="1"
    :before-upload="beforeImgUpload">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <button type="button" @click="par('parpar')" name="button">parpar</button>
    <zhe @myevent="add($event)"></zhe>
  </div>
</template>

<script>
import zhe from './test-event';
export default {
  methods: {
    add(e) {
      console.log('add');
      console.log(e);
    },
    par(val) {
      console.log('par');
      this.$emit('parson', val);
    },
    uploadImg(res, file) {
      if (res.status == 1) {
        this.adminInfo.avatar = res.image_path;
      } else {
        this.$message.error('上传图片失败！');
      }
    },
    beforeImgUpload(file) {
      console.log(file);
      const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isRightType && isLt2M;
    }
  },
  components: {
    zhe
  }
};
</script>

<style lang="css">
</style>
