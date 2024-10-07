import PropertyCard from "./PropertyCard";
import Link from "next/link";
import Property from "@/models/Property";
import {Key} from "react";

const HomeProperties = async () => {
    const recentProperties = await Property
        .find({}).sort({createdAt: -1}).limit(3).lean();

    return (
        <>
            <section className='px-4 py-6'>
                <div className="container-xl lg:container mx-auto px-4 py-6"></div>
                {
                    recentProperties.length === 0 ? (<p>no properties found</p>) : (
                        <div className="container-xl lg:container m-auto px-4 py-6">
                            <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'></h2>
                            {recentProperties.map((property) => (
                                <PropertyCard key={property._id as Key} property={property}/>
                            ))}
                        </div>
                    )
                }
            </section>
            <section className='m-auto max-w-lg my-4 px-6'>
                <Link href={'/properties'}
                      className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
                >
                    View All Properties
                </Link>
            </section>
        </>
    );
}

export default HomeProperties;
