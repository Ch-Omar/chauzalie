"use client";

import MainSlider from "./slider";


export default function HomePage() {


  return (
    <>
    {/* <MainSlider /> */}
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <img
                src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Featured Shoe"
                className="img-fluid hero-image"
              />
            </div>

            <div className="col-lg-6">
              <div className="hero-content">
                <h1 className="display-4 fw-bold mb-3">
                  New <br />
                  <span className="text-dark">COLLECTION</span>
                </h1>

                <p className="lead text-muted mb-4">
                  Discover our latest collection of premium footwear. From
                  casual sneakers to elegant dress shoes, find your perfect
                  pair.
                </p>

                <div className="price-section mb-4">
                  <span className="text-muted">Starting</span>
                  <span className="price-tag">$150.00</span>
                </div>

                <div className="hero-buttons">
                  <button className="btn btn-dark me-3">SHOP NOW</button>
                  <button className="btn btn-outline-dark">DISCOVER</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title mb-4">new arrivals</h2>

          <div className="row">
            <div className="col-md-4 mb-4">
              <img
                src="https://images.pexels.com/photos/6594253/pexels-photo-6594253.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Black Boots"
                className="img-fluid rounded"
              />
            </div>

            <div className="col-md-4 mb-4">
              <img
                src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Modern Sneakers"
                className="img-fluid rounded"
              />
            </div>

            <div className="col-md-4 mb-4">
              <img
                src="https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Leather Loafers"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title mb-4">featured products</h2>

          <div className="row" id="featured-products">
            {/* Here you put dynamic products later */}
          </div>
        </div>
      </section>

      {/* SALE BANNER */}
      <section className="sale-banner py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <img
                src="https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Sale Products"
                className="img-fluid rounded"
              />
            </div>

            <div className="col-lg-4 text-center">
              <div className="sale-badge">SALE ON PRODUCT 40%</div>
              <button className="btn btn-dark mt-3">SHOP COLLECTION</button>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-5 text-center">
        <div className="container">
          <h3 className="mb-3">
            SALE UP TO 60% OFF FOR 1000+ PRODUCTS
          </h3>
          <button className="btn btn-dark">UP TO 60% OFF</button>
        </div>
      </section>

      {/* MODAL */}
      <div className="modal fade" id="productModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Product Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>

            <div className="modal-body">
              <img
                src="https://images.pexels.com/photos/19090/pexels-photo.jpg"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
