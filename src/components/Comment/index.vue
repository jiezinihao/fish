<template>
    <div class="comment">
        <div class="comment_tit" v-if="commentList.length > 0">
            一共有{{ commentList.length }}条评论
        </div>
        <div class="comment_tit" v-else>
            暂无评论
        </div>
        <!-- <div class="comment_body"> -->
        <el-scrollbar min-height="400px" max-height="400px" class="comment_body" v-if="commentList.length > 0">
            <div class="comment_con" :class="item.cid === commentFrom.cid ? 'comment_item_active' : ''"
                v-for="(item, index) in commentList" :key="index">
                <div class="comment_item">
                    <!-- <div class="comment_left">
                        <img src="../../assets/img/head.jpg" alt="">
                    </div> -->
                    <div class="comment_right">
                        <h5>{{ item.commentName }}</h5>
                        <p>{{ item.commentBody }}</p>
                    </div>
                    <span @click="replyComment(item.cid as string)">{{ isReply ? '取消' : '回复' }}</span>
                </div>
                <div class="acomment_reply comment_item" v-for="itemReply in item.commentBack"
                    :key="itemReply.commentName">
                    <div class="comment_left">
                        <img src="../../assets/img/head.jpg" alt="">
                    </div>
                    <div class="comment_right">
                        <h5>{{ itemReply.commentName }}</h5>
                        <p>{{ itemReply.commentBody }}</p>
                    </div>
                </div>
            </div>

        </el-scrollbar>
        <!-- </div> -->

        <p class="comment_inpput_title" v-if="isReply">回复他：</p>
        <p class="comment_inpput_title" v-else>我来评论一条：</p>

        <div class="comment_input">
            <div class="conment_input_con">
                <input class="input_name" type="text" id="name" placeholder="昵称" v-model="commentFrom.commentName">

                <el-input class="input_body" id="message" v-model="commentFrom.commentBody"
                    :autosize="{ minRows: 1, maxRows: 4 }" type="textarea" @focus="commentFocus()" @blur="commentBlur()"
                    placeholder="想说什么~" />
            </div>
            <span :class="commentFocusBol ? 'comment_btn' : ''" @click="comment()">留言</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { toRefs, ref, shallowRef, computed, watch ,onMounted} from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { CommentUploadGetAPI, CommentGetAPI } from "../../request/api"

const props = defineProps(['commentId','mark'])
const { commentId ,mark} = toRefs(props);
//显示评论
const commentList = shallowRef<CommentItemFrist[]>([]);

//监听commentId变化更新评论
watch(() => commentId?.value, async (newVal) => {
    if (newVal !== 0) {
        getComment()
    }
})

//重置页面数据
const resetData = () => {
    commentFrom.value = {
        commentBody: '',
        commentName: '匿名',
        cid: '',
        id:'',
        mark:mark?.value,
        icon:''
    }
}

const isReply = computed(() => {
    return commentFrom.value.cid === '' ? false : true
})

//上传评论
const commentFrom = ref<CommentUploadGetAPIReq>({
    commentBody: '',
    commentName: '匿名',
    cid: '',
    id:"",
    mark:mark?.value,
    icon:''
})
const commentFocusBol = ref(false);//评论留言点击

const commentBlur = () => {
    commentFocusBol.value = false;
}
const commentFocus = () => {
    commentFocusBol.value = true;
}

//评论按钮
const comment = async (_?: string) => {

    commentFrom.value.id = commentId?.value;
    if (commentFrom.value.commentName === '') {
        ElMessage({
            message: "评论名称不能为空",
            type: 'error',
        })
        return
    } else if (commentFrom.value.commentBody === '') {
        ElMessage({
            message: "评论不能为空",
            type: 'error',
        })
        return
    }
    const result = await CommentUploadGetAPI(commentFrom.value).then(data => data)

    if (result.code !== '0000') {
        ElMessage({
            message: result.msg,
            type: 'error',
        })
    } else {
        ElMessage({
            message: "评论成功",
            type: 'success',
        })
        resetData()
        getComment()
    }

}
//获取评论
const getComment = async () => {
    if (typeof (commentId?.value) === 'undefined') {
        return
    }

    const result = await CommentGetAPI({ id: commentId?.value ,mark:mark?.value}).then(data => data)
    commentList.value = [...result.data]

}
//点击回复
const replyComment = (commentId: string) => {
    if (isReply.value) {
        commentFrom.value.cid = ''
    } else {
        commentFrom.value.cid = commentId
    }
}

onMounted(() => {
    getComment()
})

</script>

