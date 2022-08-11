<template>
    <div class="table__row">
        <div class="table__column">
            <p class="table__text">{{ company.name }} </p>
        </div>

        <div class="table__column">
            <p class="table__text">{{ company.type }}</p>
        </div>

        <div class="table__column">
            <p v-if="company.web" class="table__text">
                <a
                    :href="`${company.web}`"
                    class="table__link"
                    target="_blank"
                >
                    {{ company.web }}
                </a>
            </p>
        </div>

        <div class="table__column">
            <p class="table__text">
                {{ company.employess }}
            </p>
        </div>

        <div class="table__column">
            <p v-if="!company.subscribe" class="table__text">
                {{ $t('company.not_subscribe') }}
            </p>
        </div>

        <div class="table__column table__column--actions">
            <router-link
                :title="$t('company.company_view')"
                :to="'in-progress'"
                class="button button--table button--green button--watch"
            >
            </router-link>

            <router-link
                :title="$t('company.company_edit')"
                :to="'/company/' + company.id"
                class="button button--table button--blue button--edit"
            >
            </router-link>

            <button
                :title="$t('company.company_delete')"
                :aria-label="$t('company.company_delete')"
                @click="deleteCompany(company)"
                class="button button--table button--delete"
            >
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AllCompanyTableItem',

        props: {
            company: {
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
                this.$emit('deleteCompany', {
                    id: company.id,
                    name: company.name
                })
            }
        }
    }
</script>