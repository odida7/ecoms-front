import { Inter } from "next/font/google";
import "../globals.css";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Providers from "@/lib/redux/Provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (

    <AuthProvider>
      
        <html lang="en">
         <body className={inter.className}>
          <Providers>
             <div className='flex flex-col'>
              <Toaster position='top center' reverseOrder={false}/>
            <Navbar/>

            <div>
             {children}
            </div> 

           </div>
          </Providers>
          
         
       
         </body>
        </html>
      
      
    </AuthProvider>
    
  );
}
