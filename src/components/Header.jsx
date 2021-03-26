import "./Header.css";

function Header(props) {
  const data = props.data;

  return (
    <>
      <header id="home">
        <nav>
          <ul class="scroll-link">
            {/* {data.map(sections => {
                // console.log(sections, sections.title);
                return <a href= {"#" + sections.title.split(' ').join('')} >
                  <li>{sections.title}</li>
                </a>
            })} */}
            <a href="#infos">
              <li>À propos</li>
            </a>
            <a href="#vignerons">
              <li>Vignerons</li>
            </a>
            <a href="#map">
              <li>Carte</li>
            </a>
            <a href="#contact">
              <li>Contact</li>
            </a>
          </ul>
        </nav>

        <div class="content-home">
          <div class="container-logo">
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
          <div class="container-polyedre container-polyedre-home">
            <img src="static/polyedre-1.png" alt="" />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
