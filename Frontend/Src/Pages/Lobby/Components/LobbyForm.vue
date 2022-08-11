<template>
    <form class="form">
        <div
            v-for="field in fieldsList"
            :key="field.class"
            :class="`field--${field.class}`"
            class="field"
        >
            <input
                @input="validation(field)"
                v-model="field.value"
                :type="field.type"
                :id="field.class"
                :data-class="field.class"
                :data-required="field.required"
                :data-validate="field.validate"
                :placeholder="$t(`lobby.${field.class}`)"
                class="field__item"
            >
        </div>

        <template v-if="!preloader">
            <component
                @submit-form="submitHandler"
                :is-button-active="isButtonActive"
                :is="currentButtonsComponent"
                class="form__actions"
            />
        </template>

        <template v-if="preloader">
            <Preloader class="form__preloader" />
        </template>
    </form>
</template>

<script>
    import AuthButtons from './LobbyAuthButtons';
    import RegistrationButtons from './LobbyRegistrationButtons';
    import RecoveryButtons from './LobbyRecoveryButtons';
    import { getFieldsList } from 'Api/Catalogs';
    import { getFieldValidate, checkingFields } from 'Utils/Fields';
    import { authRequestHandler } from 'Api/Auth';

    export default {
        name: 'LobbyForm',

        components: {
            AuthButtons,
            RegistrationButtons,
            RecoveryButtons
        },

        emits: {
            formResponse: null,
        },

        data() {
            return {
                fieldsList: null,
                preloader: false,
            }
        },

        computed: {
            isButtonActive() {
                return checkingFields(this.fieldsList);
            },

            currentButtonsComponent() {
                if (!this.$route.name) {
                    return;
                }

                return `${this.$route.name}Buttons`;
            }
        },

        created() {
            this.fieldsList = getFieldsList(this.$route.name);
        },

        methods: {
            validation(field) {
                field.validate = getFieldValidate(field);
            },

            emitFormResponse(payload = null) {
                this.$emit('formResponse', payload)
            },

            async submitHandler() {
                this.preloader = true;
                this.emitFormResponse();

                try {
                    if (!checkingFields(this.fieldsList)) {
                        this.emitFormResponse({
                            message: 'field validation error'
                        });

                        return;
                    }

                    await authRequestHandler(this.$route.name, this.fieldsList)
                        .then((res) => this.emitFormResponse(res));
                } finally {
                    this.preloader = false;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../Styles/form';
</style>