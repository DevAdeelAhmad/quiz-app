import { useState } from 'react';
import { UserAuth } from "@/context/AuthContext";
import Image from "next/image";
import { FaPen } from "react-icons/fa";
import { updateUserProfile, uploadUserProfileImage } from '@/lib/userProfile';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { auth } from '@/lib/firebase';

const ProfileTab = () => {
  const { user } = UserAuth();
  const { toast } = useToast();
  const [image, setImage] = useState(user?.photoURL || '/assets/default-profile.png');
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');


  const handleUpdateProfile = async () => {
    if (!email || !displayName) {
      toast({
        title: "Missing Info!",
        description: "Name and Email are required fields.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    try {
      // Update the user profile
      await updateUserProfile({
        displayName,
        email,
      });

      const updatedUser = auth.currentUser;

      // Update the image only if it exists in the updated user data
      const updatedImage = updatedUser?.photoURL || '/assets/default-profile.png';
      setImage(updatedImage);

      toast({
        title: "Success!",
        description: "Your profile has been updated successfully.",
        variant: "success",
        duration: 3000,
      });
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      toast({
        title: "Error!",
        description: "Error updating profile. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        try {
          setLoading(true);
          const imageUrl = await uploadUserProfileImage(file, user?.uid);
          setImage(imageUrl);
        } catch (error: any) {
          toast({
            title: "Error!",
            description: "Error uploading profile image. Please try again",
            variant: "destructive",
            duration: 3000,
          })
        }
      }
      setLoading(false);
    }
  };

  return (
    <div className='w-full flex flex-col gap-5 justify-center border rounded-xl p-5'>
      <h1 className='text-xl lg:text-2xl font-semibold text-center'>Profile Settings</h1>
      <div className="flex flex-col gap-2 w-full justify-center">
        <div className="flex items-center justify-center w-full gap-5">
          <div className="relative">
            <Image className={`rounded-full border-2 border-first ${loading && "animate-pulse"}`} src={image} width={100} height={100} alt="Profile Image" />
            <Input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="uploadImage" />
            <Label htmlFor="uploadImage" className="absolute top-0 right-0 text-black cursor-pointer">
              <FaPen size={20} />
            </Label>
          </div>
        </div>
        <form className="flex flex-col gap-3">
          <label htmlFor="displayName">Display Name</label>
          <input type="text" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type="button" disabled={loading} onClick={handleUpdateProfile}>Update Profile</Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileTab;