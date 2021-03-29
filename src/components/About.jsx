import "./About.css";

function About(props) {
  const data = props.data;

  return (
    <>
      <section id="infos" class="section1">
        <div class="container-section">
          <article class="content-apropos">
            <h2>{data.title}</h2>
            <div class="apropos-right">
              <h3>{data.headline}</h3>
              <p>{data.content}</p>
            </div>
          </article>
          <article class="container-img img-info">
            <img src="../static/img1.jpg" alt="" />
          </article>
        </div>
      </section>
    </>
  );
}

export default About;
