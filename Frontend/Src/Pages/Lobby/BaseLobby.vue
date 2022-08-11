<template>
    <main class="lobby">
        <router-view class="lobby__wrapper" v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </main>
</template>

<script>
    export default {
        name: 'Lobby'
    }
</script>

<style scoped lang="scss">
    @import './Styles/lobby';
</style>