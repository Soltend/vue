<template>
    <div class="main__inner">
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </div>
</template>

<script>
    export default {
        name: 'BaseCompany',
    }
</script>