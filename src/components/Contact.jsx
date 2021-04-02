function Contact(props) {
  const data = props.data;
  return (
    <>
      <section id="contact">
        <h2 id="section3">{data.title}</h2>

        <div class="content-contact">
          <h5>{data.headline}</h5>
          <p>
            Téléphone : <span> 06.23.45.81.98</span>
          </p>
          <p>
            E-mail : <span> abra-vinum@info.com</span>
          </p>
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
          <a href="#home">Retour</a>
        </div>
      </footer>
    </>
  );
}

export default Contact;
