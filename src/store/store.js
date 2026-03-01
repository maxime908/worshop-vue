import { containsProp, reactify, useStorage } from "@vueuse/core";
import gsap from "gsap";
import { computed, reactive } from "vue";

const params = new URLSearchParams(window.location.search)
const url = new URL(location);

function likeAnimation(like, id) {
    let tl = gsap.timeline()

    tl.to(like + id, { rotate: 30, scale: 1.5, duration: 0.5 })

    tl.to(like + id, { rotate: 0, scale: 1, duration: 0.5 })
}

export const users = useStorage(
    'users',
    [
        {
            id: 0,
            firstName: "Maxime",
            lastName: "DREZET",
            email: "drezetmaxime67@gmail.com",
            password: "moi1",
            is_authentificated: false,
        },
        {
            id: 1,
            firstName: "Maxime",
            lastName: "DREZET",
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
            text: "Voici un code symfony",
            img: "https://devblogs.microsoft.com/visualstudio/wp-content/uploads/sites/4/2022/11/editor.png",
            code: "<?php\n    echo'bonjour';\n?>",
            id_user: 0,
            likes: 0,
            dislikes: 0,
            like: false,
            dislike: false,
            tag: ["#PHP", "#language de programmation", "#symfony"],
        },
        {
            id: 1,
            text: "Voici un code php",
            img: "https://user.oc-static.com/upload/2017/07/13/14999673385366_os%20balise%20php.png",
            code: "<?php\n    echo'Au revoir';\n?>",
            id_user: 0,
            likes: 0,
            dislikes: 0,
            like: false,
            dislike: false,
            tag: ["#PHP", "#language de programmation"],
        },
    ]
)

// Le mettre dans un nouveau dossier post et dans le fichier post
export const addPost = (url, description, code, tag) => {
    if (description) {
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
            tag: tag,
        })
        window.location.href = "/";
    }
}

// Le mettre dans un nouveau dossier post et dans le fichier post
export const updatePost = () => { 
    window.location.href = "/";
}

// Le mettre dans un nouveau dossier post et dans le fichier post
export const deletePost = (id) => {
    store.value.splice(store.value.indexOf(id), 1);
    window.location.href = "/";
}

// Le mettre dans un nouveau dossier post et dans le fichier post 
export const recupId = (id) => {
    return store.value.find((t) => t.id === parseInt(id))
}

// Le mettre dans un nouveau dossier gestion_like_dislike et dans le fichier gestion_like_dislike 
export const like = (id, bool) => {
    const storedData = recupId(id);
    if (bool) {
        storedData.likes++
    } else {
        storedData.likes--
    }

    if (storedData.dislike === true) {
        storedData.dislikes--
        storedData.dislike = false;
    }

    likeAnimation("#like", id)

    storedData.like = bool
}

// Le mettre dans un nouveau dossier gestion_like_dislike et dans le fichier gestion_like_dislike 
export const dislike = (id, bool) => {
    const storedData = recupId(id);
    if (bool) {
        storedData.dislikes++
    } else {
        storedData.dislikes--
    }

    if (storedData.like === true) {
        storedData.likes--
        storedData.like = false;
    }

    likeAnimation("#dislike", id)

    storedData.dislike = bool
}

//TODO:Changer icone like et dislike

// Le mettre dans un nouveau dossier user et dans le fichier recup user 
export const addUser = (email, password, firstName, lastName) => {
    if (email && password && firstName && lastName) {
        const find = users.value.find((t) => t.email === email)
        if (find) {
            return;
        }

        const id = users.value.length;
        users.value.push({
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            is_authentificated: false,
        })
        window.location.href = "/";
    }
}

// Le mettre dans un nouveau dossier user et dans le fichier recup user 
export const login = (email, password) => {
    if (email && password) {
        const find = users.value.find((t) => t.email === email && t.password === password)

        if (find) {
            localStorage.setItem("is_authentificated", JSON.stringify({id: find.id}))
            window.location.href = "/";
        }
    }
}

// Le mettre dans un nouveau dossier user et dans le fichier recup user
export const userInfo = (id) => {
    return users.value.find((t) => t.id === parseInt(id))
}

// Le mettre dans un nouveau dossier user et dans le fichier recup user 
export const deleteAccount = (id) => {
    users.value.splice(users.value.indexOf(id), 1);
    localStorage.removeItem("is_authentificated");
    window.location.href = "/log/login";
}

// Le mettre dans un nouveau dossier search et dans le fichier search 
export const storeDuplication = reactive({
    input: "",
    input_cat: (params.get("tab") !== null) ? params.get("tab") : "",
    store: store.value
})

// Le mettre dans un nouveau dossier search et dans le fichier search 
export const search = computed(() => {
    if (storeDuplication.input !== "" && storeDuplication.input_cat !== "") { 
        storeDuplication.input = ""
        storeDuplication.input_cat = ""
    }

    if (storeDuplication.input !== "")  {
        storeDuplication.input_cat = ""

        return storeDuplication.store.filter((t) => t.text.toLowerCase().includes(storeDuplication.input.toLowerCase()) || t.text.toLowerCase() === storeDuplication.input || t.code.toLowerCase().includes(storeDuplication.input.toLowerCase()))
    }

    if (storeDuplication.input_cat !== "") {
        storeDuplication.input = ""

        url.searchParams.set("tab", storeDuplication.input_cat);
        history.pushState({}, "", url);

        let tag = storeDuplication.input_cat

        return storeDuplication.store.filter((t) => {
            for (let i = 0; i < t.tag.length; i++) {
                if (t.tag[i].toLowerCase() === "#" + tag.toLowerCase()) {
                    return true;
                }
            }
        })
    }

    return storeDuplication.store
})