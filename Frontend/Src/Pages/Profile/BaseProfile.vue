<template>
    <div class="page">
        <div class="profile">
            <h1 class="title title--page">
                {{ $t('profile.title') }}
            </h1>

            <ProfileForm @form-response="formResponseHandler" />

            <Notification
                :show-notice="showNoticeToggle"
                :notice-message="noticeMessage"
                class="profile__notification"
            />
        </div>
    </div>
</template>

<script>
    import ProfileForm from './Components/ProfileForm';

    export default {
        name: 'ProfilePage',

        components: { ProfileForm },

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
    @import './Styles/profile';
</style>