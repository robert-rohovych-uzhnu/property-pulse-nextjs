import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                }
            }
        })
    ],
    callbacks: {
        // invoked on successful sign in
        async signIn({profile}: any) {
            const userExists = await User.findOne({email: profile.email});

            if (!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name,
                    image: profile.picture,
                });
            }
            return true;
        },
        async session({session}: any) {
            const user = await User.findOne({email: session.user.email});
            session.user.id = user._id.toString();

            return session;
        },
    }
};
