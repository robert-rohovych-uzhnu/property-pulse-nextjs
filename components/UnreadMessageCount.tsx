'use client';

import {FunctionComponent} from "react";
import {useGlobalContext} from "@/context/GlobalContext";

type UnreadMessageCountProps = {}

/**
 * @name UnreadMessageCount
 * @param count
 * @constructor
 */
const UnreadMessageCount: FunctionComponent<UnreadMessageCountProps> = () => {
    const {unreadCount}: any = useGlobalContext();
    return (
        <span
            className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
        >
                {unreadCount}
              </span>
    )
}

export default UnreadMessageCount;
