import "bootstrap/dist/css/bootstrap.min.css";
import ClientNavbar from "../components/clientNavbar";
import Footer from "@/components/footer";

export const metadata = { title: "Dashboard" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientNavbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}