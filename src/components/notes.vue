<template>
    <div class="notes">
        <div class="notes_lab">
            <div class="notes_lab_item notes_lab_item_active">
                最近
            </div>
            <div class="notes_lab_item">
                HTML&CSS
            </div>
            <div class="notes_lab_item">
                Typescript
            </div>
            <div class="notes_lab_item">
                vue相关
            </div>
            <div class="notes_lab_item">
                THREE相关
            </div>
            <div class="notes_lab_item">
                编程思想
            </div>
        </div>
        <div class="notes_body">
            <div class="notes_list">
                <div class="notes_list_item">
                    <p>js面向对象的创建以及控制</p>
                    <time> 2023-12-26 </time>
                </div>
                <div class="notes_list_item">
                    <p>js面向对象的创建以及控制</p>
                    <time> 2023-12-26 </time>
                </div>
                <div class="notes_list_item">
                    <p>js面向对象的创建以及控制</p>
                    <time> 2023-12-26 </time>
                </div>
                <div class="notes_list_item">
                    <p>js面向对象的创建以及控制</p>
                    <time> 2023-12-26 </time>
                </div>
            </div>
            <div class="notes_page">

            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss">
.notes {
    display: flex;
    width: 100%;
    // border: 5px solid #3c2a4d;
    border-radius: 10px;
    padding: 20px 0;
    height: 100%;

    .notes_lab {
        width: 200px;
        flex-shrink: 0;

        .notes_lab_item {
            height: 50px;
            width: 100%;
            padding: 0 10px 0 20px;
            line-height: 50px;
            position: relative;
            margin-bottom: 20px;
            font-size: 18px;
            cursor: pointer;
            background: linear-gradient(to right, #e0f0ea, #e0f0ea);
            transition: .2s ease;

            &::after {
                content: "";
                position: absolute;
                left: 0;
                width: 10px;
                height: 100%;
                background: #95adbe;
            }

            &:hover {
                padding-left: 30px;
                letter-spacing: 1px;
                background: linear-gradient(to right, #95adbe, #e0f0ea);

                &::after {
                    background: #503a65;
                }
            }

            &.notes_lab_item_active {
                padding-left: 30px;
                letter-spacing: 1px;
                background: linear-gradient(to right, #95adbe, #e0f0ea);

                &::after {
                    background: #503a65;
                }
            }
        }

    }

    .notes_body {
        flex: 1;
        padding-left: 20px;

        .notes_list {
            width: 100%;

            .notes_list_item {
                width: 100%;
                padding: 10px 0;
                margin-bottom: 40px;
                position: relative;
                cursor: pointer;

                p {
                    margin-bottom: 10px;
                    font-size: 18px;
                    color: #333;

                }

                time {
                    font-size: 14px;
                    color: #999;
                }

                &::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 1px;
                    width: 100%;
                    background: #95adbe;
                    z-index: 1;
                }

                &::before {
                    content: "";

                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 1px;
                    width: 0;
                    background: #3c2a4d;
                    z-index: 2;
                    transition: 0.5s ease-in;
                }

                &:hover {
                    &::before {
                        width: 100%;
                    }
                }
            }
        }
    }

}</style>