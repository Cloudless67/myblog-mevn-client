<template>
    <li class="pb-3 pt-3 border-bottom">
        <RouterLink :to="`/post/${encodeURI(post.url)}`">
            <small class="float-end">조회 {{ post.views }} | 댓글 {{ post.repliesNum }}</small>
            <h4>{{ post.title }}</h4>
            <p class="lh-sm m-0 overflow-hidden">{{ post.preview }}</p>
        </RouterLink>
    </li>
</template>

<script lang="ts">
import { PostPreview } from '@/types/post';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'PostListItem',
    props: {
        post: { type: Object as PropType<PostPreview>, required: true },
    },
});
</script>

<style lang="scss" scoped>
p {
    color: var(--text-light);
}
</style>
