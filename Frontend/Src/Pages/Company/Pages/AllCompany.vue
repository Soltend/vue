<template>
    <div class="page">
        <template v-if="preloader">
            <Preloader class="page__preloader" />
        </template>

        <template v-if="!preloader">
            <template v-if="!requestError">
                <div class="company-list">
                    <h1 class="title title--page">{{ $t('company.title_list') }}</h1>

                    <template v-if="listIsEmpty">
                        <p class="company-list__empty">
                            {{ $t('company.empty_list') }}
                        </p>
                    </template>

                    <template v-if="!listIsEmpty">
                        <CompanyTable
                            @delete-company="popupHandler"
                            :company-list="companyList"
                        />
                    </template>

                    <div class="company-list__actions">
                        <router-link
                            to="/company/create"
                            class="company-list__button button button--green"
                        >
                            <span class="button__container" tabindex="-1">
                                <span class="button__label">{{ $t('company.button_create') }}</span>
                            </span>
                        </router-link>
                    </div>
                </div>
            </template>

            <template v-if="requestError">
                <Error @repeat-request="getCompanyList">
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

        <Popup ref="confirmationPopup">
            <template #text>{{ popupText }}</template>

            <template #actions="{ confirm, close }">
                <button
                    @click="confirm"
                    class="button button--green button--popup"
                    type="button"
                >
                    <span class="button__container" tabindex="-1">
                        <span class="button__label">
                            {{ $t('company.company_delete') }}
                        </span>
                    </span>
                </button>

                <button
                    @click="close"
                    class="button button--blue button--popup"
                    type="button"
                >
                    <span class="button__container" tabindex="-1">
                        <span class="button__label">
                            {{ $t('company.cancel') }}
                        </span>
                    </span>
                </button>
            </template>
        </Popup>
    </div>
</template>

<script>
    import CompanyTable from '../Components/AllCompanyTable';
    import { mapState } from 'vuex';
    import { allCompanyRequestHandler, removeCompanyRequestHandler } from 'Api/Company';
    import { getCompanyTypes } from 'Utils/Company';

    export default {
        name: 'AllCompany',

        components: { CompanyTable },

        data() {
            return {
                preloader: false,
                requestError: false,
                companyList: null,
                companyName: ''
            }
        },

        computed: {
            ...mapState('user', ['currentUser']),

            listIsEmpty() {
                return this.companyList ? !this.companyList.length : true;
            },

            popupText() {
                return `${this.$t('company.delete_confirm')} ${this.companyName}`;
            }
        },

        created() {
            this.getCompanyList();
        },

        methods: {
            async getCompanyList() {
                this.preloader = true;
                this.requestError = false;

                try {
                    await allCompanyRequestHandler({
                        userId: this.currentUser.id,
                    }).then((res) => {
                        if (!res.result) {
                            this.requestError = true;
                            return;
                        }

                        this.companyList = getCompanyTypes(res.result);
                    })
                } finally {
                    this.preloader = false;
                }
            },

            async popupHandler(company) {
                this.companyName = company.name;

                await this.$refs.confirmationPopup.open().then(result => {
                    if (result) {
                        this.removeCompanyHandler(company.id)
                    }
                })
            },

            async removeCompanyHandler(id) {
                await removeCompanyRequestHandler({
                    userId: this.currentUser.id,
                    companyId: id
                }).then(res => {
                    if (res.result) {
                        this.filterCompanies(id)
                    }
                })
            },

            filterCompanies(id) {
                this.companyList = this.companyList.filter(item => item.id !== id);
            },
        }
    }
</script>

<style scoped lang="scss">
    @import '../Styles/company-list';
</style>