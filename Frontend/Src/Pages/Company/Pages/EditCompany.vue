<template>
    <div class="company-create page">
        <template v-if="preloader">
            <Preloader class="page__preloader" />
        </template>

        <template v-if="!preloader">
            <template v-if="!requestError">
                <div class="company-create__top">
                    <h1 class="company-create__title title title--page">{{ $t('company.edit_company') }}</h1>

                    <router-link
                        :title="$t('company.back')"
                        to="/company"
                        class="company-create__button button button--blue"
                    >
                    <span class="button__container" tabindex="-1">
                        <span class="button__label">{{ $t('company.back') }}</span>
                    </span>
                    </router-link>
                </div>

                <CompanyForm
                    @form-response="formResponseHandler"
                    :company-data="companyData"
                    class="company-create__form"
                />

                <Notification
                    :show-notice="showNoticeToggle"
                    :notice-message="noticeMessage"
                    class="company-create__notification"
                />
            </template>

            <template v-if="requestError">
                <Error @repeat-request="getCompany">
                    <template #text>
                        {{ $t('error.request') }}
                    </template>

                    <template #button="{ repeatRequest }">
                        <button
                            @click="repeatRequest"
                            class="button button--green"
                        >
                            <span class="button__container" tabindex="-1">
                                <span class="button__label">{{ $t('error.repeat') }}</span>
                            </span>
                        </button>
                    </template>
                </Error>
            </template>
        </template>
    </div>
</template>

<script>
    import CompanyForm from '../Components/CompanyFormEdit';
    import { singleCompanyRequestHandler } from 'Api/Company';
    import { mapState } from "vuex";

    export default {
        name: 'EditCompany',

        components: { CompanyForm },

        data() {
            return {
                preloader: false,
                requestError: false,
                companyData: null,
                noticeMessage: '',
            }
        },

        computed: {
            ...mapState('user', ['currentUser']),

            showNoticeToggle() {
                return !!this.noticeMessage;
            },
        },

        created() {
            this.getCompany()
        },

        methods: {
            async getCompany() {
                this.preloader = true;
                this.requestError = false;

                try {
                    await singleCompanyRequestHandler({
                        userId: this.currentUser.id,
                        companyId: this.$route.params.id
                    }).then((res) => {
                        if (!res.result) {
                            this.requestError = true;
                            return;
                        }

                        this.companyData = res.result;
                    })
                } finally {
                    this.preloader = false;
                }
            },

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
    @import '../Styles/company';
</style>