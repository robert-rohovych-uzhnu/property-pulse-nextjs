'use client';

import {FunctionComponent, useState} from "react";
import {markMessageAsRead} from "@/app/actions/markMessageAsRead";
import {toast} from "react-toastify";
import deleteMessage from "@/app/actions/deleteMessage";
import {useGlobalContext} from "@/context/GlobalContext";

type MessageCardProps = {
    message: any;
}

/**
 * @name MessageCard
 * @param message
 * @constructor
 */
const MessageCard: FunctionComponent<MessageCardProps> = ({ message }) => {
    const [isRead, setIsRead] = useState(message.read);
    const [isDeleted, setIsDeleted] = useState(false);

    const {updateUnreadMessageCount}: any = useGlobalContext();

    const handleReadClick = async () => {
        const read = await markMessageAsRead(message._id);

        setIsRead(read);
        updateUnreadMessageCount();
        toast.success(`Marked as ${read ? 'read' : 'unread'}`);
    }

    const handleDeleteClick = async () => {
        await deleteMessage(message._id);
        updateUnreadMessageCount();
        setIsDeleted(true);
        toast.success('Message deleted');
    }

    if (isDeleted) {
        return <p>Deleted Message</p>
    }

    return (
        <div className="relative bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            {
                !isRead && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
                        Unread
                    </div>
                    )
            }
            <h2 className="text-lg font-bold mb-4">{message.sender.username} sent you a message</h2>
            <p>{message.body}</p>
            <strong>Recieved: {new Date(message.createdAt).toLocaleString()}</strong>
            <div>

                <button onClick={handleReadClick} className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md">
                    {isRead ? 'Mark as Unread' : 'Mark as Read'}
                </button>
                <button
                    onClick={handleDeleteClick}
                    className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
                    Delete
                </button>
            </div>
        </div>
);
}

export default MessageCard;
