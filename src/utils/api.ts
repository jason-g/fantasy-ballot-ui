export async function callApi(method: string, url: string, path: string, data?: any) {
    //const res = await fetch(url + '/' + path, {
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user && user.id;
    if (!token) {
        console.dir(user);
        console.log('No user token present!');
       // return ({});
    }
    const res = await fetch(path, {
        method,
        headers: {
            Accept: 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(data)
    })
    return await res.json()
}

export async function makeSelection(category_id: number, entry_id: number, id: number | undefined) {
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user && user.id;
    if (!token) {
        console.log('No user token present!');
        return({});
    }
    if (id) {
        const response = await fetch('/selections/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ "id": Number(id), "category_id": Number(category_id), "entry_id": Number(entry_id), "user_id": 0 }),
        });
        const body = await response.text();
        return (body);
    } else {
        const response = await fetch('/selections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ "category_id": Number(category_id), "entry_id": Number(entry_id), "user_id": 0 }),
        });
        const body = await response.text();
        return (body);
    }
}

export async function callLogin(username: string, password: string) {
    const response = await fetch('/Users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": username, "password": password }),
    });
    const body = await response.text();
    return (body);
}