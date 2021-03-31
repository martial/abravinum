import { Component } from "preact";

export default class Vignerons extends Component {
  constructor() {
    super();

    this.marginBtDomain = 100;
  }

  componentDidMount() {
    this.handleSizes();
    this.initMouseListeners();
  }

  getRegion(region, regionData, index) {
    const rdm = Math.ceil(Math.random() * 3);
    const imgUrl = "static/polyedre-" + rdm + ".png";
    const isOdd = index % 2 == 0;
    const style = !isOdd ? "right:0" : "";
    const speed = 0.5 + Math.random() * 1.0;
    return (
      <div class="domaine-section">
        <div class="nom-domaine">
          <h4>{region}</h4>
        </div>
        <div class="container-list">
          {regionData[region].map((vineyard) => this.getVineyard(vineyard))}
        </div>
        <div
          class="container-polyedre para container-polyedre-apropos"
          data-rellax-speed={speed}
          style={style}
        >
          <img src={imgUrl} alt="" />
        </div>
      </div>
    );
  }

  getVineyard(vineyard) {
    const descrObj = {
      __html: vineyard.headline.replace(/(?:\r\n|\r|\n)/g, "<br>"),
    };
    return (
      <>
        <div class="list-vigneron">
          <div class="nom-vigneron">
            <h5>{vineyard.name}</h5>
          </div>

          <div class="txt-vigneron">
            <p dangerouslySetInnerHTML={descrObj}></p>
          </div>
        </div>
      </>
    );
  }

  handleSizes() {
    document.querySelectorAll(".container-list").forEach(function (el) {
      el.children[0].classList.add("active-nom");
    });

    const domaines = document.querySelectorAll(".domaine-section");
    domaines.forEach((el) => {
      //marginBot for each domaine
      let activeP;
      el.querySelectorAll(".list-vigneron").forEach(function (el) {
        if (el.classList.contains("active-nom")) {
          activeP = el;
        }
      });

      const heightPara = activeP.querySelector(".txt-vigneron").offsetHeight;
      el.style.marginBottom = heightPara + 140 + "px";

      //Store height of container list element
      var heightList = el.querySelector(".container-list").offsetHeight;

      //for each txt set top to height to container list
      el.querySelectorAll(".txt-vigneron").forEach(function (el) {
        el.style.top = heightList + "px";
      });
    });
  }

  initMouseListeners() {
    const elHover = document.querySelectorAll(".list-vigneron");

    elHover.forEach(function (el) {
      el.addEventListener("click", function (e) {
        this.parentNode
          .querySelectorAll(".list-vigneron")
          .forEach(function (el) {
            el.classList.remove("active-nom");
          });
        var elem = this;

        if (elem.classList.contains("list-vigneron")) {
          elem.classList.toggle("active-nom");
        }
      });
    });
  }

  render() {
    const { data, regionData } = this.props;

    return (
      <>
        <section id="vignerons">
          <h2>Nos références</h2>
          {Object.keys(regionData).map((region, index) =>
            this.getRegion(region, regionData, index)
          )}
        </section>
      </>
    );
  }
}
