<template>
  <div>
    <el-menu mode="horizontal" :router="true">
      <el-menu-item index="1" style="pointer-events:none;">
        Nuxt Diary App
      </el-menu-item>
      <el-menu-item index="2" :route="{ path: '/posts/' }">
        投稿一覧
      </el-menu-item>

      <el-menu-item index="4" style="float: right" :route="{ path: '/' }">
        <span>ログイン</span>
      </el-menu-item>
      <el-menu-item
        index="5"
        style="float: right"
        :route="{ path: '/posts/new' }"
      >
        新規投稿
      </el-menu-item>
      <el-menu-item index="6" style="float: right">
        {{ currentUser.user.value.id }}
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
const currentUser = userState();
</script>
