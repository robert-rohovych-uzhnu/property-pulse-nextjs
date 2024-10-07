'use server';

import {getSessionUser} from "@/utils/getSessionUser";
import Message from "@/models/Message";

async function getUnreadMessageCount() {
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
        throw new Error("User ID is required");
    }
    const {userId} = sessionUser;

    const count = await Message.countDocuments({recipient: userId, read: false});

    return {count}
}

export {getUnreadMessageCount};
