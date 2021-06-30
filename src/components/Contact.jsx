import { useState, useEffect } from "preact/hooks";
import "./Contact.css";

function Contact(props) {
  const data = props.data;
  const [allData, initAllData] = useState(props.allData);

  //get last saison data
  const keys = Object.keys(props.allData);
  const lastSaisonData = props.allData[keys[keys.length - 2]];
  const lastSaisonName = lastSaisonData[0].saison;

  useEffect(() => {
    initAllData(props.allData);
  }, [initAllData]);

  const convertString = (el) => {
    return el
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "-")
      .toLowerCase();
  };

  const [catalogueSelected, setCatalogueSelected] = useState();

  const contentObj = {
    __html: data.content.replace(/(?:\r\n|\r|\n)/g, "<br>"),
  };

  const handleChange = (e) => {
    setCatalogueSelected(e.target.value);
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
          <a
            href={`https://www.abravinum.com/pdf/catalogue-${convertString(
              lastSaisonName
            )}.pdf`}
          >
            {lastSaisonName}
          </a>
        </div>

        <div className="block-archive">
          <div id="archive-container">
            <select
              name="archive"
              id="archive-select"
              value={catalogueSelected}
              onChange={handleChange}
            >
              <option selected disabled>
                Saisons
              </option>
              {allData &&
                Object.keys(allData).map(function (season, index) {
                  if (
                    index > 1 &&
                    allData[season] &&
                    index < allData[season].length
                  ) {
                    return (
                      <>
                        <p> {allData[season][0].saison}</p>
                        <option
                          value={convertString(allData[season][0].saison)}
                        >
                          {allData[season][0].saison}
                        </option>
                        ;
                      </>
                    );
                  }
                })}
            </select>
            <a
              href={
                catalogueSelected &&
                `https://www.abravinum.com/pdf/catalogue-${catalogueSelected}.pdf`
              }
              style={
                catalogueSelected
                  ? { background: "#222222" }
                  : { cursor: "inherit", color: "rgb(191, 191, 191)" }
              }
              download={`catalogue-${catalogueSelected}.pdf`}
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
