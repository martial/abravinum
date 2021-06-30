import { useState } from "preact/hooks";
import "./Contact.css";

function Contact(props) {
  const [currentCatalogue, setCurrentCatalogue] = useState();
  const data = props.data;
  console.log(props.data);

  const contentObj = {
    __html: data.content.replace(/(?:\r\n|\r|\n)/g, "<br>"),
  };

  const handleChange = (e) => {
    setCurrentCatalogue(e.target.value);
    console.log(e.target.value);
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

        <h4 className="title-archive">Télécharger nos catalogues</h4>

        <div class="catalogue">
          <a href="https://www.abravinum.com/pdf/catalogue.pdf">
            Saison Automne 2019
          </a>
        </div>

        <div className="block-archive">
          <div id="archive-container">
            <select
              name="archive"
              id="archive-select"
              value={currentCatalogue}
              onChange={handleChange}
            >
              <option selected disabled>
                Saisons
              </option>
              <option value="hiver-2019">Hiver 2019</option>
              <option value="ete-2020">Été 2020</option>
            </select>
            <a
              href={
                currentCatalogue &&
                `https://www.abravinum.com/pdf/catalogue-${currentCatalogue}.pdf`
              }
              style={
                currentCatalogue
                  ? { background: "#222222" }
                  : { cursor: "inherit", color: "rgb(191, 191, 191)" }
              }
              download={`catalogue-${currentCatalogue}.pdf`}
              id="download-archive-btn"
            >
              Télécharger
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div class="reseaux">
          {/* <a href=""><span>Facebook</span></a>
          <a href=""><span>Twitter</span></a>
          <a href=""><span>Instagram</span></a> */}
        </div>
        <div class="retour-top scroll-link">
          <a href="#home">&#8593;</a>
        </div>
      </footer>
    </>
  );
}

export default Contact;
