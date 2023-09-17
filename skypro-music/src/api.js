export async function getAllTracks() {
  const response = await fetch('https://skypro-music-api.skyeng.tech/catalog/track/all/');
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Что-то случилось');
  }
  return data;
}
