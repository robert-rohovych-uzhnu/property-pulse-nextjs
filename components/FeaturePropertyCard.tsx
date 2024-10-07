import {FunctionComponent} from "react";
import Link from "next/link";
import Image from "next/image";
import {FaBath, FaBed, FaMapMarker, FaMoneyBill, FaRulerCombined} from "react-icons/fa";
import {getRateDisplay} from "@/utils/getRateDisplay";

type FeaturePropertyCardParams = {
    property: any
}

/**
 * @name FeaturePropertyCard
 * @constructor
 */
const FeaturePropertyCard: FunctionComponent<FeaturePropertyCardParams> = ({property}) => {
    return (
        <div className="flex bg-white rounded-xl shadow-md relative flex-row">
            <Image
                width={0}
                height={0}
                sizes='100vw'
                src={property.images[0]}
                alt=""
                className="h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
            />
            <div className="p-6">
                <div className="text-left md:text-center lg:text-left mb-6">
                    <div className="text-gray-600">{property.name}</div>
                    <h3 className="text-xl font-bold">{property.type}</h3>
                </div>
                <h3
                    className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
                >
                    {getRateDisplay(property)}
                </h3>

                <div className="flex justify-center gap-4 text-gray-500 mb-4">
                    <p>
                        <FaBed className='inline-block mr-2'/> {property.beds} {' '}
                        <span className="md:hidden lg:inline">Beds</span>
                    </p>
                    <p>
                        <FaBath className='inline-block mr-2'/> {property.baths}
                        <span className="md:hidden lg:inline">Baths</span>
                    </p>
                    <p>
                        <FaRulerCombined className='inline-block mr-2'/>
                        {property.square_feet} <span className="md:hidden lg:inline">sqft</span>
                    </p>
                </div>

                <div
                    className="flex justify-center gap-4 text-green-900 text-sm mb-4"
                >
                    {
                        property.rates.nightly && (
                            <p><FaMoneyBill className='inline-block mr-2'/> Weekly</p>
                        )
                    }
                    {
                        property.rates.weekly && (
                            <p><FaMoneyBill className='inline-block mr-2'/> Weekly</p>
                        )
                    }
                    {
                        property.rates.monthly && (
                            <p><FaMoneyBill className='inline-block mr-2'/> Monthly</p>
                        )
                    }
                </div>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                        <FaMapMarker className='text-orange-700' />
                        <span className="text-orange-700"> {property.location.city } {property.location.state} </span>
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
    );
}

export default FeaturePropertyCard;
