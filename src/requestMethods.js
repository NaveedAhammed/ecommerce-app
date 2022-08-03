import axios from "axios";

const BASE_URL = "https://shopping-server-api.herokuapp.com/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDk3YjI1ZWJjM2RkODgzNmIxZjdlZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTA3NDc4MiwiZXhwIjoxNjU5MzMzOTgyfQ.72NyifSa710wX2bTLEiYccNcrQdVbI7YIxr040JX92I"

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` }
})