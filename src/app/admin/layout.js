export default function AdminLayout({ children }) {
  return (
    <div>
      <header>
        <h2>Admin Panel</h2>
      </header>
      <main>{children}</main>
    </div>
  );
}
