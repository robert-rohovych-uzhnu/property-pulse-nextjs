'use server';

import {getSessionUser} from "@/utils/getSessionUser";
import Message from "@/models/Message";
import {revalidatePath} from "next/cache";

async function deleteMessage(messageId: string) {

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required.');
    }

    const {userId} = sessionUser;

    const message = await Message.findById(messageId);

    if (message.recipient.toString() !== userId) {
        throw new Error('You are not authorized to delete this message.');
    }

    await message.deleteOne();

    revalidatePath('/', 'layout');
}

export default deleteMessage;
