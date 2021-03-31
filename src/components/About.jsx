import "./About.css";

function About(props) {
  const data = props.data;

  const descrObj = {
    __html: data.content.replace(/(?:\r\n|\r|\n)/g, "<br>"),
  };

  return (
    <>
      <section id="infos">
        <article className="content-apropos">
          <h2>{data.title}</h2>
          <h3>{data.headline}</h3>
          <p dangerouslySetInnerHTML={descrObj}></p>
          <a href="https://abravinum.com/pdf/DEV01753459.PDF">
            Accéder au bon de commande
          </a>
          <div
            class="container-polyedre para container-polyedre-apropos"
            data-rellax-speed="1.8"
          >
            <img src="static/polyedre-2.png" alt="" />
          </div>
        </article>
        <article id="container-apropos-img"></article>
      </section>
    </>
  );
}

export default About;
