<template>
    <form class="profile__form form" autocomplete="off">
        <ProfileFormSection
            v-model:fields="fieldsList.user"
            class="profile__column"
        />

        <ProfileFormSection
            v-model:fields="fieldsList.contacts"
            class="profile__column"
        />

        <ProfileFormSection
            v-model:fields="fieldsList.password"
            class="profile__column"
        />

        <template v-if="!preloader">
            <div class="profile__actions">
                <button
                    @click="submitHandler()"
                    :disabled="!isButtonActive"
                    class="actions__button button button--green"
                    type="button"
                >
                    <span class="button__container" tabindex="-1">
                        <span class="button__label">
                            {{ $t('profile.update') }}
                        </span>
                    </span>
                </button>
            </div>
        </template>

        <template v-else>
            <Preloader class="profile__preloader" />
        </template>
    </form>
</template>

<script>
    import ProfileFormSection from "./ProfileFormSection";
    import { mapActions, mapState } from 'vuex';
    import { getFieldsList } from 'Api/Catalogs';
    import { relateFields, checkingFields } from 'Utils/Fields';
    import { profileRequestHandler } from 'Api/Profile';

    export default {
        name: 'ProfileForm',

        components: { ProfileFormSection },

        emits: {
            formResponse: null,
        },

        data() {
            return {
                preloader: false,
                fieldsList: null
            }
        },

        computed: {
            ...mapState('user', ['currentUser']),

            isButtonActive() {
                return checkingFields(this.fieldsList);
            }
        },

        created() {
            this.fieldsList = relateFields(getFieldsList('Profile'), this.currentUser);
        },

        methods: {
            ...mapActions('user', ['updateStoreUserProfile']),

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

                    await profileRequestHandler({
                        userId: this.currentUser.id,
                        ...this.fieldsList
                    }).then((res) => {
                        if (res.result) {
                            const payload = {
                                email: this.fieldsList.contacts.email.value,
                                phone: this.fieldsList.contacts.phone.value,
                                name: this.fieldsList.user.name.value,
                                surname: this.fieldsList.user.surname.value,
                                middlename: this.fieldsList.user.middlename.value,
                            };

                            this.updateStoreUserProfile(payload);
                        }

                        this.emitFormResponse(res);
                    })
                } finally {
                    this.preloader = false;
                }
            }
        }
    }
</script>