import { Component } from "preact";

export default class Vignerons extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.vineyardSelected();
    this.initMouseListeners();
    this.getRegion();
    this.getVigneron();

    window.addEventListener("scroll", (e) => {
      this.scrollRotation(e);
    });
  }

  //js d'event
  scrollRotation(e) {
    var scrolled = window.pageYOffset;
    var polyedre = document.querySelectorAll(".container-poly");
    polyedre.forEach(function (el) {
      el.style.transform = "rotate(" + scrolled * 0.08 + "deg)";
    });
    console.log(scrolled);
  }

  vineyardSelected() {
    document.querySelectorAll(".container-list").forEach(function (el) {
      el.children[0].classList.add("active-vignerons");
      document
        .querySelector("#bourgogne .domaine-img")
        .children[0].classList.add("active-img");
    });
  }

  initMouseListeners() {
    const vigneronsName = document.querySelectorAll(".nom-vigneron");

    vigneronsName.forEach((e) => {
      e.addEventListener("click", (e) => {
        const vigneronClicked = e.target.parentNode.parentNode;
        const indexClicked = [
          ...vigneronClicked.parentElement.children,
        ].indexOf(vigneronClicked);

        let domainContainer =
          vigneronClicked.parentNode.parentNode.parentNode.parentNode;
        let containerImg = domainContainer.querySelector(".domaine-img");

        if (containerImg) {
          [...containerImg.children].forEach((e) => {
            e.classList.remove("active-img");
          });
          containerImg.children[indexClicked].classList.add("active-img");
        }

        // get list vignerons siblings
        let siblings = [];
        let sibling = vigneronClicked.parentNode.firstChild;
        while (sibling) {
          if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
          }
          sibling = sibling.nextSibling;
        }

        //remove visible el
        siblings.forEach((e) => {
          e.classList.remove("active-vignerons");
        });

        //add class
        vigneronClicked.classList.toggle("active-vignerons");
      });
    });
  }

  getVigneron(vigneron) {
    // console.log(vigneron);
    return (
      <>
        <div class="list-vigneron">
          <div class="nom-vigneron">
            <h5>{vigneron.name}</h5>
          </div>

          <div class="txt-vigneron">
            <p>{vigneron.headline}</p>
          </div>
        </div>
      </>
    );
  }

  getRegion(region, regionData) {
    if (region == "Champagne") {
      return (
        <>
          {/* champagne */}
          <article
            class={
              "domaine-section-champagne " +
              (regionData[region].length > 1 ? "multiple-vignerons" : "")
            }
            id="champagne"
          >
            <div class="container-domaine">
              <div class="container-content">
                <div class="nom-domaine">
                  <h4>Champagne</h4>
                </div>

                <div class="container-list">
                  {regionData[region].map((vigneron) =>
                    this.getVigneron(vigneron)
                  )}
                </div>
              </div>

              <div class="domaine-img container-img">
                <img src="static/img2.jpg" alt="" />
              </div>
            </div>
          </article>
        </>
      );
    }

    if (region == "Beaujolais et Bourgogne") {
      return (
        <>
          {/* bourgogne */}
          <article
            class={
              "domaine-section domaine-section-bourgogne " +
              (regionData[region].length > 1 ? "multiple-vignerons" : "")
            }
            id="bourgogne"
          >
            <div class="container-poly container-poly-2">
              <img src="static/polyedre-2.png" alt="" />
            </div>

            <div class="container-domaine">
              <div class="container-content">
                <div class="nom-domaine">
                  <h4>
                    Beaujolais <br /> et Bourgogne
                  </h4>
                </div>

                <div class="container-list">
                  {regionData[region].map((vigneron) =>
                    this.getVigneron(vigneron)
                  )}
                </div>
              </div>
            </div>

            <div class="domaine-img container-img">
              <img src="static/img3.jpg" alt="" />
              <img src="static/img1.jpg" alt="" />
              <img src="static/img2.jpg" alt="" />
              <img src="static/img3.jpg" alt="" />
              <img src="static/img4.jpg" alt="" />
              <img src="static/img3.jpg" alt="" />
              <img src="static/img2.jpg" alt="" />
              <img src="static/img5.jpg" alt="" />
              <img src="static/img1.jpg" alt="" />
              <img src="static/img3.jpg" alt="" />
              <img src="static/img2.jpg" alt="" />
              <img src="static/img5.jpg" alt="" />
              <img src="static/img1.jpg" alt="" />
              <img src="static/img1.jpg" alt="" />
            </div>
          </article>
        </>
      );
    }

    if (region == "Rhône") {
      return (
        <>
          {/* Rhone */}
          <article
            class={
              "domaine-section-rhone " +
              (regionData[region].length > 1 ? "multiple-vignerons" : "")
            }
            id="rhone"
          >
            <div class="container-domaine">
              <div class="container-content">
                <div class="nom-domaine">
                  <h4>Rhône</h4>
                </div>

                <div class="container-list">
                  {regionData[region].map((vigneron) =>
                    this.getVigneron(vigneron)
                  )}
                </div>
              </div>

              <div class="domaine-img container-img">
                <img src="static/img4.jpg" alt="" />
              </div>
            </div>
          </article>
        </>
      );
    }

    if (region == "Jura") {
      return (
        <>
          {/* jura */}
          <article
            class={
              "domaine-section-jura" +
              (regionData[region].length > 1 ? "multiple-vignerons" : "")
            }
            id="jura"
          >
            <div class="container-poly container-poly-3">
              <img src="static/polyedre-3.png" alt="" />
            </div>

            <div class="container-domaine">
              <div class="container-content">
                <div class="nom-domaine">
                  <h4>Jura</h4>
                </div>

                <div class="container-list">
                  {regionData[region].map((vigneron) =>
                    this.getVigneron(vigneron)
                  )}
                </div>
              </div>

              <div class="domaine-img container-img">
                <img src="static/img5.jpg" alt="" />
              </div>
            </div>
          </article>
        </>
      );
    }
  }

  render() {
    const { data, regionData } = this.props;
    // console.log(regionData);
    return (
      <>
        <section id="vignerons">
          <div class="container-poly container-poly-1">
            <img src="static/polyedre-1.png" alt="" />
          </div>
          <div class="vigneron-saison">
            <h2>{data.title}</h2>
            <p>{data.headline}</p>
            <label>
              <select name="saison" id="saison-select">
                <option value="Automne 2019">Automne 2019</option>
                <option value="Hiver 2019">Hiver 2019</option>
                <option value="Printemps 2020">Printemps 2020 </option>
                <option value="été 2020">été 2020</option>
                <option value="Automne 2020">Automne 2020</option>
                <option value="Hiver 2020">Hiver 2020</option>
              </select>
            </label>
          </div>
          <div>
            {Object.keys(regionData).map((region) =>
              this.getRegion(region, regionData)
            )}
          </div>
        </section>
      </>
    );
  }
}
