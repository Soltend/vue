<template>
    <div
        :class="notificationClass"
        class="notification"
    >
        <p class="notification__label">
            {{ notificationMessage }}
        </p>
    </div>
</template>

<script>
    export default {
        name: 'Notification',

        props: {
            showNotice: {
                type: Boolean,
                required: true,
                default: false,
                validator: value => {
                    return (typeof value === 'boolean');
                }
            },
            noticeMessage: {
                type: String,
                required: true,
                default: '',
                validator: value => {
                    return (typeof value === 'string');
                }
            }
        },

        computed: {
            notificationClass() {
                return {
                    'notification--is-visible': this.showNotice
                }
            },

            notificationMessage() {
                if (!this.noticeMessage) {
                    return;
                }

                const messageId = this.noticeMessage.replace(/\s/g, '_').toLowerCase();
                return this.$t(`notification.${messageId}`);
            },
        }
    }
</script>

<style scoped lang="scss">
    @import './Styles/notification';
</style>