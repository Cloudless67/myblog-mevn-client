<template>
    <section v-if="currentRepliesList" class="replies">
        <h3 class="fw-bold mb-3">Replies</h3>
        <ReplyListItem
            v-for="reply in currentRepliesList"
            :key="reply._id"
            :reply="reply"
            @removed="removeReply"
        />
        <form>
            <div class="input-group">
                <input
                    id="reply-nickname"
                    v-model="replyFormData.nickname"
                    class="col-sm-6 form-control"
                    placeholder="닉네임"
                    type="text"
                />
                <input
                    id="reply-password"
                    v-model="replyFormData.password"
                    class="col-sm-6 form-control"
                    placeholder="password"
                    type="password"
                />
            </div>
            <div class="input-group">
                <textarea
                    id="reply-body"
                    v-model="replyFormData.body"
                    class="form-control"
                    rows="3"
                ></textarea>
                <button class="btn btn-primary" type="submit" @click.prevent="submitReply()">
                    등록
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ReplyListItem from '@/components/post/ReplyListItem.vue';
import { Reply } from '@/types/reply';

export default defineComponent({
    name: 'ReplyList',
    components: { ReplyListItem },
    props: {
        replies: { type: Array as PropType<Reply[]>, required: true },
    },
    data() {
        return {
            replyFormData: {
                nickname: '',
                password: '',
                body: '',
            },
            currentRepliesList: this.replies,
        };
    },
    methods: {
        async submitReply() {
            if (this.replyFormData.nickname === '') {
                alert('닉네임을 입력해주세요.');
                return;
            }

            if (this.replyFormData.password === '') {
                alert('삭제를 위한 패스워드를 입력해주세요.');
                return;
            }

            if (this.replyFormData.body === '') {
                alert('내용을 입력해주세요.');
                return;
            }

            const url = `/api${this.$route.fullPath}/reply`;
            const newReply = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.replyFormData),
            }).then<Reply>((res) => res.json());

            this.resetSubmitForm();
            this.currentRepliesList.push(newReply);
        },
        removeReply(id: string) {
            this.currentRepliesList.splice(
                this.currentRepliesList.findIndex((reply) => reply._id === id),
                1
            );
        },
        resetSubmitForm() {
            this.replyFormData.password = '';
            this.replyFormData.body = '';
        },
    },
});
</script>
