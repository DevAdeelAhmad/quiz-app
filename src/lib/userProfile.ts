// @/lib/userProfileUtils.ts

import { auth } from "./firebase";
import { updateProfile, User } from "firebase/auth";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "./firebase"; 

export const updateUserProfile = async (userData: {
  displayName?: string;
  email?: string;
}): Promise<void> => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, userData);
    } catch (error : any) {
      throw new Error(`Error updating user profile: ${error.message}`);
    }
  } else {
    throw new Error("No authenticated user found.");
  }
};

export const uploadUserProfileImage = async (
  file: File,
  userId: string | null
): Promise<string> => {
  const user = auth.currentUser;
  if (user && userId) {
    try {
      const storageReference = storageRef(
        storage,
        `userProfileImages/${userId}`
      );
      await uploadBytes(storageReference, file);

      const imageUrl = await getDownloadURL(storageReference);
      return imageUrl;
    } catch (error: any) {
      throw new Error(`Error uploading user profile image: ${error.message}`);
    }
  } else {
    throw new Error("No authenticated user found or userId is null.");
  }
};
