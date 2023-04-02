import User from "~/types/user";

interface Post {
    id: string;
    title: string;
    body: string;
    user: User;
    createdAt: number;
}

interface UserPost {
    id: string;
    title: string;
    body: string;
    createdAt: number;
}

export {Post, UserPost};