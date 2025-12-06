export default function AboutUs() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">About Us</h1>
        <p className="text-muted">Learn more about who we are and what we do.</p>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <img
            src="https://picsum.photos/600/400"
            alt="About us"
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-6">
          <h3 className="fw-bold">Our Story</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec
            faucibus dui. Vivamus volutpat, dolor a gravida dapibus, lorem arcu
            cursus libero, a tincidunt lorem urna a justo.
          </p>

          <h3 className="fw-bold mt-4">Our Mission</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ex
            nunc, mattis eget semper a, ultricies at lectus.
          </p>

          <h3 className="fw-bold mt-4">Why Choose Us?</h3>
          <ul>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
            <li>Vestibulum ante ipsum primis in faucibus orci luctus.</li>
            <li>Aliquam erat volutpat. Sed feugiat risus et velit viverra.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
