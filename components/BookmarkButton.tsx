'use client';
import {FaBookmark} from "react-icons/fa";
import {useSession} from "next-auth/react";
import {toast} from "react-toastify";
import {bookmarkProperty} from "@/app/actions/bookmarkProperty";
import {FunctionComponent, useEffect, useState} from "react";
import {checkBookmarkStatus} from "@/app/actions/checkBookmarkStatus";
import Spinner from "@/components/Spinner";

type BookmarkButtonProps = {
    property: any
}

/**
 * @name BookmarkButton
 * @param property
 * @constructor
 */
const BookmarkButton: FunctionComponent<BookmarkButtonProps> = ({ property }) => {
    const {data: session} = useSession();
    const userId = session?.user;

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        checkBookmarkStatus(property._id).then((res: any) => {
            if (res.error) {
                return toast.error(res.error);
            }
            if (res.isBookmarked) {
                setIsBookmarked(true);
            }
            setLoading(false);
        })
    }, []);

    const handleClick = () => {
        if (!session?.user) {
            toast.error('Please sign in to bookmark this property');
            return;
        }

        bookmarkProperty(property._id).then((res: any) => {
            if (res.error) {
                return toast.error(res.error);
            }

            setIsBookmarked(res.isBookmarked);
            toast.success(res.message);
        })
    }
    if (loading) return (
        <p className='text-center'>Loading... </p>
    );

  return isBookmarked ? (
      <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
          onClick={handleClick}
      >
        <FaBookmark className='mr-2' /> Remove Bookmark
      </button>
  ) : (
      <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
          onClick={handleClick}
      >
          <FaBookmark className='mr-2'/> Bookmark Property
      </button>
  );
}

export default BookmarkButton;
