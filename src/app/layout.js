import Navbar from "../components/navbar";

export const metadata = {
  title: "Admin Dashboard",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
