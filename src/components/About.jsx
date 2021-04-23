import "./About.css";

function About(props) {
  const data = props.data;

  const contentObj = {
    __html: data.content.replace(/(?:\r\n|\r|\n)/g, "<br>"),
  };

  return (
    <>
      <section
        id="infos"
        class="section1"
        data-aos="fade-up"
        data-aos-offset="50"
        data-aos-delay="50"
        data-aos-duration="600"
      >
        <div class="container-section">
          <article class="content-apropos">
            <h2>{data.title}</h2>
            <div class="about-txt">
              <h3>&nbsp;</h3>
              <p dangerouslySetInnerHTML={contentObj}></p>
            </div>
          </article>
          <article class="container-img img-info">
            <img src="../static/images/resized005.jpg" alt="" />
          </article>
        </div>
      </section>
    </>
  );
}

export default About;
