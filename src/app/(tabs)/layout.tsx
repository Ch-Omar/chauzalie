import ClientNavbar from "../../components/layout/clientNavbar";
import Footer from "@/components/layout/footer";

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