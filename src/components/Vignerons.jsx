import { Component } from "preact";
import AOS from "aos";
import "aos/dist/aos.css";

export default class Vignerons extends Component {
  constructor() {
    super();
    this.season = null;
  }

  componentDidMount() {
    this.vineyardSelected();
    this.initMouseListeners();

    AOS.init();

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
  }

  vineyardSelected() {
    document.querySelectorAll(".list-vigneron-name").forEach(function (el) {
      el.children[0].classList.add("active-vigneron");
    });
    document.querySelectorAll(".list-vigneron-txt").forEach(function (el) {
      el.children[0].classList.add("selectTxt");
    });

    document.querySelectorAll(".domaine-img").forEach((e) => {
      e.childNodes[0].classList.add("active-img");
    });

    // document.querySelectorAll(".domaine-img").childNodes.forEach(function (el) {
    //   el.children[0].classList.add("active-img");
    // });
  }

  initMouseListeners() {
    const vigneronsName = document.querySelectorAll(".nom-vigneron");

    vigneronsName.forEach((e) => {
      e.addEventListener("click", (e) => {
        //remove all class
        e.target.parentNode.parentNode.childNodes.forEach((e) => {
          e.classList.remove("active-vigneron");
        });
        e.target.parentNode.parentNode.parentNode
          .querySelectorAll(".list-vigneron-txt .txt-vigneron")
          .forEach((e) => {
            e.classList.remove("selectTxt");
          });
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode
          .querySelector(".domaine-img")
          .childNodes.forEach((e) => {
            e.classList.remove("active-img");
          });

        const vigneronClicked = e.target.parentNode;
        vigneronClicked.classList.toggle("active-vigneron");

        const indexClicked = [
          ...vigneronClicked.parentElement.children,
        ].indexOf(vigneronClicked);

        //find container
        let domainContainer = vigneronClicked.parentNode.parentNode;

        //find all txt in same container and add class
        let containerImg = domainContainer.querySelectorAll(
          ".list-vigneron-txt .txt-vigneron"
        );
        containerImg[indexClicked].classList.toggle("selectTxt");

        domainContainer.parentNode.parentNode
          .querySelector(".domaine-img")
          .childNodes[indexClicked].classList.toggle("active-img");
        // if (containerImg) {
        //   [...containerImg.children].forEach((e) => {
        //     e.classList.remove("active-img");
        //   });
        //   containerImg.children[indexClicked].classList.add("active-img");
        // }

        // // get list vignerons siblings
        // let siblings = [];
        // let sibling = vigneronClicked.parentNode.firstChild;
        // while (sibling) {
        //   if (sibling.nodeType === 1 && sibling !== e) {
        //     siblings.push(sibling);
        //   }
        //   sibling = sibling.nextSibling;
        // }

        // //remove visible el
        // siblings.forEach((e) => {
        //   e.classList.remove("active-vignerons");
        // });

        // //add class
        // vigneronClicked.classList.toggle("active-vignerons");
      });
    });
  }

  getVigneronName(vigneron) {
    // console.log(vigneron.season);
    return (
      <>
        <div class="nom-vigneron">
          <h5>{vigneron.name}</h5>
        </div>
      </>
    );
  }

  getVigneronTxt(vigneron) {
    return (
      <>
        <div class="txt-vigneron">
          <p>{vigneron.headline}</p>
        </div>
      </>
    );
  }

  getRegion(region, regionData, index) {
    return (
      <>
        {/* bourgogne */}
        <article
          data-aos="fade-up"
          data-aos-offset="100"
          data-aos-delay="50"
          data-aos-duration="800"
          class={
            "domaine-section domaine-section-bourgogne " +
            (regionData[region].length <= 1
              ? "unique-vigneron"
              : "multiple-vigneron")
          }
          id="bourgogne"
        >
          <div class="container-poly container-poly-2">
            <img src="static/polyedre-2.png" alt="" />
          </div>

          <div class="container-domaine">
            <div class="container-content">
              <div class="nom-domaine">
                <h4>{region}</h4>
              </div>

              <div class="container-all">
                <div class="list-vigneron-name">
                  {regionData[region].map((vigneron) =>
                    this.getVigneronName(vigneron)
                  )}
                </div>
                <div class="list-vigneron-txt">
                  {regionData[region].map((vigneron) =>
                    this.getVigneronTxt(vigneron)
                  )}
                </div>
              </div>
            </div>

            <div class="domaine-img container-img">
              {regionData[region].map(() => (
                <img src={"static/img" + index + ".jpg"} alt="" />
              ))}
            </div>
          </div>
        </article>
      </>
    );
  }

  render() {
    const { allData, data, regionData } = this.props;
    console.log(allData);
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
                {Object.keys(allData).map((sheetName) => (
                  <option value={sheetName}>{sheetName}</option>
                ))}
              </select>
            </label>
          </div>
          <div class="container-vignerons-all" ref={this.container}>
            {Object.keys(regionData).map((region, index) =>
              this.getRegion(region, regionData, index)
            )}
          </div>
        </section>
      </>
    );
  }
}
