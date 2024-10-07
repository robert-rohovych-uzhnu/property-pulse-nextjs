'use server';
import User from "@/models/User";
import {getSessionUser} from "@/utils/getSessionUser";

async function checkBookmarkStatus(propertyId: string) {
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
        throw new Error("User ID is required");
    }
    const {userId} = sessionUser;
    const user = await User.findById(userId);
    let isBookmarked = user.bookmarks.includes(propertyId);
    return {isBookmarked};
}

export {checkBookmarkStatus};
