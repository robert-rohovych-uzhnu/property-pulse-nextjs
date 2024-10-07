import Property from "@/models/Property";

export const GET = async () => {
    try {

        const properties = await Property.find({}).sort({createdAt: -1}).lean();

        return new Response(JSON.stringify(properties), {
            status: 200,
        });
    } catch (error) {
        return new Response("something went wrong", {
            status: 500,
        });

    }
}
