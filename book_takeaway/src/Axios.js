import axios from "axios";

const firebase = axios.create({
    baseURL: 'https://booktakeaway-9ddeb-default-rtdb.europe-west1.firebasedatabase.app'
})

const googleBooks = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/volumes'
})

export {
    firebase,
    googleBooks
}