export async function getAllTracks() {
  const response = await fetch('https://skypro-music-api.skyeng.tech/catalog/track/all/');
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Что-то случилось');
  }
  return data;
}

export async function registerUser({ email, password, username}) {
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
  const data = await response.json();
  return data;
}

export async function loginUser({ email, password }) {
  const response = await fetch('https://skypro-music-api.skyeng.tech/user/login/', {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "content-type": "application/json",
    },
  })
  if (!response.ok) {
    throw new Error('Что-то не так с авторизацией')
  }
  const data = await response.json();
  return data;
}
