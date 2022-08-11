<template>
    <div class="auth">
        <h1 class="auth__title auth-title title">{{ $t('lobby.auth_title') }}</h1>

        <LobbyForm @form-response="formResponseHandler"/>

        <Notification
            :show-notice="showNoticeToggle"
            :notice-message="noticeMessage"
            class="auth__notification"
        />
    </div>
</template>

<script>
    import LobbyForm from './LobbyForm';
    import { setToken } from 'Api/LocalStorage'
    import { mapActions } from "vuex";

    export default {
        name: 'Auth',

        components: { LobbyForm },

        data() {
            return {
                noticeMessage: '',
            }
        },

        computed: {
            showNoticeToggle() {
              return !!this.noticeMessage;
            },
        },

        methods: {
            ...mapActions(['auth']),

            formResponseHandler(res) {
                if (!res) {
                    this.noticeMessage = '';
                    return;
                }

                if (res.result) {
                    setToken(res.result.token);
                    this.auth(res.result);
                    this.$router.push('/');
                } else {
                    this.noticeMessage = res.message;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../Styles/auth';
</style>