<style lang="scss" scoped>
.comment {
    width: 100%;
    margin-top: 20px;

    .comment_tit {
        font-size: 15px;
        margin-bottom: 10px;
        border: var(--border);
        padding: 0.4rem;
    }

    .comment_body {
        border-left: 3px solid hsl(var(--theme-color)/0.4);

        &::-webkit-scrollbar {
            width: 0;
            display: none;
        }

        .comment_con {
            position: relative;

            &.comment_item_active {
                background: hsl(var(--theme-color)/0.1);

                &::after {
                    width: 100%;
                    height: 3px;
                }

                &::before {
                    height: 80%;
                }

                .comment_item span {
                    opacity: 1;
                }
            }

            &:hover {
                background: hsl(var(--theme-color)/0.1);

                &::after {
                    width: 100%;
                    height: 3px;
                }

                &::before {
                    height: 80%;
                }

                .comment_item span {
                    opacity: 1;
                }
            }

            &::after {
                content: "";
                position: absolute;
                right: 10px;
                top: 0;
                width: 0;
                height: 0;
                border-top: 3px solid hsl(var(--theme-color)/0.1);
                transition: .4s ease;
            }

            &::before {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                width: 10px;
                height: 10px;
                transition: .4s ease;
                border-top: 3px solid hsl(var(--theme-color)/0.1);
                border-right: 3px solid hsl(var(--theme-color)/0.1);
                border-radius: 0 4px 0 0;
            }
        }

        .comment_item {
            display: flex;
            // align-items: center;
            padding: 0.2rem 0;
            margin: 0 0.4rem;
            position: relative;

            span {
                margin-right: 10px;
                font-size: 16px;
                font-weight: bold;
                opacity: 0;
                cursor: pointer;
                margin-bottom: 0.2rem;
            }

            .comment_left {
                width: 40px;
                height: 40px;
                margin-top: 0.3rem;
                overflow: hidden;
                border-radius: 50%;
                margin-right: 10px;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }

            .comment_right {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                overflow: hidden;

                h5 {
                    font-size: var(--font-size-normal);
                    line-height: 1rem;
                }

                p {
                    margin: 0;
                    font-size: var(--font-size-small);
                    width: 100%;

                }
            }
        }

        .acomment_reply {
            margin-left: 30px;
            padding: 5px 0;
            transform: scale(0.9);

            &::after {
                content: none;
            }

            &::before {
                content: none;
            }
        }
    }

    .comment_inpput_title {
        margin-top: 40px;
        font-size: 22px;
        font-weight: var(--font-weight-title);
    }

    .comment_input {
        display: flex;
        margin-top: 0.4rem;
        align-items: center;
        position: relative;

        .conment_input_con {
            display: flex;
        }

        .input_name {
            width: 100px;
            border-radius: 0.1rem 0 0 0.1rem;
            color: var(--font-color);
            padding: 10px;
            height: 42px;
        }

        input,
        textarea {
            width: 500px;
            border: var(--border);
            border-radius: 0 0.2rem 0.2rem 0;
            line-height: 20px;
            font-size: 16px;
            resize: none;
            padding: 10px;
            background: none;
            padding-right: 90px;

            &:focus {
                outline: none;
                border: 1px solid hsl(var(--theme-color));
                color: hsl(var(--theme-color));
            }
        }

        span {
            position: relative;
            z-index: 3;
            width: 80px;
            height: 99%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            background: hsl(var(--theme-color)/0.1);
            cursor: pointer;
            opacity: 1;
            transition: 0.2s ease;
            font-size: var(--font-size-normal);
            margin-left: -80px;

            &:hover {
                background: hsl(var(--theme-color)/0.2);
            }
        }

        .comment_btn {
            opacity: 1;
        }
    }
}


</style>
<style lang="scss">
.comment {
    textarea {
        width: 500px;
        border: var(--border);
        border-radius: 0 0.2rem 0.2rem 0;
        line-height: 20px;
        font-size: 16px;
        padding: 10px;
        background: none;
        padding-right: 90px;
        box-shadow: none;

        &:focus {
            outline: none;
            border: 1px solid hsl(var(--theme-color));
            color: hsl(var(--theme-color));
            box-shadow: none;
        }
    }
}
@media (max-width:1200px) {
    .comment {
        .comment_input {
            flex-direction: column;
            align-items: flex-start !important;
            input{
                margin-bottom: 0.4rem;
            }
            .conment_input_con {
                flex-direction: column;
                align-items: flex-start;
                .input_body{
                    textarea{
                        width: 100%;
                    }
                }
            }
            span{
                margin-top: 0.5rem;
                margin-left: 0 !important;
            }
        }
    }

}
</style>