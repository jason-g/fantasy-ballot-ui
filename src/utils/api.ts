export async function callApi(method: string, url: string, path: string, data?: any) {
    console.log('CALLING' + url + ' ---- ' + path);
  //const res = await fetch(url + '/' + path, {
  const res = await fetch(path, {
    method,
    headers: {
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
  return await res.json()
}

export async function addSelection(category_id: number, entry_id: number) {
    console.log('API POST CALLED');
    const response = await fetch('/selections', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "category_id": Number(category_id), "entry_id": Number(entry_id), "user_id": 0 }),
    });
    const body = await response.text();
    return (body);
}