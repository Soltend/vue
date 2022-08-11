<template>
    <Error>
        <template #text>
            {{ $t('error.text') }}
        </template>

        <template #button>
            <router-link class="button button--green" to="/">
                <span class="button__container" tabindex="-1">
                    <span class="button__label">{{ $t('error.home') }}</span>
                </span>
            </router-link>
        </template>
    </Error>
</template>

<script>
    export default {
        name: 'ErrorPage'
    }
</script>