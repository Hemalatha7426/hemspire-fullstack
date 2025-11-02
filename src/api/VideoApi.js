export async function getAllVideos() {
const response = await fetch("https://hemspire-fullstack.onrender.com/api/videos");
  return await response.json();
}
