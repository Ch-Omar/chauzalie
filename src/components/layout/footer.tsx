export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">

        <h5 className="fw-bold mb-3">About Our Website</h5>
        <p className="mb-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          tincidunt nisi at urna rutrum, vel tincidunt risus faucibus. Sed
          facilisis magna at justo fermentum, eu vulputate odio malesuada.
        </p>

        <p className="mb-0">
          © {year} All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}
