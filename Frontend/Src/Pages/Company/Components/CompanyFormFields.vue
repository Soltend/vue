<template>
    <div>
        <h2 class="form__title">
            {{ $t('company.main') }}
        </h2>

        <div
            v-for="(field, idx) in initialFields"
            :key="idx"
            class="field field--with-label"
        >
            <p class="field__label">{{ $t(`company.${field.class}`) }}</p>

            <input
                @input="updateField(field)"
                v-model="field.value"
                :type="field.type"
                :id="field.class"
                :data-class="field.class"
                :data-required="field.required"
                :data-validate="field.validate"
                class="field__item"
            >
        </div>
    </div>
</template>

<script>
    import { getFieldValidate } from 'Utils/Fields';
    import cloneDeep from 'lodash/cloneDeep';

    export default {
        name: 'CompanyFormFields',

        props: {
            fields: {
                type: Object,
                required: true,
                validator: value => {
                    return (typeof value === 'object');
                }
            }
        },

        emits: ['update:fields'],

        data() {
            return {
                initialFields: cloneDeep(this.fields)
            }
        },

        watch: {
            fields() {
                this.initialFields = cloneDeep(this.fields);
            }
        },

        methods: {
            updateField(field) {
                field.validate = getFieldValidate(field);
                this.$emit('update:fields', this.initialFields);
            }
        }
    }
</script>