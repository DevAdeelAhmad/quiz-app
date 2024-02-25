import { DocumentData, collection, getDocs } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

interface Category {
  id: string;
  categoryLink: string;
  imageUrl: string;
  name: string;
}

const getCategories = async (): Promise<Category[]> => {
  try {
    const categoriesCollection = collection(firestore, "category");
    const snapshot = await getDocs(categoriesCollection);

    return snapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData;
      return {
        id: doc.id,
        categoryLink: data.categoryLink as string,
        imageUrl: data.imageUrl as string,
        name: data.name as string,
      };
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export default getCategories;
