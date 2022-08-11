<template>
    <main>
        <router-view class="main__wrapper" v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </main>
</template>

<script>
    export default {
        name: 'PersonalMain'
    }
</script>