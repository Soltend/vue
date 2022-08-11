<template>
    <form class="form">
        <CompanyFormFields
            v-model:fields="fieldsList.main"
            class="company-create__column"
        />

        <CompanyFormTypes
            v-model:types="fieldsList.types"
            class="company-create__column"
        />

        <template v-if="!preloader">
            <div class="company-create__actions">
                <button
                    @click="submitHandler()"
                    :disabled="!isButtonActive"
                    class="company-create__button button button--green"
                    type="button"
                >
                        <span class="button__container" tabindex="-1">
                            <span class="button__label">
                                {{ $t('company.add') }}
                            </span>
                        </span>
                </button>
            </div>
        </template>

        <template v-if="preloader">
            <Preloader class="company-create__preloader" />
        </template>
    </form>
</template>

<script>
    import CompanyFormFields from './CompanyFormFields';
    import CompanyFormTypes from './CompanyFormTypes';
    import { getFieldsList } from 'Api/Catalogs';
    import { checkingFields } from 'Utils/Fields';
    import { createCompanyRequestHandler } from 'Api/Company'
    import { mapState } from "vuex";

    export default {
        name: 'CompanyForm',

        components: {
            CompanyFormFields,
            CompanyFormTypes
        },

        data() {
            return {
                preloader: false,
                fieldsList: null,
            }
        },

        computed: {
            ...mapState('user', ['currentUser']),

            isButtonActive() {
                return checkingFields(this.fieldsList);
            },
        },

        created() {
            this.fieldsList = getFieldsList('Company');
        },

        methods: {
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

                    await createCompanyRequestHandler({
                        userId: this.currentUser.id,
                        ...this.fieldsList
                    }).then((res) => this.emitFormResponse(res));
                } finally {
                    this.preloader = false;
                }
            }
        }
    }
</script>