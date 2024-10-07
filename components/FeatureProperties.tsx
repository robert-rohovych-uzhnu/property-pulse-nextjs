import Property from "@/models/Property";
import {FunctionComponent} from "react";
import PropertyCard from "@/components/PropertyCard";
import FeaturePropertyCard from "@/components/FeaturePropertyCard";

type FeaturePropertiesParams = {
}

/**
 * @name FeatureProperties
 * @constructor
 */
const FeatureProperties: FunctionComponent<FeaturePropertiesParams> = async () => {
    const properties = await Property.find({is_featured: true}).lean();

    return properties.length ? (
        <section className="bg-blue-50 px-4 pt-6 pb-10">
            <div className="container-xl lg:container mx-auto">
                <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Featured Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {properties.map((property: any) => (
                        <FeaturePropertyCard key={property._id} property={property}/>
                    ))}
                </div>
            </div>
        </section>
    ) : null;
}

export default FeatureProperties;
