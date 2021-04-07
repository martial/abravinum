import "./Contact.css";

function Contact(props) {
  const data = props.data;

  const contentObj = {
    __html: data.content.replace(/(?:\r\n|\r|\n)/g, "<br>"),
  };

  return (
    <>
      <section id="contact">
        <h2 id="section3">{data.title}</h2>

        <div class="content-contact">
          <h5>{data.headline}</h5>
          <p>
            Téléphone : <span dangerouslySetInnerHTML={contentObj}></span>
          </p>
          <p>
            E-mail : <span>{data.content2}</span>
          </p>
        </div>
        <div class="catalogue">
          <a href="https://www.abravinum.com/pdf/catalogue.pdf">
            Accès au catalogue
          </a>
        </div>
      </section>

      <footer>
        <div class="reseaux">
          <a href="">
            <span>Facebook</span>
          </a>
          <a href="">
            <span>Twitter</span>
          </a>
          <a href="">
            <span>Instagram</span>
          </a>
        </div>
        <div class="retour-top scroll-link">
          <a href="#home">&#8593;</a>
        </div>
      </footer>
    </>
  );
}

export default Contact;
