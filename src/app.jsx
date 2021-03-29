import { Component } from "preact";
import axios from "axios";
import Rellax from "rellax";
import About from "./components/About";
import Header from "./components/Header";
import Vignerons from "./components/Vignerons";
import Contact from "./components/Contact";
import "./components/Loading.css";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      regionData: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const url =
      "https://script.google.com/macros/s/AKfycbzDzIKo2XL4LngTthubZd6akG5Dq0_ua7lUlj-4hlnqMUFzGc23tYwwOkWkIPDAF7sjNQ/exec";
    const rest = await axios.get(url);
    this.setState(
      { data: rest.data, regionData: this.formatData(rest.data) },
      () => {
        this.onDataLoadedHandler();
      }
    );
  }

  formatData(data) {
    // console.log(data);
    let formatedResult = {};
    data.Regions.forEach((vigneron, index) => {
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

  onDataLoadedHandler() {
    this.setParralax();
  }

  setParralax() {
    new Rellax(".para");
  }

  render() {
    const { data } = this.state;
    const loading = !data;

    const regionData = this.state.regionData;

    if (!loading) {
      setTimeout(function endLoad() {
        document.querySelector("#loading").classList.add("anim-load");
      }, 500);
    }

    return (
      <>
        {/* Loading */}
        <div id="loading">
          <div class="container-loading container-polyedre">
            <img src="static/polyedre-1.png" alt="polyedre loading" />
          </div>
          <span>Loading...</span>
        </div>

        {!loading && (
          <>
            <div id="paper-texture"></div>
            <div id="map-texture"></div>

            <Header data={data.Main}></Header>

            <main>
              <About data={data.Main[0]}></About>

              {/* TODO Faire un component pour les vigerons */}
              <Vignerons
                data={data.Main[1]}
                regionData={regionData}
              ></Vignerons>

              <section id="map"></section>

              {/* TODO Faire un component pour les contacts */}
              <Contact data={data.Main[2]}></Contact>
            </main>
          </>
        )}
      </>
    );
  }
}
