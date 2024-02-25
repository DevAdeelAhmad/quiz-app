import Sidebar from "@/components/commons/Sidebar";
import QuizTab from "@/components/profile/QuizTab";

const ProfilePage = () => {
  return (
    <main className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-col items-center w-full py-10 gap-5">
        <QuizTab />
      </div>
    </main>
  );
};

export default ProfilePage;
