<template>
    <div>
        <h2 class="form__title">
            {{ $t('company.company_type') }}
        </h2>

        <template
            v-for="(type, idx) in companyTypes"
            :key="idx"
        >
            <input
                @change="updateCheckbox(type)"
                v-model="initialTypes.list"
                :id="type.id"
                :value="type.id"
                type="checkbox"
                class="field__checkbox"
            >

            <label
                :for="type.id"
                class="field__checkbox-label"
            >
                {{ type.name}}
            </label>
        </template>
    </div>
</template>

<script>
    import { companyTypesList } from 'Utils/Company';
    import cloneDeep from "lodash/cloneDeep";

    export default {
        name: 'CompanyFormTypes',

        props: {
            types: {
                type: Object,
                required: true,
                validator: value => {
                    return (typeof value === 'object');
                }
            }
        },

        emits: ['update:types'],

        data() {
            return {
                initialTypes: cloneDeep(this.types),
                companyTypes: null
            }
        },

        watch: {
            types() {
                this.initialTypes = cloneDeep(this.types);
            }
        },

        created() {
            this.companyTypes = companyTypesList();
        },

        methods: {
            updateCheckbox() {
                this.$emit('update:types', this.initialTypes);
            }
        }
    }
</script>