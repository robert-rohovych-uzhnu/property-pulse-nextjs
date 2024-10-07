'use server';
import {getSessionUser} from "@/utils/getSessionUser";
import Message from "@/models/Message";
import {revalidatePath} from "next/cache";

async function markMessageAsRead(messageId: string) {
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
        throw new Error("User ID is required");
    }
    const {userId} = sessionUser;

    const message = await Message.findById(messageId);
    if (message.recipient.toString() !== userId) {
        throw new Error("You are not authorized to mark this message as read");
    }

    message.read = !message.read;

    await message.save();

    revalidatePath('/messages', 'page');
    return message.read;
}

export {markMessageAsRead};
