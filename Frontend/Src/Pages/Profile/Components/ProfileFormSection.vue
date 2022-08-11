<template>
    <div class="column">
        <div
            v-for="(field, idx) in initialFields"
            :key="idx"
            class="field field--with-label"
        >
            <p class="field__label">{{ $t(`profile.${field.class}`) }}</p>

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
        name: 'ProfileSectionName',

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
            checkingPasswords() {
                const oldPassword = this.initialFields.old;
                const newPassword = this.initialFields.new;

                if (oldPassword.value || newPassword.value) {
                    oldPassword.required = newPassword.required = true;
                } else {
                    oldPassword.required = newPassword.required = false;
                    oldPassword.validate = newPassword.validate = null;
                }
            },

            updateField(field) {
                if (field.class === 'old' || field.class === 'new') {
                    this.checkingPasswords()
                }

                field.validate = getFieldValidate(field);

                this.$emit('update:fields', this.initialFields);
            }
        },

    }
</script>