"use client";

import { CSSProperties, useRef } from "react";
import Slider from "react-slick";
import Link from "next/link";
import '@/styles/home.scss'

export default function MainSlider() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false, // we use custom ones
  };

  const slides = [
    {
      image: "/images/slide-01.jpg",
      small: "Women Collection 2018",
      title: "NEW SEASON",
    },
    {
      image: "/images/slide-02.jpg",
      small: "Men New-Season",
      title: "Jackets & Coats",
    },
    {
      image: "/images/slide-03.jpg",
      small: "Men Collection 2018",
      title: "New arrivals",
    },
  ];

  return (
    <section className="section-slide" style={{ position: "relative" }}>
      {/* CUSTOM BUTTONS */}
      <button
        onClick={() => sliderRef.current.slickPrev()}
        style={arrowStyle("left")}
      >
        ‹
      </button>

      <button
        onClick={() => sliderRef.current.slickNext()}
        style={arrowStyle("right")}
      >
        ›
      </button>

      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className="item-slick1"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "90vh",
                padding: "20px"
              }}
            >
              <div className="container h-full">
                <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">

                  <span className="ltext-101 cl2 respon2">
                    {slide.small}
                  </span>

                  <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                    {slide.title}
                  </h2>

                  <Link
                    href="/product"
                    className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                  >
                    Shop Now
                  </Link>

                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

/* Arrow Style */
const arrowStyle = (position: "left" | "right"): CSSProperties => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    [position]: "20px",
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    border: "none",
    padding: "10px 10px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "30px",
  });