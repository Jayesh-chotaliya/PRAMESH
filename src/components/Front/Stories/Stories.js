import React from "react";
import Navbar from "../Navbar";
import "../../../css/home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../Footer";

const Stories = () => {
  var settings = {
    dots: false,
    cssEase: "linear",
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Navbar />
      <section className="stories">
        <div className="main mt-5">
          <div className="row justify-content-center mb-5">
            <div className="col-xl-6  strLeft">
              <img
                src={process.env.PUBLIC_URL + "/Images/goodearth1.jpg"}
                alt="good Earth"
              />
            </div>
            <div className="col-xl-5  strRight">
              <div>
                <h1>Welcome To The Garden Of Good Earth</h1>
                <h4>Design Collections</h4>
                <p>
                  For 25 years, we have been nurturing a homegrown design and
                  <br /> lifestyle brand that celebrates style from an Indian
                  perspective.
                </p>
                <h4>DISCOVER OUR SHOP</h4>
              </div>
            </div>
          </div>

          <div className="row img justify-content-center">
            <div className="col-xl-6">
              <img
                src={process.env.PUBLIC_URL + "/Images/goodearth2.jpg"}
                alt="good Earth"
              />
            </div>
            <div className="col-xl-6">
              <img
                src={process.env.PUBLIC_URL + "/Images/goodearth1.jpg"}
                alt="good Earth"
              />
            </div>
          </div>

          <div className="row img justify-content-center my-5">
            <div className="col-xl-12">
              <img
                src={process.env.PUBLIC_URL + "/Images/goodearth3.jpg"}
                alt="good Earth"
                id="wide"
              />
            </div>
          </div>

          <h1 className="text-center mb-5">
            'PEHCHAAN' | PRAMESH DOCUMENTARY FILMS
          </h1>

          <div className="row justify-content-center mt-5">
            <div className="col-xl-5">
              <iframe
                width="500"
                height="350"
                src="https://www.youtube.com/embed/CcyJNDrUUcc"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div className="col-xl-5">
              <iframe
                width="500"
                height="350"
                src="https://www.youtube.com/embed/OhczQxPQYe8"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <div className="row eye justify-content-center">
            <div className=" col-xl-5 text-center">
              <h1>Babu Rao Trailer </h1>
              <h3>LEARN MORE</h3>
            </div>
            <div className=" col-xl-5 text-center">
              <h1>Doctor Strange Trailer </h1>
              <h3>LEARN MORE</h3>
            </div>
          </div>

          <div className="row justify-content-center mt-5">
            <div className="col-xl-5">
              <iframe
                width="500"
                height="350"
                src="https://www.youtube.com/embed/RZVkPuwxfgY"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div className="col-xl-5">
              <iframe
                width="500"
                height="350"
                src="https://www.youtube.com/embed/nqUbSvFS1e4"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <div className="row eye justify-content-center">
            <div className=" col-xl-5 text-center">
              <h1>Spider Home Coming Trailer </h1>
              <h3>LEARN MORE</h3>
            </div>
            <div className=" col-xl-5 text-center">
              <h1>Dil Diya Gallan Song </h1>
              <h3>LEARN MORE</h3>
            </div>
          </div>

          <div className="line"></div>

          <h1 className="text-center mb-5">
            TIMELESS: A LIFETIME OF RELATIONSHIPS{" "}
          </h1>
        </div>
      </section>

      <div className="row" style={{background : "#fff" , marginBottom : "3rem"}}>
        <div className="col-xl-12 mx-auto">
          <div className="slickslider">
            <Slider {...settings}>
              <div className="sliderImg">
                <img
                  src={process.env.PUBLIC_URL + "/Images/festive3.png"}
                  alt="img"
                />
                <h3 className="text-center">New Panjabi Sarees</h3>
                <p className="text-center">र 16000</p>
              </div>
              <div className="sliderImg">
                <img
                  src={process.env.PUBLIC_URL + "/Images/festive2.png"}
                  alt="img"
                />
                <h3 className="text-center">New Panjabi Sarees</h3>
                <p className="text-center">र 16000</p>
              </div>

              <div className="sliderImg">
                <img
                  src={process.env.PUBLIC_URL + "/Images/festive1.png"}
                  alt="img"
                />
                <h3 className="text-center">New Panjabi Sarees</h3>
                <p className="text-center">र 16000</p>
              </div>
              <div className="sliderImg">
                <img
                  src={process.env.PUBLIC_URL + "/Images/festive4.png"}
                  alt="img"
                />
                <h3 className="text-center">New Panjabi Sarees</h3>
                <p className="text-center">र 16000</p>
              </div>
              <div className="sliderImg">
                <img
                  src={process.env.PUBLIC_URL + "/Images/festive2.png"}
                  alt="img"
                />
                <h3 className="text-center">New Panjabi Sarees</h3>
                <p className="text-center">र 16000</p>
              </div>
              <div className="sliderImg">
                <img
                  src={process.env.PUBLIC_URL + "/Images/festive1.png"}
                  alt="img"
                />
                <h3 className="text-center">New Panjabi Sarees</h3>
                <p className="text-center">र 16000</p>
              </div>
            </Slider>
          </div>
        </div>
      </div>


      <section className="stories">
          <div className="main">
          <div className="row p-4 mt-5">
            <div className="col-xl-7 strLeft">
              <img
                src={process.env.PUBLIC_URL + "/Images/goodearth4.jpg"}
                alt="good Earth"
              />
            </div>
            <div className="col-xl-5 strRight">
              <div>
                <h1>Jodhpur: Must-Visits In The Royal City</h1>
                <h4>Film Stories</h4>
                <p>
                It is in the twisting alleyways of Jodhpur that <br /> the magic of the Blue City truly comes alive.
                </p>
                <h4>READ MORE</h4>
              </div>
            </div>
          </div>
          </div>
      </section>

      <Footer/>

    </>
  );
};

export default Stories;
