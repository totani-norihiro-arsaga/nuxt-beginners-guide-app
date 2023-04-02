<template>
  <section>
    <el-card style="flex: 1">
      <div slot="header" class="clearfix">
        <el-input placeholder="タイトルを入力" v-model="formData.title" />
      </div>
      <div>
        <el-input
          placeholder="本文を入力"
          type="textarea"
          row="15"
          v-model="formData.body"
        />
      </div>
      <div class="text-right" style="margin-top: 16px;">
        <el-button type="primary" @click="publish" round>
          <span class="el-icon-upload2"></span>
          <span>Publish</span>
        </el-button>
      </div>
    </el-card>
  </section>
</template>
<script setup lang="ts" >
import {publishPostParams} from "~/types/param";
import moment from "~/plugins/moment";

const user = ref(userState().user.value);
const runtimeConfig = useRuntimeConfig();

if(!user.value.isLoggedIn) {
    navigateTo('/');
}
const formData = ref({
    title: '',
    body: '',
})
const publish = async () => {
  const payload = {
    ...formData.value,
    user: user.value,
    createdAt: moment.now(),
  }
  const {publishPost} = posts();
  await publishPost(payload);
}

</script>
<style>
.posts-page .el-table__row {
    cursor: pointer;
}
</style>