<template>
    <aside class="sidebar">
        <SidebarNavigation class="sidebar__navigation" />
    </aside>
</template>

<script>
    import SidebarNavigation from './PersonalSidebarNavigation';

    export default {
        name: 'PersonalSidebar',

        components: {
            SidebarNavigation
        }
    }
</script>

<style scoped lang="scss">
    @import '../Styles/sidebar';
</style>