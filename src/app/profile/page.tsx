"use client"
import Sidebar from '@/components/commons/Sidebar'
import TabList from '@/components/profile/Tabs'
import { UserAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const ProfilePage = () => {
    const router = useRouter();
    const { user } = UserAuth();
    if (!user && typeof window !== 'undefined') {
        router.push('/signin');
    }
    else
        return (
            <main className="flex min-h-screen w-full">
                <Sidebar />
                <div className="flex flex-col items-center w-full py-10 gap-5">
                    <TabList />
                </div>
            </main>
        )
}

export default ProfilePage

