import { reactify, useStorage } from "@vueuse/core";
import { computed, reactive } from "vue";

// const up = 
// `
//     <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
//         width="1222.000000pt" height="1280.000000pt" viewBox="0 0 1222.000000 1280.000000"
//         preserveAspectRatio="xMidYMid meet">
//         <metadata>
//         Created by potrace 1.15, written by Peter Selinger 2001-2017
//         </metadata>
//         <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
//             fill="#000000" stroke="none">
//             <path d="M7271 12780 c-79 -21 -133 -55 -155 -98 -8 -16 -18 -93 -25 -187 -80
//             -1109 -253 -1873 -531 -2343 -141 -238 -279 -387 -585 -630 -340 -271 -528
//             -471 -629 -670 -15 -30 -72 -165 -128 -300 -300 -738 -565 -1282 -836 -1719
//             -265 -425 -548 -739 -783 -867 -116 -63 -180 -76 -365 -76 l-164 0 0 -2625 c0
//             -1444 2 -2625 5 -2625 3 0 62 -11 132 -24 71 -14 251 -48 400 -75 150 -28 393
//             -73 540 -101 1744 -324 1588 -298 1917 -325 485 -39 1028 -73 1566 -97 369
//             -16 1398 -16 1650 0 515 34 826 90 1010 182 324 163 742 555 873 818 l42 85 6
//             336 c4 246 9 345 19 371 29 76 94 154 305 366 236 236 306 319 360 429 80 163
//             68 256 -85 635 -101 252 -140 380 -140 464 0 103 64 208 270 441 229 260 292
//             369 276 481 -10 75 -62 184 -179 376 -202 333 -256 458 -243 557 10 73 56 154
//             182 321 223 295 252 353 240 486 -19 213 -189 556 -409 829 -83 103 -245 260
//             -322 311 -169 114 -421 159 -1110 195 -242 13 -1334 18 -2050 9 l-410 -5 -24
//             70 c-48 138 -29 362 53 622 81 256 179 480 450 1021 107 215 214 434 236 488
//             85 205 148 438 187 698 22 140 25 637 5 761 -73 454 -193 740 -413 978 -296
//             321 -816 521 -1138 437z"/>
//             <path d="M386 6129 c-123 -29 -263 -139 -324 -255 -66 -127 -62 65 -62 -2674
//             0 -2181 2 -2493 15 -2549 43 -182 187 -329 370 -377 64 -17 1712 -20 1785 -3
//             181 42 346 215 380 398 14 74 14 4988 0 5062 -34 183 -199 356 -380 398 -57
//             13 -1728 13 -1784 0z"/>
//         </g>
//     </svg>
// `

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
            text: "Bonjour",
            img: "niquer ses grands morts",
            code: "niquer ses grands morts",
            id_user: 0,
            likes: 0,
            dislikes: 0,
            like: false,
            dislike: false,
            tag: ["siu", "siu"],
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
            tag: ["siu", "siu2"],
        },
    ]
)

export const addPost = (url, description, code, tag) => {
    console.log("siu")
    if (description && url && code && tag) {
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
    if (storedData.dislike === true) {
        storedData.dislikes--
        storedData.dislike = false;
    }
    storedData.like = bool
}

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
    storedData.dislike = bool
}

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

export const removeParams = () => {
    history.back()
}

export const storeDuplication = reactive({
    input: "",
    store: store.value
})

export const search = computed(() => {
    return storeDuplication.store.filter((t) => t.text.toLowerCase().includes(storeDuplication.input.toLowerCase()) || t.text.toLowerCase() === storeDuplication.input || t.code.toLowerCase().includes(storeDuplication.input.toLowerCase()))
})