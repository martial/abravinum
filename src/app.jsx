import { Component } from "preact";
import axios from "axios";
// import Rellax from "rellax";
import About from "./components/About";
import Header from "./components/Header";
import Vignerons from "./components/Vignerons";
import Contact from "./components/Contact";
import "./components/Loading.css";
import AOS from "aos";
import "aos/dist/aos.css";
export class App extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      season: null,
    };
  }

  componentDidMount() {
    this.getData();
    this.isMobile();
  }

  async getData() {
    const url =
      "https://script.google.com/macros/s/AKfycbzDzIKo2XL4LngTthubZd6akG5Dq0_ua7lUlj-4hlnqMUFzGc23tYwwOkWkIPDAF7sjNQ/exec";
    const rest = await axios.get(url);
    this.setState(
      {
        data: rest.data,

        season: rest.data,
      },
      () => {
        this.onDataLoadedHandler();
      }
    );
  }

  onDataLoadedHandler() {
    // this.setParralax()
    AOS.init();
  }

  isMobile() {
    window.addEventListener(
      "resize",
      () => {
        this.setState({
          isMobile: window.innerWidth < 800,
        });
      },
      false
    );
  }

  render() {
    const { data } = this.state;
    const loading = !data;
    const isMobile = this.state.isMobile
      ? "container-logo active-hover-logo"
      : "container-logo";
    console.log(isMobile);

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

            <Header data={data.Main} isMobile={isMobile}></Header>

            <main>
              <About data={data.Main[0]}></About>

              {/* TODO Faire un component pour les vigerons */}
              <Vignerons allData={data} data={data.Main[1]}></Vignerons>

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
