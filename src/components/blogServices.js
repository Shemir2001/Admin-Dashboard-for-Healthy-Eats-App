import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase.js";

// Fetch all blogs
export const fetchBlogs = async () => {
  const snapshot = await getDocs(collection(db, "blogsTest2"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Delete a blog
export const deleteBlog = async (id) => {
  const blogRef = doc(db, "blogsTest2", id);
  await deleteDoc(blogRef);
};
