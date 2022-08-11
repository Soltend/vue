<template>
    <div class="personal">
        <Sidebar class="personal__sidebar" />

        <div class="personal__main main">
            <MainWrapper class="main__page" />
        </div>

        <Events class="personal__events" />
    </div>
</template>

<script>
    import Sidebar from './Components/PersonalSidebar';
    import MainWrapper from './Components/PersonalMain';
    import Events from './Components/PersonalEvents'

    export default {
        name: 'Personal',

        components: {
            Sidebar,
            MainWrapper,
            Events
        }
    }
</script>

<style scoped lang="scss">
    @import './Styles/personal';
</style>