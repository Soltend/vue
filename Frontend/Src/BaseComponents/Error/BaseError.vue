<template>
    <div class="error">
        <div class="error__wrapper">
            <h1 class="error__title title">
                {{ $t('error.title') }}
            </h1>

            <p class="error__subtitle subtitle">
                <slot name="text"></slot>
            </p>

            <slot name="button" :repeat-request="repeatRequest"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ErrorComponent',

        emits: {
            repeatRequest: null
        },

        methods: {
            repeatRequest() {
                this.$emit('repeatRequest')
            }
        }
    }
</script>

<style scoped lang="scss">
    @import './Styles/error';
</style>