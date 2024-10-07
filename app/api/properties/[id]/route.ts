import Property from "@/models/Property";

export const GET = async (request: any, {params}: any) => {
    try {

        const property = await Property.findById(params.id).lean();

        if (!property) {
            return new Response("property not found", {
                status: 404,
            });
        }

        return new Response(JSON.stringify(property), {
            status: 200,
        });
    } catch (error) {
        return new Response("something went wrong", {
            status: 500,
        });

    }
}
