import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaUserEdit } from "react-icons/fa"
import { MdQuiz } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import PasswordTab from "./PasswordTab"
import ProfileTab from "./ProfileTab"
import QuizTab from "./QuizTab"
const TabList = () => {
    return (
        <Tabs className="w-full max-w-5xl px-2" defaultValue="profile">
            <TabsList className="w-full flex gap-2">
                <TabsTrigger className="flex flex-1 items-center gap-2 text-xs sm:text-base bg-slate-200 focus:bg-black" value="profile">
                    Profile<FaUserEdit />
                </TabsTrigger>
                <TabsTrigger className="flex flex-1 items-center gap-2 text-xs sm:text-base bg-slate-200" value="change-password">
                    Password<RiLockPasswordFill />
                </TabsTrigger>
                <TabsTrigger className="flex flex-1 items-center gap-2 text-xs sm:text-base bg-slate-200" value="quiz">
                    Quiz<MdQuiz />
                </TabsTrigger>

            </TabsList>
            <TabsContent value="profile">
                <ProfileTab />
            </TabsContent>
            <TabsContent value="change-password">
                <PasswordTab />
            </TabsContent>
            <TabsContent value="quiz">
                <QuizTab />
            </TabsContent>
        </Tabs>
    )
}

export default TabList