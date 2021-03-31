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

        const containerImg = document.querySelector("#bourgogne .domaine-img");

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
    console.log(vigneron);
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
    // console.log(region);

    if (region == "Beaujolais et Bourgogne") {
      return (
        <>
          {/* bourgogne */}
          <article
            class="domaine-section domaine-section-bourgogne"
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

    if (region == "Champagne") {
      return (
        <>
          {/* champagne */}
          <article class="domaine-section-champagne" id="champagne">
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

    if (region == "Rhône") {
      return (
        <>
          {/* Rhone */}
          <article class="domaine-section-rhone" id="rhone">
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
          <article class="domaine-section-jura" id="jura">
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

/*<!-- vignerons -->
 <section id="vignerons">

    <div class="container-poly container-poly-1">
        <img src="static/polyedre-1.png" alt=""/>
    </div>

    <div class="vigneron-saison">
        <h2>Nos vignerons</h2>

        <p>Voir nos différentes sélections en fonction des saisons.</p>
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

    
    <!-- Champagne -->
    <article class="domaine-section-champagne" id="champagne">

        <div class="container-domaine">

            <div class="container-content">

                <div class="nom-domaine">
                    <h4>Champagne</h4>
                </div>

                <div class="container-list">

                    <div class="list-vigneron">

                        <div class="nom-vigneron">
                            <h5>Champagne Dehours</h5>
                        </div>
    
                        <div class="txt-vigneron">
                            <p>Assurément un des plus grands champagnes de la Vallée de la Marne. Jérôme Dehours vinifie des vins singuliers à la bourguignonne (42 parcelles répertoriées). Les vins clairs sont élevés en barrique de plusieurs vins ajoutant une étoffe supplémentaire au champagne. Quelques bouteilles de l’immense millésime 2012 sont disponibles pour mettre en cave (2012 en champagne tiendra dans les 50 prochaines années). Au domaine, le cépage phare est le Pinot Meunier qui est travaillé en Soléra* pour la grande réserve. Privilégier les verres à vin pour le service, servir frais 9°C/10°C mais pas froid 5°.</p>
                        </br>
                            <p>*Soléra : La solera, appelée aussi réserve perpétuelle, est une méthode d'assemblage et d'élevage du vin pratiquée en particulier en Espagne. Ce procédé est aussi utilisé aujourd'hui dans la production de certains champagnes.</p>
                        </div>
    
                    </div>

                </div>
            </div>

            <div class="domaine-img container-img">
                <img src="static/img2.jpg" alt=""/>
            </div>

        </div>

    </article>
    

    <!-- Beaujolais et Bourgogne -->
    <article class="domaine-section domaine-section-bourgogne" id="bourgogne">

        <div class="container-poly container-poly-2">
            <img src="static/polyedre-2.png" alt=""/>
        </div>

        <div class="container-domaine">

            <div class="container-content">

                <div class="nom-domaine">
                    <h4>Beaujolais </br> et Bourgogne</h4>
                </div>

                <div class="container-list">

                    <div class="list-vigneron">

                        <div class="nom-vigneron">
                            <h5>Thibaud Lemaitre</h5>
                        </div>

                        <div class="txt-vigneron">
                            <p>Thibaud et moi sommes amis depuis 20 ans, il est l’homme pédagogue sur les pratiques vinicoles, faisant preuve de discernement et d’écoute dans les débats animés par ceux qui boivent du vin mais qui n’en font pas ! Sa première signature, 2017 est particulièrement plaisante. Elle est représentative du millésime, tardif et capricieux, l’élevage est élégant il souligne mais ne farde pas. Un style de gamay pur où la juste charpente et la juste « buvabilité » font de ce premier Moulin une vraie réussite. 2018,
                            tout aussi réussi est le portrait d’une année plus précoce, plus solaire et plus riche. Les vins sont déjà prêts et ne demandent qu’à être ouverts pour étancher les soifs automnales.</p>
                        </div>

                    </div>

                    <div class="list-vigneron">

                        <div class="nom-vigneron">
                            <h5>Jacqueson</h5>
                        </div>

                        <div class="txt-vigneron">
                            <p>Le vigneron emblématique de Rully, certains le connaissent déjà. Un modèle de régularité, les vins sont à l’image des grands blancs de la Côte Chalonnaise juste gras, cristallins, précis et immédiats.</p>
                            <p>Très faible rendement sur 2019. Précipitez-vous il y en a peu. A boire maintenant et, ou, à oublier entre 5 et 10 ans.</p>
                        </div>
                    </div>

                    <div class="list-vigneron">
                        <div class="nom-vigneron">
                            <h5>Brintet</h5>
                        </div>
                        <div class="txt-vigneron">
                            <p>Brintet, le roi du Mercurey ! des rouges friands, des blancs gourmands et une profondeur grandissante dans les vins. Brintet s’est propulsé en peu de temps comme une des références de l’appellation.</p>
                            <p>C’est « glouglou » c’est la Bourgogne des ripailleurs</p>
                        </div>
                    </div>

                    <div class="list-vigneron">
                        <div class="nom-vigneron">
                            <h5>Thénard</h5>
                        </div>
                        <div class="txt-vigneron">
                            <p>Illustre famille bourguignonne inscrivant son nom dans la lutte contre le Phylloxera au dix-neuvième siècle et discret propriétaire d’un quart de l’appellation Montrachet grand cru, voici quelques attributs de ce domaine d’exception. Discrétion, humilité et générosité sont les valeurs fortes des barons Thénard. Les vins sont taillés pour la garde et le style gagne en finesse depuis l’arrivée du fils. Fait remarquable, les vins sont élevés plus de trente mois en vieux foudres ou vieilles pièces. A ma connaissance, pas d’autres vignerons en bourgogne ne font des élevages si long. Du Givry 1er cru au Montrachet grand cru, les soins apportés au vin sont les mêmes. J’ai la chance d’avoir quelques bouteilles de la plus prestigieuse appellation de bourgogne en blanc à votre disposition (à boire ou à garder pendant plus de 30 ans). Lors de mon passage au domaine en juin Les Pernand-Vergelesses et Corton 2017 n’ont jamais aussi bien goûté depuis que je suis les vins du domaine.</p>
                        </div>
                    </div>

                    <div class="list-vigneron">
                        <div class="nom-vigneron">
                            <h5>Lucien Muzard</h5>
                        </div>
                        <div class="txt-vigneron">
                            <p>Nous quittons la Côte Chalonnaise pour entrer en Côte de Beaune. Ici aussi, un domaine d’une régularité sans faille. Le Clos Faubard est très élégant, c’est l’introduction au grand style de la côte de Beaune (cerises dans un panier d’osier comme dirait un Beaunois)</p>
                        </div>
                    </div>

                    <div class="list-vigneron">
                        <div class="nom-vigneron">
                            <h5>Heitz-Lochardet</h5> 
                        </div>
                        <div class="txt-vigneron">
                            <p>Armand, c’est un ami. J’ai eu la chance de suivre l’aventure de la création du domaine depuis le début. 2013 premier millésime à la vente, cinq ans plus tard je suis heureux de pouvoir vous proposer ses vins. Le Clos des Poutures (0,7ha !!!) est mon coup de cœur sur Pommard. Les Rugiens et les Perrières sont les « grands crus » de Pommard et de Meursault avec un potentiel de garde supérieur à 20 ans. Le Crémant est une vraie bulle élégante,</p>
                        </div>
                    </div>

                    <div class="list-vigneron">
                        <div class="nom-vigneron">
                            <h5>Comte Senard</h5> 
                        </div>
                        <div class="txt-vigneron">
                            <p>Lorraine Senard, est la cinquième génération de la famille. 10Ha et le plus beau parcellaire sur la colline de Corton voilà le décor planté. Encore un domaine possédant un monopole : le clos des Meix 1,64 ha (4000 bouteilles/an). Des vins de temps, en rouge comme en blanc, plaisants dans la jeunesse, séduisants dans la maturité.</p>
                        </div>
                    </div>

                    <div class="list-vigneron">
                        <div class="nom-vigneron">
                            <h5>Jean Chartron</h5> 
                        </div>
                        <div class="txt-vigneron">
                            <p>Ici encore, c’est la cinquième génération qui est gardienne de ce superbe domaine. Une maison classique au style qui s’est affuté ces dernières années. Les grands blancs de Puligny par excellence, pensez à carafer, surtout les blancs ! Le seul Chevaliers-Montrachet en Clos Monopole</p>
                        </div> 
                    </div>

                    <div class="list-vigneron">
                        <div class="nom-vigneron">
                            <h5>Virgine Taupenot-Merme</h5> 
                        </div>
                        <div class="txt-vigneron">
                            <p>La louve de Morey-Saint-Denis, (les habitants de Morey sont surnommés les loups). Virginie est aussi une amie (pour les amis snob, ses vins sont présents Au Bon Marché comme sur cette liste). Une grande dame de la Côte de Nuits qui participe activement à l’association Femme et Vins de Bourgogne.</p>
                            <p>Les Passetoutgrains sont de superbes vins de soif, les Morey sont à garder comme à consommer jeunes. 2017 comme 2018 sont des réussites intégrales au domaine.</p>
                        </div>
                    </div>

                    <div class="list-vigneron">
                        <div class="nom-vigneron">
                            <h5>Nicole Lamarche</h5> 
                        </div>
                        <div class="txt-vigneron">
                            <p>Décidément, nous sommes proche de la parité dans cette offre ! Avec Nicole la fête est plus folle ! Domaine emblématique de Vosne-Romanée. Avant le confinement j’ai pu goûter l’intégralité des 2018 où le floral rouge dominait (rose, pivoine). Les vins sont d’une longueur intense et les couleurs sublimes. Les 2017 se referment un peu les 2018 commencent à s’ouvrir. Encore et toujours un Monopole : La Grande Rue, cette fois une appellation monopole entre la Tâche et la Romanée-Conti. Interdiction d’ouvrir avant au moins 10 à 15 ans de vieillissement.</p>
                        </div>
                    </div>

                    <div class="list-vigneron">
                        <div class="nom-vigneron">
                            <h5>Jean Tardy</h5> 
                        </div>
                        <div class="txt-vigneron">
                            <p>Domaine confidentiel de 3,5 ha, des petites cuvées, un style plus musclé. Avec Guillaume le style main de fer dans gant de soie s’impose. Les couleurs sont plus sombres, l’aromatique plus ronce et graphite. Tanins moelleux présents. Fixin – la Place et Gevrey-Chambertin – Champerrier sont les deux climats qu’il faut avoir goûté impérativement dans sa vie de « flaconneur » de Côte de Nuits.</p>
                        </div>
                    </div>

                    <div class="list-vigneron">
                        <div class="nom-vigneron">
                            <h5>Sérafin</h5> 
                        </div>
                        <div class="txt-vigneron">
                            <p>Karine, encore une grande dame à la tête de ce domaine. 6ha, parcellaire fabuleux, haute maturité des raisins et fûts servants à élever les Hermitage de Jean-Louis Chave, que dire d’autre ? Pour moi : la légende des admirateurs de Gevrey-Chambertin, dont je fais partie.</p>
                        </div>
                    </div>

                    <div class="list-vigneron">
                        <div class="nom-vigneron">
                            <h5>Bertagna</h5> 
                        </div>
                        <div class="txt-vigneron">
                            <p>Les grands vins d’une appellation rare et confidentielle : Vougeot (à l’extérieur du Clos).</p>
                        </div>
                    </div>

                </div>

            </div>

        </div>

        <div class="domaine-img container-img">
            <img src="static/img3.jpg" alt=""/>
            <img src="static/img1.jpg" alt=""/>
            <img src="static/img2.jpg" alt=""/>
            <img src="static/img3.jpg" alt=""/>
            <img src="static/img4.jpg" alt=""/>
            <img src="static/img3.jpg" alt=""/>
            <img src="static/img2.jpg" alt=""/>
            <img src="static/img5.jpg" alt=""/>
            <img src="static/img1.jpg" alt=""/>
            <img src="static/img3.jpg" alt=""/>
            <img src="static/img2.jpg" alt=""/>
            <img src="static/img5.jpg" alt=""/>
            <img src="static/img1.jpg" alt=""/>
        </div>

    </article>

    <!-- Rhône -->
    <article class="domaine-section-rhone" id="rhone">

        <div class="container-domaine">

            <div class="container-content">
                <div class="nom-domaine">
                    <h4>Rhône</h4>
                </div>

                <div class="container-list">

                    <div class="list-vigneron">

                        <div class="nom-vigneron">
                            <h5>Faury</h5>
                        </div>
    
                        <div class="txt-vigneron">
                            <p>Un domaine que certains connaissent déjà. Mon style préféré en vallée du Rhône Nord à savoir de la vendange entière et peu ou pas de fûts neufs. Les Côte-Rôtie sont des modèles d’élégance. 31 mois d’élevage sur « Emporium » en parcellaire. Les robes sont violettes, brillantes, intenses.</p>
                        </div>
    
                    </div>

                </div>
            </div>

            <div class="domaine-img container-img">
                <img src="static/img4.jpg" alt=""/>
            </div>

        </div>
    </article>


    <!-- Jura -->
    <article class="domaine-section-jura" id="jura">

        <div class="container-poly container-poly-3">
            <img src="static/polyedre-3.png" alt=""/>
        </div>

        <div class="container-domaine">

            <div class="container-content">
                <div class="nom-domaine">
                    <h4>Jura</h4>
                </div>

                <div class="container-list">

                    <div class="list-vigneron">

                        <div class="nom-vigneron">
                            <h5>Berthet Bondet</h5>
                        </div>
    
                        <div class="txt-vigneron">
                            <p>Un peu de Jura dans ce monde de Bourguignons et de Bourguignonnes. C’est Hélène qui prend les commandes et assure la continuité de ce superbe écrin crée par ses parents en 1984. Une vision du Jura dans l’air du temps avec des rouges pulpeux et frais, des savagnins non ouillés* qui côtoient les grands classiques tel le Château-Chalon et le fameux Vin de Paille. Sur Château-Chalon, la garde est infinie (plusieurs centaines d’années).</p>
                            <br/>
                            <p>*l’ouillage : L'ouillage est une action périodique visant à toujours maintenir le niveau maximal des fûts et des cuves de vin dans une cave. Il compense les pertes, ou « consume », dues à l'absorption  et l'évaporation.</p>
                        </div>
    
                    </div>

                </div>
            </div>

            <div class="domaine-img container-img">
                <img src="static/img5.jpg" alt="">
            </div>

        </div>
    </article>

</section> */
