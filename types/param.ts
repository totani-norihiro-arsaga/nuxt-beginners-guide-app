import User from "~/types/user";

interface publishPostParams {
    title: string;
    body: string;
    user: User;
    createdAt: number;
}

export {publishPostParams};