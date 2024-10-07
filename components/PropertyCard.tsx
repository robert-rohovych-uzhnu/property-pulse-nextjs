import Image from "next/image";
import Link from "next/link";
import {FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker} from "react-icons/fa";
import {FunctionComponent} from "react";
import {getRateDisplay} from "@/utils/getRateDisplay";

type PropertyCardProps = {
    property: {
        _id: string;
        owner: string;
        name: string;
        type: string;
        description: string;
        location: {
            street: string;
            city: string;
            state: string;
            zipcode: string;
        };
        square_feet: number;
        images: string[];
        price: number;
        beds: number;
        amenities: string[];
        baths: number;
        size: number;
        rates: {
            weekly?: number;
            monthly?: number;
            nightly?: number;
        };
        is_featured: boolean;
        "seller_info": {
            "name": string;
            "email": string;
            "phone": string;
        },
        updatedAt: string;
    }
};

const PropertyCard: FunctionComponent<PropertyCardProps> = ({property}) => {
    return (
        <div className="rounded-xl shadow-md relative">
            <Link
                href={`/properties/${property._id}`}
            >
                <Image
                    width={400}
                    height={300}
                    src={property.images[0]}
                    alt=""
                    className="w-full h-auto rounded-t-xl"
                />
            </Link>
            <div className="p-4">
                <div className="text-left md:text-center lg:text-left mb-6">
                    <div className="text-gray-600">Apartment</div>
                    <h3 className="text-xl font-bold">{property.name}</h3>
                </div>
                <h3
                    className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
                >
                    {getRateDisplay(property)}
                </h3>

                <div className="flex justify-center gap-4 text-gray-500 mb-4">
                    <p>
                        <FaBed className='md:hidden lg:inline'/> {property.beds}
                        <span className="md:hidden lg:inline ml-1">Beds</span>
                    </p>
                    <p>
                        <FaBath className='md:hidden lg:inline'/> {property.baths}
                        <span className="md:hidden lg:inline ml-1">Baths</span>
                    </p>
                    <p>
                        <FaRulerCombined className='md:hidden lg:inline'/>
                        {property.square_feet} <span className="md:hidden lg:inline ml-1">sqft</span>
                    </p>
                </div>

                <div
                    className="flex justify-center gap-4 text-green-900 text-sm mb-4"
                >
                    <p><FaMoneyBill className='md:hidden lg:inline'/> Weekly</p>
                    <p><FaMoneyBill className='md:hidden lg:inline'/> Monthly</p>
                </div>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                        <FaMapMarker className='md:hidden lg:inline text-orange-700 mt-1'/>
                        <span className="text-orange-700"> {property.location.city} {property.location.state} </span>
                    </div>
                    <Link
                        href={`/properties/${property._id}`}
                        className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default PropertyCard;
