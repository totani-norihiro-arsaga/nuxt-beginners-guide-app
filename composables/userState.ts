import Cookies from "universal-cookie";
import User from "~/types/user";

const cookie = new Cookies();

export const userState = () => {
    const user = useState(() => {
        return {
            isLoggedIn: false,
            id: "",
        };
    });
    const serUser = (id: string) => {
        user.value.id = id;
        user.value.isLoggedIn = true;
    };
    return {
        user: readonly(user),
        setUser: serUser,
    };
};

export const login = async (id: string) => {
    console.log('ログインします。');
    const {data, error} = await useFetch<User>(
        `https://nuxt-beginners-guide-app-default-rtdb.firebaseio.com/users.json?orderBy="id"&equalTo="${id}"`,
        {
            headers: {
                Origin: "localhost:3001",
            },
        }
    );
    if (data.value) {
        cookie.set("authUserId", id);
        const {setUser} = userState();
        setUser(id);
        return navigateTo("/posts/");
    } else {
        throw createError({
            statusCode: 422,
            statusMessage: "Bad Request",
            message: "ユーザーがいません",
            fatal: false,
        });
    }
};

export const register = async (id: string) => {
    const {error} = await useFetch(
        `https://nuxt-beginners-guide-app-default-rtdb.firebaseio.com/users/${id}.json`,
        {
            method: "PUT",
            body: JSON.stringify({id: id}),
        }
    );
    if (error.value) {
        throw createError({
            statusCode: 500,
            statusMessage: "server error",
            message: "ユーザーの登録ができませんでした。",
            fatal: false,
        });
    } else {
        cookie.set("authUserId", id);
        const {setUser, user} = userState();
        setUser(id);
        return navigateTo("/posts/");
    }
};
