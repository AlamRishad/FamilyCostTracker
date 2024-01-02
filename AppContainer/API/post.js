import { API_URL } from "./config";
export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/Post`);
    const data = await response.json();
    //  console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching posts:", error);
    throw error;
  }
};
