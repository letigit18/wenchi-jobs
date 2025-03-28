

import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/redux/Providers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wenchi Jobs",
  description: "Wenchijobs.com is the platform that connects job seekers and employers that are found in Ethiopia. The website is built with the intention of connecting the right talents to the posted jobs, and realize reliable recruitment process",
  icons: {
    icon: '/favicon.png', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
       <title>Wenchi Jobs</title>
       <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
       <meta title={metadata.title} description={metadata.description} />
       <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.2.1/moment.min.js"></script>
      </head>   
      <body className={inter.className}>
         <Provider>
          {children}
         </Provider>
         <ToastContainer />
      </body>
    </html>
  );
}
