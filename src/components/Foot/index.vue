<template>
    <div class="foot">
        <div class="left">
            <p>© 瑶哩瑶哩玲！</p>
            <a href="https://beian.miit.gov.cn/">浙ICP备2020033154号-2</a>
        </div>
        <div class="friend">
            <h4>友链:</h4>
            <a href="https://yaoliyaoli.com/">
                瑶哩瑶哩玲！
            </a>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>

<style lang="scss" scoped>
.foot {
    width: 100%;
    border-top: var(--border);
    background: var(--h-bg);
    padding: 1rem 2rem;
    box-shadow: var(--box-shadow);
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-small);
    .friend{
        display: flex;
        align-items: center;
        h4{
            font-weight: var(--font-weight-title);
            margin-right: 0.5rem;
        }
    }

    a {
        color: #355dff;
    }
}
</style>