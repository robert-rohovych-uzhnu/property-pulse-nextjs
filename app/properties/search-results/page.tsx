import React, {FunctionComponent} from "react";
import Property from "@/models/Property";
import {convertToSerializableObject} from "@/utils/convertToObject";
import PropertySearchForm from "@/components/PropertySearchForm";
import Link from "next/link";
import {FaArrowAltCircleLeft} from "react-icons/fa";
import PropertyCard from "@/components/PropertyCard";

type SearchResultsPageProps = {
    searchParams: any
}

/**
 * @name SearchResultsPage
 * @param params
 * @constructor
 */
const SearchResultsPage: FunctionComponent<SearchResultsPageProps> = async (
    {
        searchParams: {
            location,
            propertyType
        }
    }) => {
    const locationPattern = new RegExp(location, 'i');

    let query: any = {
        $or: [
            {name: locationPattern},
            {description: locationPattern},
            {'location.street': locationPattern},
            {'location.city': locationPattern},
            {'location.state': locationPattern},
            {'location.zipcode': locationPattern},
        ]
    }

    if (propertyType !== 'All') {
        const typePattern = new RegExp(propertyType, 'i');
        query.type = typePattern;
    }

    const propertiesQueryResults = await Property.find(query).lean();
    const properties = convertToSerializableObject(propertiesQueryResults);

    return (
        <>
            <section className="bg-blue-700 py-4">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                    <PropertySearchForm />
                </div>
            </section>
            <section className='px-4 py-6'>
                <div className="className container-xl lg:container m-auto px-4 py-6">
                    <Link href="/properties" className='flex items-center text-blue-500 hover:underline mb-3'>
                        <FaArrowAltCircleLeft className='mr-2 mb-1'/> Back to Properties
                    </Link>
                    <h1 className="text-2xl mb-4">Search Results</h1>
                    {properties.length === 0 ? (<p>no properties found</p>) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {properties.map((property: any) => (
                                <PropertyCard key={property._id} property={property}/>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default SearchResultsPage;
