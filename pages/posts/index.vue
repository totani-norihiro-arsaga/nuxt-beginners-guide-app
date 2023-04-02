<template>
  <section class="container posts-page">
    <el-card>
      <div class="clearfix" slot="header">
        <span>新規投稿</span>
      </div>
      <el-table :data="showPosts" style="width: 100%" class="table" @row-click="handleClick">
        <el-table-column prop="title" label="タイトル"></el-table-column>
        <el-table-column
          prop="user.id"
          label="投稿者"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="created_at"
          label="投稿日時"
          width="240"
        ></el-table-column>
      </el-table>
    </el-card>
  </section>
</template>
<script setup lang="ts">
import {Post} from "~/types/post";
const Posts = posts();
await Posts.fetchAll();
const showPosts = computed(() => {
  return Posts.get.value;
});
const handleClick = (post: Post) => {
  console.log('ハンドルクリック',post);
  navigateTo(`/posts/details/${post.id}`);
}
</script>
<style>
.posts-page .el-table__row {
    cursor: pointer
}
</style>