export async function isAuthenticated() {
    //const res = await fetch(url + '/' + path, {
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user && user.id;
    if (!token) {
        console.dir(user);
        console.log('No user token present!');
       return false;
    }
    // ToDo: check validity of token
    return true;
}