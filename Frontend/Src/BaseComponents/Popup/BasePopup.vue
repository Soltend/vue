<template>
    <div
        :class="openClass"
        class="popup"
    >
        <p class="popup__text">
            <slot name="text"></slot>
        </p>

        <div class="popup__actions">
            <slot name="actions" :close="close" :confirm="confirm"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Popup',

        data() {
            return {
                isOpen: false,
            }
        },

        computed: {
            openClass() {
                return {'popup--is-visible': this.isOpen}
            }
        },

        methods: {
            open() {
                let resolve;
                const popupPromise = new Promise((ok) => {
                    resolve = ok;
                })

                this.$options.popupController = { resolve }
                this.isOpen = true;

                return popupPromise;
            },

            confirm() {
                this.$options.popupController.resolve(true);
                this.isOpen = false;
            },

            close() {
                this.$options.popupController.resolve(false);
                this.isOpen = false;
            },
        }

    }
</script>

<style scoped lang="scss">
    @import './Styles/popup';
</style>