import NavbarAmin from "@/components/layout/navbarAdmin";

export const metadata = { title: "Admin" };

export default function RootLayout({ children }) {
  return (
    <div>
      <NavbarAmin />
      <div>{children}</div>
    </div>
  );
}