'use client';

import {createContext, useContext, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {getUnreadMessageCount} from "@/app/actions/getUnreadMessageCount";

const GlobalContext: any = createContext();

export function GlobalProvider({children}: any) {
    const [unreadCount, setUnreadCount] = useState(0);

    const {data: session} = useSession();

    const updateUnreadMessageCount = async () => {
        if (session && session.user) {
            const {count} = await getUnreadMessageCount();
            if (count !== undefined) {
                setUnreadCount(count);
            }
        }
    }

    useEffect(() => {
        updateUnreadMessageCount();
    }, [getUnreadMessageCount, session]);

    return (
        <GlobalContext.Provider value={{unreadCount, setUnreadCount, updateUnreadMessageCount}}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}
