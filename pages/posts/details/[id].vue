<template>
  <section class="container posts-page">
    <div style="flex: 1">
      <el-card v-if="post">
        <div slot="header" class="clearfix">
          <h2> {{ post.title }}</h2>
          <small>by {{ post.user.id }}</small>
        </div>
        <p>{{ post.body }}</p>
        <p class="text-right"> {{ post.createdAt | time }} </p>
      </el-card>
      <p>
        <nuxt-link to="/posts">&lt; 投稿一覧へ戻る</nuxt-link>
      </p>
    </div>
  </section>
</template>
<script lang="ts" setup>
  const route = useRoute();
  const Post = posts();
  const {id} = route.params;
  console.log(id);
  typeof id === "string"
      ? await Post.getById(id)
      : await Post.getById(id[0]);
  const post = Post.get.value[0];
</script>