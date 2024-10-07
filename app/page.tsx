import React from "react";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import connectDB from "@/config/database";
import FeatureProperties from "@/components/FeatureProperties";

/**
 *
 * @constructor
 * @name HomePage
 */
const HomePage = async () => {
    await connectDB();
    return (
        <div>
            <Hero />
            <InfoBoxes />
            <FeatureProperties />
            <HomeProperties />
        </div>
    );
}

export default HomePage;
