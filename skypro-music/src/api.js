export async function getAllTracks() {
  const response = await fetch('https://skypro-music-api.skyeng.tech/catalog/track/all/');
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Что-то случилось');
  }
  return data;
}

export async function registerUser({ email, password, username }) {
  const response = await fetch('https://skypro-music-api.skyeng.tech/user/signup/', {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
      username: username,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error('Что-то случилось с регистрацией')
  }
  const status = response.status;
  const data = await response.json();
  const object = { status: status, data: data }
  
  return object;
}


export async function loginUser({ email, password }){
  const response = await fetch("https://skypro-music-api.skyeng.tech/user/login/", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,        
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if(response.status === 500){
      throw new Error('Сервер сломан');
    }

    const status = response.status;
    const data = await response.json();
    const object = await {status:status, data:data};
    return object;   
    
  }