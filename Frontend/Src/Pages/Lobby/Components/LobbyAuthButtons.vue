<template>
    <div class="actions">
        <button
            @click="submitForm()"
            :title="$t('lobby.login')"
            :disabled="!isButtonActive"
            type="button"
            class="actions__button button button--green"
        >
            <span class="button__container">
                <span class="button__label">
                    {{ $t('lobby.login') }}
                </span>
            </span>
        </button>

        <router-link
            :title="$t('lobby.registration')"
            class="actions__button button button--blue"
            to="registration"
        >
            <span class="button__container" tabindex="-1">
                <span class="button__label">{{ $t('lobby.registration') }}</span>
            </span>
        </router-link>

        <div class="actions__footer">
            <router-link
                :title="$t('lobby.recovery')"
                class="actions__button button button--simple"
                to="recovery"
            >
                <span class="button__container" tabindex="-1">
                    <span class="button__label">{{ $t('lobby.recovery') }}</span>
                </span>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LobbyButtons',

        props: {
            isButtonActive: {
                type: Boolean,
                default: false,
                required: true,
                validator: value => {
                    return (typeof value === 'boolean');
                }
            }
        },

        emits: {
            submitForm: null,
        },

        methods: {
            submitForm() {
                this.$emit('submitForm');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../Styles/actions';
</style>