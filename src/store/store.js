import { useStorage } from "@vueuse/core";

export const users = useStorage(
    'users',
    [
        {
            id: 0,
            email: "drezetmaxime67@gmail.com",
            password: "moi1",
            is_authentificated: false,
        },
        {
            id: 1,
            email: "moi@gmail.com",
            password: "moi2",
            is_authentificated: false,
        },
    ]
)

export const store = useStorage(
    'store',
    [
        {
            id: 0,
            text: "Bonjour",
            img: "niquer ses grands morts",
            code: "niquer ses grands morts",
            id_user: 1,
            likes: 0,
            dislikes: 0,
            like: false,
            dislike: false,
        },
        {
            id: 1,
            text: "Bonjour2",
            img: "niquer ses grands morts",
            code: "niquer ses grands morts",
            id_user: 0,
            likes: 0,
            dislikes: 0,
            like: false,
            dislike: false,
        },
    ]
)

export const addPost = (url, description, code) => {
    console.log("siu")
    if (description && url && code) {
        const id = store.value.length;
        store.value.push({
            id: id,
            text: description,
            img: url,
            code: code,
            id_user: JSON.parse(localStorage.getItem("is_authentificated"))["id"],
            likes: 0,
            dislikes: 0,
            like: false,
            dislike: false,
        })
        window.location.href = "/";
    }
}

export const updatePost = () => { 
    window.location.href = "/";
}

export const deletePost = (id) => {
    store.value.splice(store.value.indexOf(id), 1);
    window.location.href = "/";
}

export const recupId = (id) => {
    return store.value.find((t) => t.id === parseInt(id))
}

export const like = (id, bool) => {
    const storedData = recupId(id);
    if (bool) {
        storedData.likes++
    } else {
        storedData.likes--
    }
    store.value.find((t) => {
        if (t.id === parseInt(id)) {
            t.like = bool
        }
    })
}

export const dislike = (id, bool) => {
    const storedData = recupId(id);
    if (bool) {
        storedData.dislikes++
    } else {
        storedData.dislikes--
    }
    store.value.find((t) => {
        if (t.id === parseInt(id)) {
            t.dislike = bool
        }
    })
}

export const addUser = (email, password) => {
    if (email && password) {
        const find = users.value.find((t) => t.email === email)
        if (find) {
            return;
        }

        const id = users.value.length;
        users.value.push({
            id: id,
            email: email,
            password: password,
            is_authentificated: false,
        })
        window.location.href = "/";
    }
}

export const login = (email, password) => {
    if (email && password) {
        const find = users.value.find((t) => t.email === email && t.password === password)

        if (find) {
            localStorage.setItem("is_authentificated", JSON.stringify({id: find.id}))
            window.location.href = "/";
        }
    }
}

export const userInfo = (id) => {
    return users.value.find((t) => t.id === parseInt(id))
}

export const deleteAccount = (id) => {
    users.value.splice(users.value.indexOf(id), 1);
    localStorage.removeItem("is_authentificated");
    window.location.href = "/log/login";
}