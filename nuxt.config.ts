// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr:false,
    modules: [
        '@element-plus/nuxt'
    ],
    runtimeConfig: {
        public: {
            apiUrl: 'https://nuxt-beginners-guide-app-default-rtdb.firebaseio.com',
        }
    }
})
