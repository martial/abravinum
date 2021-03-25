import { Component } from "preact";

export default class Vignerons extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log("gello");
    this.initHeightVignerons();
  }

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
    return (
      <>
        <div class="list-vigneron">
          <div class="nom-vigneron">
            <h5>{vineyard.name}</h5>
          </div>

          <div class="txt-vigneron">
            <p>{vineyard.headline}</p>
          </div>
        </div>
      </>
    );
  }

  initHeightVignerons() {
    document.querySelectorAll(".container-list").forEach(function (el) {
      el.children[0].classList.add("active-nom");
    });

    const domaines = document.querySelectorAll(".domaine-section");
    console.log(domaines);
    domaines.forEach((el) => {
      //marginBot for each domaine
      let activeP;
      el.querySelectorAll(".list-vigneron").forEach(function (el) {
        if (el.classList.contains("active-nom")) {
          console.log(el);
          activeP = el;
          console.log(activeP, activeP.querySelector(".txt-vigneron"));
        }
      });
      console.log(activeP.querySelector(".txt-vigneron"));

      const heightPara = activeP.querySelector(".txt-vigneron").offsetHeight;
      // console.log(heightPara);
      el.style.marginBottom = heightPara + 100 + "px";

      //Store height of container list element

      var heightList = el.querySelector(".container-list").offsetHeight;
      console.log(heightList);

      //for each txt set top to height to container list
      el.querySelectorAll(".txt-vigneron").forEach(function (el) {
        el.style.top = heightList + "px";
      });
    });
  }

  displayContentHover() {
    const elHover = document.querySelectorAll(".list-vigneron");

    elHover.forEach(function (el) {
      el.addEventListener("mouseenter", function (e) {
        // console.log(e);
        e.target.parentNode
          .querySelectorAll(".list-vigneron")
          .forEach(function (el) {
            el.classList.remove("active-nom");
          });
        var elem = e.target;
        console.log(elem.classList);
        if (elem.classList.contains("list-vigneron")) {
          console.log("hover list-vigneron");
          elem.classList.toggle("active-nom");
        }
        initHeightVignerons();
      });
    });
  }

  render() {
    const { data, regionData } = this.props;

    return (
      <>
        <section id="vignerons">
          <h2>{data.region}</h2>
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
