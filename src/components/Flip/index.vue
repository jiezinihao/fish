<template>
    <div class="card">
        <div class="content">
            <div class="back">
                <div class="back-content">
                    <slot name="front"></slot>
                </div>
            </div>
            <div class="front">
                <slot name="back"></slot>

            </div>
        </div>
    </div>
</template>

<script type="ts" setup>

</script>

<style lang="scss">
.card {
    --width: 100%;
    overflow: visible;
    width: var(--width);
    height: 12rem;
    margin-bottom: 1rem;
}

.content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    border-radius: var(--radius);
    box-shadow: var(--box-shadow-white);
}

.front,
.back {
    background-color: var(--h-bg);
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: var(--radius);
    overflow: hidden;
    padding: 0.5rem;
}

.back {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
}

.back::before {
    position: absolute;
    content: ' ';
    display: block;
    width: 150%;
    height: 4rem;
    background: linear-gradient(90deg, transparent, hsl(var(--theme-color)), hsl(var(--theme-color)), hsl(var(--theme-color)), hsl(var(--theme-color)), transparent);
    animation: rotation_481 5000ms infinite linear;
}

.back-content {
    position: absolute;
    width: 99%;
    height: 99%;
    background-color: var(--s-bg, rgba(221, 195, 195, 1));
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
}
[theme="dark"] .back-content {
    background-color:var(--h-bg, rgba(221, 195, 195, 1));
}
.card:hover .content {
    transform: rotateY(180deg);
}

@keyframes rotation_481 {
    0% {
        transform: rotateZ(0deg);
    }

    0% {
        transform: rotateZ(360deg);
    }
}

.front {
    transform: rotateY(180deg);
}

.front .front-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.front-content .badge {
    background-color: #00000055;
    padding: 2px 10px;
    border-radius: 10px;
    backdrop-filter: blur(2px);
    width: fit-content;
}

.description {
    box-shadow: 0px 0px 10px 5px #00000088;
    width: 100%;
    padding: 10px;
    background-color: #00000099;
    backdrop-filter: blur(5px);
    border-radius: 5px;
}



#bottom {
    background-color: #ff8866;
    left: 50px;
    top: 0px;
    width: 150px;
    height: 150px;
    animation-delay: -800ms;
}

#right {
    background-color: #ff2233;
    left: 160px;
    top: -80px;
    width: 30px;
    height: 30px;
    animation-delay: -1800ms;
}

@keyframes floating {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(10px);
    }

    100% {
        transform: translateY(0px);
    }
}
</style>