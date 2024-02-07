import Sidebar from "@/components/commons/Sidebar";
import TabList from "@/components/profile/Tabs";

const ProfilePage = () => {
  return (
    <main className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-col items-center w-full py-10 gap-5">
        <TabList />
      </div>
    </main>
  );
};

export default ProfilePage;
