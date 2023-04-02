<template>
  <section class="container">
    <el-card style="flex: 1">
      <div class="clearfix" slot="header">
        <span>ログイン</span>
      </div>
      <form>
        <div class="form-content">
          <span>ユーザーID</span>
          <el-input placeholder="入力しなさい！" v-model="formData.id" />
        </div>
        <div class="form-content">
          <el-checkbox v-model="isCreateMode">アカウントを作成する</el-checkbox>
        </div>
        <div class="text-right">
          <el-button type="primary" @click="handleClickSubmit">
            {{ buttonText }}
          </el-button>
          <NuxtErrorBoundary #error="{ error }">
            <template>
              {{ error }}
            </template>
          </NuxtErrorBoundary>
        </div>
      </form>
    </el-card>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const isCreateMode = ref<boolean>(false);
const formData = ref({
  id: "",
});
let buttonText = computed(() => (isCreateMode.value ? "新規登録" : "ログイン"));
const handleClickSubmit = async () => {
  if (isCreateMode) {
    await register(formData.value.id);
  } else {
    await login(formData.value.id);
  }
};

</script>

<style>
.form-content {
  margin: 16px 0;
}
</style>
