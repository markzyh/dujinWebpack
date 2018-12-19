<template>
  <div class="upload">
    <form id="auth_idcard_face">
      <label for="upload_idcard_face" v-if="idcardFaceURL == false">上传人像面</label>
      <input
        type="file"
        v-if="idcardFaceURL == false"
        ref="upload_idcard_face"
        id="upload_idcard_face"
        name="path"
        @change="uploadCardFace($event,'upload_idcard_face','idcardFaceURL')"
      >
      <span
        v-if="idcardFaceURL != false"
        class="cancle_upload"
        @click="cancelUpload('idcardFaceURL')"
      >x</span>
      <img :src="idcardFaceURL" alt v-if="idcardFaceURL != false">
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      upload: true,
      fileList: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>
<style lang="scss">
</style>
