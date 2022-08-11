<template>
    <div class="company-create">
        <div class="company-create__top">
            <h1 class="company-create__title title title--page">{{ $t('company.create_company') }}</h1>

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
            class="company-create__form"
        />

        <Notification
            :show-notice="showNoticeToggle"
            :notice-message="noticeMessage"
            class="company-create__notification"
        />
    </div>
</template>

<script>
    import CompanyForm from '../Components/CompanyFormCreate';

    export default {
        name: 'CreateCompany',

        components: { CompanyForm },

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

                if (res.result) {
                    this.$router.push('/company');
                } else {
                    this.noticeMessage = res.message;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../Styles/company';
</style>