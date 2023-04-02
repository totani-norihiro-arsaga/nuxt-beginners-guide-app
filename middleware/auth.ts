import Cookies from "universal-cookie";

export default defineNuxtRouteMiddleware(async (to, from)=>{
    const cookie = new Cookies;
    console.log('auth.ts_middleware');
    if(cookie.get('authUserId')) {
        const {setUser, user} = userState();
        setUser(cookie.get('authUserId'));
        console.log(user.value.id);
        return await navigateTo('/posts/');
    }
});