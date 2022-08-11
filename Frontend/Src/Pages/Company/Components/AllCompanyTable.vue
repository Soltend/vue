<template>
    <div class="table">
        <div class="table__wrapper table__wrapper--top">
            <div class="table__row table__row--caption">
                <div class="table__column">
                    <p class="table__text">{{ $t('company.name') }}</p>
                </div>
                <div class="table__column">
                    <p class="table__text">{{$t('company.type') }}</p>
                </div>
                <div class="table__column">
                    <p class="table__text">{{ $t('company.web') }}</p>
                </div>
                <div class="table__column">
                    <p class="table__text">{{ $t('company.members') }}</p>
                </div>
                <div class="table__column">
                    <p class="table__text">{{ $t('company.subscribe') }}</p>
                </div>

                <div class="table__column table__column--actions"></div>
            </div>
        </div>

        <div class="table__wrapper scrollbar">
            <CompanyTableItem
                @delete-company="deleteCompany"
                v-for="company in companyList"
                :key="company.name"
                :company="company"
            />
        </div>
    </div>
</template>

<script>
    import CompanyTableItem from './AllCompanyTableItem';

    export default {
        name: 'AllCompanyTable',

        components: { CompanyTableItem },

        props: {
            companyList: {
                type: Object,
                required: false,
                validator: (value) => {
                    return (typeof value === 'object');
                }
            }
        },

        emits: {
            deleteCompany: null
        },

        methods: {
            deleteCompany(company) {
                this.$emit('deleteCompany', company)
            }
        }
    }
</script>