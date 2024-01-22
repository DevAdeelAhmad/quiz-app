import { database } from "@/lib/firebase";
import { ref, get } from "firebase/database";

interface Category {
  id: string;
  categoryLink: string;
  imageUrl: string;
  name: string;
}

const getCategories = async (): Promise<Category[]> => {
  try {
    const categoriesRef = ref(database, "categories");
    const snapshot = await get(categoriesRef);
    const categoriesData = snapshot.val();

    if (categoriesData) {
      return Object.entries(categoriesData).map(([id, value]) => ({
        id,
        ...(value as { [key: string]: string }),
      })) as Category[];
    }

    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export default getCategories;
