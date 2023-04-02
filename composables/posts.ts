import User from "~/types/user"
import {publishPostParams} from "~/types/param";
import {Post, UserPost} from "~/types/post";

export const posts = () => {
    const posts = useState<Post[]>(() => {
        return [];
    });

    const setPost = (insertPosts: Post[]) => {
        posts.value.push(...insertPosts);
    };

    const clearPost = () => {
        posts.value = [];
    }
    const publishPost = async (payload: publishPostParams) => {
        const {data: user} = await useFetch<User>(`https://nuxt-beginners-guide-app-default-rtdb.firebaseio.com/users/${payload.user.id}.json`);
        const response = await useFetch(`https://nuxt-beginners-guide-app-default-rtdb.firebaseio.com/posts.json`, {
            method: 'POST',
            body: payload,
        });
        const responseData = response.data.value as { name: string }
        const postId = responseData.name;
        const post = {id: postId, ...payload};
        const putData: { title: string, body: string, user?: User, createdAt: number, id: string } = {id: postId, ...payload};
        if (putData.user) {
            delete putData.user
        }
        await useFetch(`https://nuxt-beginners-guide-app-default-rtdb.firebaseio.com/users/${user.value?.id}/posts.json`, {
            method: 'PUT',
            body: [
                ...(user.value?.posts || []),
                putData,
            ]
        });
    };
    const fetchAll = async () => {
        clearPost();
        const {data} = await useFetch<{ [key: string]: { body: string; createdAt: number; title: string; user: object } }>('https://nuxt-beginners-guide-app-default-rtdb.firebaseio.com/posts.json');
        if (data.value !== null) {
            const posts: Post[] = Object.entries(data.value).map((post) => {
                return {...post[1], id: post[0]} as Post;
            })
            setPost(posts);
        }
    }
    return {
        get: readonly(posts),
        setPost: setPost,
        publishPost: publishPost,
        fetchAll: fetchAll,
    };
};