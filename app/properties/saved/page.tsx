import {FunctionComponent} from "react";
import {getSessionUser} from "@/utils/getSessionUser";
import User from "@/models/User";
import PropertyCard from "@/components/PropertyCard";

type SavedPropertiesPageProps = {
    properties: any
}

/**
 * @name SavedPropertiesPage
 * @constructor
 */
const SavedPropertiesPage: FunctionComponent<SavedPropertiesPageProps> = async () => {

    const sessionUser = await getSessionUser();
    const userId = sessionUser?.userId;

    const {bookmarks} = await User.findById(userId).populate('bookmarks');

    return (
        <section className='px-4 py-6'>
            <div className='container lg:container m-auto px-4 py-6'>
                <h1 className="text-2xl mb-4">Saved Properties</h1>
                {bookmarks.length === 0 ? (<p>no saved bookmarks</p>) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {bookmarks.map((property: any) => (
                            <PropertyCard property={property} key={property._id}/>
                        ))
                        }
                    </div>
                )
                }
            </div>
        </section>
    );
}

export default SavedPropertiesPage;
