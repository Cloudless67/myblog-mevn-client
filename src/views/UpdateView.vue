<template>
    <form>
        <div class="mb-2">
            <label for="write-category" class="form-label">Category</label>
            <SelectBox id="write-category" v-model="postData.category" :items="categories" />
        </div>
        <InputForm v-model="postData.title" name="write-title" label="Title" />
        <InputForm v-model="postData.url" name="write-url" label="URL" />
        <div class="row">
            <InputForm
                v-model="postData.thumbnail.url"
                class="col-6 mb-2"
                name="write-thumbnail-url"
                label="Thumbnail URL"
            />
            <InputForm
                v-model="postData.thumbnail.aspectRatio"
                class="col-6 mb-2"
                name="write-thumbnail-ratio"
                label="Aspect Ratio"
                type="number"
            />
        </div>
        <div class="align-items-start mb-2">
            <label for="write-url" class="form-label">Body</label>
            <textarea
                id="write-body"
                v-model="postData.body"
                class="form-control"
                rows="10"
            ></textarea>
        </div>
        <InputForm v-model="postData.tags" name="write-tags" label="Tags" />
        <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary" @click.prevent="submit">수정</button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SelectBox from '@/components/forms/SelectBox.vue';
import InputForm from '@/components/forms/InputForm.vue';
import { putPost } from '@/lib/httpClient';
import isError from '@/types/error';
import { PutPostData } from '@/types/post';

export default defineComponent({
    name: 'UpdateRoute',
    components: { SelectBox, InputForm },
    data() {
        return {
            categories: [] as string[],
            postData: {
                category: '',
                title: '',
                url: '',
                thumbnail: { url: '', aspectRatio: 0 },
                body: '',
                tags: '',
            } as unknown,
        };
    },
    created() {
        this.categories = this.$store.state.categories;
        const post = this.$store.state.lastPost;
        if (post) {
            if (post.thumbnail?.url) {
                this.postData = { ...post, tags: post.tags.join(',') };
            } else {
                this.postData = {
                    ...post,
                    thumbnail: { url: post.thumbnail || '', aspectRatio: 0 },
                    tags: post.tags.join(','),
                };
            }
        }
    },
    methods: {
        async submit() {
            try {
                const body = this.postData as PutPostData;
                const { url } = await putPost(this.$route.params.slug as string, {
                    ...body,
                    thumbnail: body.thumbnail?.url ? body.thumbnail : undefined,
                });

                this.$router.push({ path: `/post/${encodeURI(url)}` });
            } catch (error) {
                if (isError(error)) alert(error.message);
            }
        },
    },
});
</script>
