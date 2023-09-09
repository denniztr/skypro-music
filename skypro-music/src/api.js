export async function getAllTracks() {
  const response = await fetch('https://painassasin.online/catalog/track/all/');
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Что-то случилось');
  }
  return data;
}
//  https://51.250.95.23/swagger/
