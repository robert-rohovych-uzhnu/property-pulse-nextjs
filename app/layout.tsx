import {FunctionComponent, ReactNode} from 'react';
import '@/assets/styles/globals.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/config/database";
import AuthProvider from "@/components/AuthProvider";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GlobalProvider} from "@/context/GlobalContext";
import 'photoswipe/dist/photoswipe.css';

type MainLayoutProps = {
    children: ReactNode;
};

export const metadata = {
    title: 'Property Pulse',
    keywords: 'property, real estate, buy, sell, rent, property pulse',
    description: 'Property Pulse is a real estate platform that helps you find the perfect property for you.'
}

/**
 * @name MainLayout
 * @param children
 * @constructor
 */
const MainLayout: FunctionComponent<MainLayoutProps> = async ({children}) => {
    await connectDB();
    return (
        <AuthProvider>
            <GlobalProvider>
                <html>
                    <body>
                        <Navbar/>
                        <main>{children}</main>
                        <Footer/>
                        <ToastContainer/>
                    </body>
                </html>
            </GlobalProvider>
        </AuthProvider>);
}

export default MainLayout;
