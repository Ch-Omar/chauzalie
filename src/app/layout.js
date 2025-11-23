import "bootstrap/dist/css/bootstrap.min.css";
import ClientNavbar from "../components/clientNavbar";

export const metadata = { title: "Dashboard" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}