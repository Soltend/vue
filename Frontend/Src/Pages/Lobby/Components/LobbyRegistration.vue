<template>
    <div class="auth">
        <h1 class="auth__title auth-title title">{{ $t('lobby.registration') }}</h1>

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
            formResponseHandler(res) {
                if (!res) {
                    this.noticeMessage = '';
                    return;
                }

                this.noticeMessage = res.message;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../Styles/auth';
</style>