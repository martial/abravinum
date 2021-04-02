import "./About.css";
import AOS from "aos";
import "aos/dist/aos.css";

function About(props) {
  const data = props.data;

  AOS.init();

  return (
    <>
      <section
        id="infos"
        class="section1"
        data-aos="fade-up"
        data-aos-offset="100"
        data-aos-delay="50"
        data-aos-duration="800"
      >
        <div class="container-section">
          <article class="content-apropos">
            <h2>{data.title}</h2>
            <div class="apropos-right">
              <h3>{data.headline}</h3>
              <p>{data.content}</p>
            </div>
          </article>
          <article class="container-img img-info">
            <img src="../static/img-about.jpg" alt="" />
          </article>
        </div>
      </section>
    </>
  );
}

export default About;
