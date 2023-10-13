<template>

</template>

<script>


export default {
    name: "Advertencia",
    data: () => ({
        counter: 0
    }),
    methods: {
        showAdvertencia() {            
            this.$toast.warning(`Toast with counter `, {
                position: "bottom-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 1.05,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            })
        }
    }
};
</script>

<style>

</style>
