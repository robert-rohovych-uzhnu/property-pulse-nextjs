'use server';

import {getSessionUser} from "@/utils/getSessionUser";
import Property from "@/models/Property";
import cloudinary from "@/config/cloudinary";
import {revalidatePath} from "next/cache";

async function deleteProperty(propertyId) {
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error("User ID is required");
    }

    const property = await Property.findById(propertyId);

    if (!propertyId) {
        throw new Error("Property not found");
    }

    if (property.owner.toString() !== sessionUser.userId) {
        throw new Error("Unauthorized");
    }



    const publicIds = property.images.map((image: string) => {
        const parts = image.split('/');
        return parts?.at(-1)?.split('.')?.at(0) ?? "";
    });

    if (publicIds.length) {
        for (let publicId of publicIds) {
            await cloudinary.uploader.destroy(`propertypulse/${publicId}`);
        }
    }

    await property.deleteOne();

    revalidatePath('/', 'layout');
}

export default deleteProperty;
