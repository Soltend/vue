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
                                {{ $t('company.edit') }}
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
import { relateFields, checkingFields } from 'Utils/Fields';
import { editCompanyRequestHandler } from 'Api/Company'
import { mapState } from "vuex";
import cloneDeep from 'lodash/cloneDeep';

export default {
    name: 'CompanyForm',

    components: {
        CompanyFormFields,
        CompanyFormTypes
    },

    props: {
        companyData: {
            type: Object,
            required: false,
        }
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
        this.matchFieldsValue()
    },

    methods: {
        matchFieldsValue() {
            if (this.companyData) {
                const fields = relateFields(this.fieldsList, this.companyData);
                fields.types.list = cloneDeep(this.companyData.type.types);

                this.fieldsList = fields;
            }
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

                await editCompanyRequestHandler({
                    companyId: this.$route.params.id,
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