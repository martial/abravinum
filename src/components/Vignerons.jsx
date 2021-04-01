import { Component } from "preact";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Vignerons.css";

export default class Vignerons extends Component {
  constructor() {
    super();

    this.state = {
      seasons: [],
      seasonsLabels: [],
      currentSeason: null,
      formatedSeason: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.parseSeasons();
    this.vineyardSelected();

    AOS.init();

    window.addEventListener("scroll", (e) => {
      this.scrollRotation(e);
    });
  }

  handleChange(e) {
    const season = this.state.seasons.find((season) => {
      return season.label === e.target.value;
    });
    this.setState(
      {
        currentSeason: season,
        formatedSeason: this.formatData(season.content),
      },
      () => {
        this.initMouseListeners();
      }
    );
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
            e.classList.remove("active-txt");
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
        containerImg[indexClicked].classList.toggle("active-txt");

        domainContainer.parentNode.parentNode
          .querySelector(".domaine-img")
          .childNodes[indexClicked].classList.toggle("active-img");

        // if (window.innerWidth < 750) {
        //   e.target.parentNode.parentNode.parentNode.parentNode.style.marginBottom =
        //     e.target.parentNode.parentNode.parentNode.querySelectorAll(
        //       ".list-vigneron-txt .txt-vigneron"
        //     )[indexClicked].offsetHeight +
        //     35 +
        //     "px";
        // }
      });
    });
  }

  //js boucle DOM
  getVigneronName(vigneron, index) {
    const classTxt =
      index === 0 ? "nom-vigneron active-vigneron" : "nom-vigneron";

    return (
      <>
        <div className={classTxt}>
          <h5>{vigneron.name}</h5>
        </div>
      </>
    );
  }

  getVigneronTxt(vigneron, index) {
    const classTxt = index === 0 ? "txt-vigneron active-txt" : "txt-vigneron";

    return (
      <>
        <div className={classTxt}>
          <p>{vigneron.headline}</p>
        </div>
      </>
    );
  }

  getImage(vigneron, index, indexVigneron) {
    const imgClassName = indexVigneron === 0 ? "active-img" : "";
    return (
      <img
        src={"static/img" + index + ".jpg"}
        className={imgClassName}
        alt=""
      />
    );
  }

  getRegion(region, regionData, index) {
    return (
      <>
        {/* bourgogne */}
        <article
          data-aos="fade-up"
          data-aos-offset="50"
          data-aos-delay="50"
          data-aos-duration="600"
          class={
            "domaine-section " +
            (regionData[region].length <= 1
              ? "unique-vigneron"
              : "multiple-vigneron")
          }
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
                  {regionData[region].map((vigneron, index) =>
                    this.getVigneronName(vigneron, index)
                  )}
                </div>
                <div class="list-vigneron-txt">
                  {regionData[region].map((vigneron, index) =>
                    this.getVigneronTxt(vigneron, index)
                  )}
                </div>
              </div>
            </div>

            <div class="domaine-img container-img ">
              {regionData[region].map((vigneron, indexVigneron) =>
                this.getImage(vigneron, index, indexVigneron)
              )}
            </div>
          </div>
        </article>
      </>
    );
  }

  parseSeasons() {
    const { allData } = this.props;

    let seasons = [];
    if (allData) {
      Object.entries(allData).forEach((sheetPage) => {
        const sheetData = sheetPage[1];
        if (sheetData.length && sheetData[0].hasOwnProperty("saison")) {
          const seasonLabel = sheetData[0].saison;
          seasons.push({ label: seasonLabel, content: sheetData });
        }
      });
    }

    const lastSeason = seasons[seasons.length - 1];
    this.setState(
      {
        seasons: seasons,
        currentSeason: lastSeason,
        formatedSeason: this.formatData(lastSeason.content),
      },
      () => {
        this.initMouseListeners();
      }
    );
  }

  formatData(data) {
    let formatedResult = {};

    data.forEach((vigneron, index) => {
      if (!formatedResult[vigneron.region]) {
        formatedResult[vigneron.region] = [];
      }
      formatedResult[vigneron.region].push(vigneron);
    });

    for (const [key, value] of Object.entries(formatedResult)) {
      value.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    }

    const sorted = Object.keys(formatedResult)
      .sort()
      .reduce(
        (acc, key) => ({
          ...acc,
          [key]: formatedResult[key],
        }),
        {}
      );

    return sorted;
  }

  render() {
    const { data } = this.props;
    const { seasons, currentSeason, formatedSeason } = this.state;

    console.log(currentSeason);
    //return <></>;
    return (
      <>
        <section id="vignerons">
          <div class="container-poly container-poly-1">
            <img src="static/polyedre-1.png" alt="" />
          </div>
          <div class="vigneron-saison">
            <h2>{data.title}</h2>
            <p>{data.headline}</p>
            {currentSeason && seasons && (
              <label>
                <select
                  name="saison"
                  id="saison-select"
                  value={currentSeason.label}
                  onChange={this.handleChange}
                >
                  {seasons.map((season) => (
                    <option value={season.label}>{season.label}</option>
                  ))}
                </select>
              </label>
            )}
          </div>
          {currentSeason && seasons && (
            <div class="container-vignerons-all" ref={this.container}>
              {Object.keys(formatedSeason).map((region, index) =>
                this.getRegion(region, formatedSeason, index)
              )}
            </div>
          )}
        </section>
      </>
    );
  }
}
