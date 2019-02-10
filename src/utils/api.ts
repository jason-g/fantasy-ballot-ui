import { Category } from "../store/categories/types";
import { Global } from "../store/globals/types";

export async function callApi(method: string, url: string, path: string, data?: any) {
    //const res = await fetch(url + '/' + path, {
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user && user.id;
    if (!token) {
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

export async function selectWinner(category: Category) {
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user && user.id;
    const dbid = category.id;
    // ToDo: add admin check (will also be on server side)
    if (!token) {
        console.log('No user token present!');
        return({});
    }
    if (dbid) {
        const response = await fetch('/categories/'+dbid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(category),
        });
        const body = await response.text();
        return (body);
    } else {
        console.log ('Missing category ID?)');
        return;
    }
}

export async function saveGlobals(action: any) {
    const globals = action.globals;
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user && user.id;
    // ToDo: add admin check (will also be on server side)
    if (!token) {
        console.log('No user token present!');
        return({});
    }
    if (globals) {
        const response = await fetch('/globals/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(globals),
        });
        const body = await response.text();
        return (body);
    } else {
        console.log ('Missing Globals?)');
        return;
    }
}

export async function callLogin(username: string, password: string) {
    let response = await fetch('/People/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": username, "password": password }),
    });
    const loginResponse = await response.text();
    let userModel = JSON.parse(loginResponse);
    userModel.roles = [];
    let fooresponse = await fetch('/People/' + userModel.userId + '/roles/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const userResponse = await fooresponse.text();
    const tmpUser = JSON.parse(userResponse);
    userModel.roles = tmpUser.map((userObj: any) => {
      return userObj.name;  
    })
    return (JSON.stringify(userModel));
}

export async function callLogout() {
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user && user.id;
    if (!token) {
        console.log('No user token present!');
        return({});
    }
    const response = await fetch('/People/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({}),
    });
    const body = await response.text();
    return (body);
}

export async function callSignup(username: string, password: string, email: string) {
    const response = await fetch('/People', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": username, "password": password, "email": email }),
    });
    const body = await response.text();
    return (body);
}

export async function callResetPassword(token: any, password: string) {
    const response = await fetch('/People/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({ "newPassword": password }),
    });
    const body = await response.text();
    return (body);
}

export async function callRequestChange(email: string) {
    const response = await fetch('/People/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email}),
    });
    const body = await response.text();
    return (body);
}

export async function callEditUser(userid: number, username: string, password: string, email: string) {
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user && user.id;
    if (!token) {
        console.log('No user token present!');
        return({});
    }
    const response = await fetch('/People/' + userid, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({ "username": username, "password": password, "email": email }),
    });
    const body = await response.text();
    return (body);
}