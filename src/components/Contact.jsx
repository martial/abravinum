function Contact(props) {
  const data = props.data;
  // const allTitle = data.Main;
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
    </>
  );
}

export default Contact;
