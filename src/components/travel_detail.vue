<template>
    <div class="travel_body" ref="body">
        <div class="travel_list" ref="travel">
            <div class="travel_list_item" v-for="(item, index) in imgList" :key="item.id"
                @click="showTravelItem($event, item, index)" :style="{ ...imgListLocation[index] }"
                :class="[item.active ? 'travel_list_item_acitve' : '', item.wideImgType && item.active ? 'travel_list_item_wide' : '']">
                <div class="travel_img">
                    <img class="travel_img_main" :src="item.src" alt="">
                </div>
                <div class="travel_list_body">
                    <div>
                        <h4>金顶</h4>
                        <div class="travel_list_desc">
                            到达武功山最高点了，哎呀这不金顶吗？...
                        </div>
                        <div class="travel_list_opr">
                            <p>
                                <svg class="icon rotate" aria-hidden="true">
                                    <use xlink:href="#icon-time"></use>
                                </svg>
                                <span>2023-5-30</span>
                            </p>
                            <p>
                                <svg class="icon swing" aria-hidden="true">
                                    <use xlink:href="#icon-coffee"></use>
                                </svg>
                                <span>给博主点杯咖啡吧！</span>
                            </p>
                        </div>
                    </div>
                    <!-- <div class="travel_list_joke">
                            <i></i><span>给博主点杯咖啡吧！</span>
                        </div> -->
                    <div class="travel_comment">
                        <div class="travel_comment_tit">
                            一共有x条评论
                        </div>
                        <div class="travel_comment_body">
                            <div class="travel_comment_item">
                                <div class="travel_comment_left">
                                    <img src="../assets/img/head.jpg" alt="">
                                </div>
                                <div class="travel_comment_right">
                                    <h5>落寂的小丑</h5>
                                    <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                                </div>
                            </div>
                            <div class="travel_comment_item">
                                <div class="travel_comment_left">
                                    <img src="../assets/img/head.jpg" alt="">
                                </div>
                                <div class="travel_comment_right">
                                    <h5>落寂的小丑</h5>
                                    <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                                </div>
                            </div>
                            <div class="travel_comment_item">
                                <div class="travel_comment_left">
                                    <img src="../assets/img/head.jpg" alt="">
                                </div>
                                <div class="travel_comment_right">
                                    <h5>落寂的小丑</h5>
                                    <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                                </div>
                            </div>
                            <div class="travel_comment_item">
                                <div class="travel_comment_left">
                                    <img src="../assets/img/head.jpg" alt="">
                                </div>
                                <div class="travel_comment_right">
                                    <h5>落寂的小丑</h5>
                                    <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                                </div>
                            </div>
                            <div class="travel_comment_item">
                                <div class="travel_comment_left">
                                    <img src="../assets/img/head.jpg" alt="">
                                </div>
                                <div class="travel_comment_right">
                                    <h5>落寂的小丑</h5>
                                    <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                                </div>
                            </div>
                            <div class="travel_comment_item">
                                <div class="travel_comment_left">
                                    <img src="../assets/img/head.jpg" alt="">
                                </div>
                                <div class="travel_comment_right">
                                    <h5>落寂的小丑</h5>
                                    <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                                </div>
                            </div>
                            <div class="travel_comment_item">
                                <div class="travel_comment_left">
                                    <img src="../assets/img/head.jpg" alt="">
                                </div>
                                <div class="travel_comment_right">
                                    <h5>落寂的小丑</h5>
                                    <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                                </div>
                            </div>
                        </div>
                        <div class="travel_comment_input">
                            <input type="text" @blur="commentBlur()" @focus="commentFocus()"
                                placeholder="留言还没做好，前端一枚，后端还在琢磨~">
                            <span :class="commentFocusBol ? 'travel_comment_btn' : ''">留言</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="travel_page">
        </div>
    </div>
</template>