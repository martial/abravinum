import "./Header.css";

function Header(props) {
  const data = props.data;
  const isMobile = props.isMobile;

  return (
    <>
      <header id="home">
        <nav>
          <ul class="scroll-link">
            <a href="#infos">
              <li>{data[0].title}</li>
            </a>
            <a href="#vignerons">
              <li>{data[1].title}</li>
            </a>
            <a href="#contact">
              <li>{data[2].title}</li>
            </a>
          </ul>
        </nav>

        <div class="content-home">
          <div class={isMobile}>
            <h1>Abra Vinum</h1>
            <h1>Abra Vinu</h1>
            <h1>Abra Vin</h1>
            <h1>Abra Vi</h1>
            <h1>Abra V</h1>
            <h1>Abra</h1>
            <h1>Abr</h1>
            <h1>Ab</h1>
            <h1>A</h1>
          </div>
          <div class="container-poly container-polyedre container-polyedre-home">
            <img src="static/polyedre-1.png" alt="" />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
