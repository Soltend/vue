<template>
    <nav class="navigation">
        <router-link
            v-for="(link, name, idx) in navigationList"
            :key="idx"
            :to="link"
            :title="$t(`navigation.${name}`)"
            :class="`navigation__link--${name}`"
            class="navigation__link"
        >
            {{ $t(`navigation.${name}`) }}
        </router-link>

        <button
            @click="logoutHandler()"
            :title="$t('navigation.logout')"
            class="navigation__link navigation__link--logout"
            type="submit"
        >
            {{ $t('navigation.logout') }}
        </button>
    </nav>
</template>

<script>
    import { getNavigationList } from 'Api/Catalogs';
    import { userLogoutRequest } from 'Api/Auth';
    import { removeToken } from 'Api/LocalStorage';
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'SidebarNavigation',

        data() {
            return {
                navigationList: null,
            }
        },

        computed: {
            ...mapState('user', ['currentUser', 'token']),

            user() {
                return {
                    userId: this.currentUser.id,
                    token: this.token
                }
            }
        },

        watch: {
            user({ userId }) {
                if (!userId) {
                    removeToken();
                    this.$router.push('/auth');
                }
            }
        },

        created() {
            this.navigationList = getNavigationList();
        },

        methods: {
            ...mapActions('user', ['logout']),

            async logoutHandler() {
                await userLogoutRequest(this.user).then(res => {
                    if (!res.result) {
                        return;
                    }

                    this.logout();
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../Styles/navigation';
</style>