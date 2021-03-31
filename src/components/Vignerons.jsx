import { Component } from "preact";

export default class Vignerons extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.vineyardSelected();
    this.handleSizes();
    this.initMouseListeners();
    window.addEventListener("resize", () => {
      this.handleSizes();
    });
  }

  //js d'event
  vineyardSelected() {
    document.querySelectorAll(".container-list").forEach(function (el) {
      el.children[0].classList.add("active-nom");
    });
  }

  handleSizes() {
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

      el.style.marginBottom = heightPara + 75 + "px";
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
      el.addEventListener("mouseenter", function (e) {
        e.target.parentNode
          .querySelectorAll(".list-vigneron")
          .forEach(function (el) {
            el.classList.remove("active-nom");
          });
        var elem = e.target;
        console.log(elem.classList);
        if (elem.classList.contains("list-vigneron")) {
          elem.classList.toggle("active-nom");
        }
      });
    });
  }

  //display content
  getRegion(region, regionData) {
    return (
      <div class="domaine-section">
        <div class="nom-domaine">
          <h4>{region}</h4>
        </div>
        <div class="container-list">
          {regionData[region].map((vineyard) => this.getVineyard(vineyard))}
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

  render() {
    const { data, regionData } = this.props;
    console.log(data);
    return (
      <>
        <section id="vignerons">
          <h2>{data.title}</h2>
          {Object.keys(regionData).map((region) =>
            this.getRegion(region, regionData)
          )}
        </section>
      </>
    );
  }
}

/*
function Vignerons(props) {
  const data = props.data;
  const regionData = props.regionData;

  const getElement = (vignobles) => {
    {
      console.log({ vignobles });
    }
    return (
      <>
        <div class="list-vigneron">
          <div class="nom-vigneron">
            <h5>{vignobles.name}</h5>
          </div>
        </div>
        <div class="txt-vigneron">
          <p>{vignobles.headline}</p>
        </div>
      </>
    );
  };

  return (
    <>
      <section id="vignerons">
        <h2>{data.title}</h2>
        {Object.keys(regionData).map(function (domaines, keyIndex) {
          {
            console.log(regionData[domaines]);
          }
          return (
            <div class="domaine-section">
              <div class="nom-domaine">
                <h4>{domaines}</h4>
              </div>

              <div class="container-list">
                {regionData[domaines].map((item) => getElement(item))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Vignerons;

*/
