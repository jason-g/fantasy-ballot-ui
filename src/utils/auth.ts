import { callTokenCheck } from "./api";


export async function isAuthenticated() {
    //const res = await fetch(url + '/' + path, {
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user && user.id;
    if (!token) {
        console.log('No user token present!');
       return false;
    }
    return callTokenCheck(token, user.userId);
}