import {Post} from "~/types/post";

type User = {
    id: string,
    posts?: Post[],
}

export default User;