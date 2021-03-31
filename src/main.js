/* make change in git */
/* **************** */
/* vignerons height */
/* **************** */

document.querySelectorAll(".container-list").forEach(function(el){
	el.children[0].classList.add("active-nom"); 
});

const domaines = document.querySelectorAll(".domaine-section");
var marginBtDomain = 100;
var heightList;

function initHeightVignerons(){

	domaines.forEach(function(el){
		//marginBot for each domaine
		var activeP;
		// console.log(el);
		el.querySelectorAll(".list-vigneron").forEach(function(el){
			if(el.classList.contains("active-nom")){
				activeP = el;
				// console.log("activeP find", activeP.querySelector(".txt-vigneron"));
			}
		});

		var heightPara = activeP.querySelector(".txt-vigneron").offsetHeight;
		// console.log(heightPara);
		el.style.marginBottom = heightPara + marginBtDomain +"px";
		//Store height of container list element
		heightList = el.querySelector(".container-list").offsetHeight;

		//for each txt set top to height to container list
		el.querySelectorAll(".txt-vigneron").forEach(function(el){
			el.style.top = heightList + "px";
		});
	});

}
initHeightVignerons();

window.addEventListener('resize', initHeightVignerons);

const elHover = document.querySelectorAll(".list-vigneron");

elHover.forEach(function(el){

	el.addEventListener("mouseenter", function(e){
		// console.log(e);
		e.target.parentNode.querySelectorAll(".list-vigneron").forEach(function(el){
			el.classList.remove("active-nom");
		});
		var elem = e.target;
		console.log(elem.classList);
		if(elem.classList.contains("list-vigneron")){
			console.log("hover list-vigneron")
			elem.classList.toggle("active-nom");
		}
		initHeightVignerons();
	});
});


/* **************** */
/* scroll smooth */
/* **************** */

const links = document.querySelectorAll(".scroll-link a");
for (const link of links) {
  link.addEventListener("click", clickHandler);
}
function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: "smooth"
  });
}


/* **************** */
/* paralaxe */
/* **************** */

window.addEventListener('scroll', function(e){

	var scrolled = window.pageYOffset;
	// console.log(scrolled);
	//first poly
	const polyedre = document.querySelectorAll('.container-polyedre img');
	polyedre.forEach(function(el){
		el.style.transform = 'rotate(' + (scrolled * 0.05) + 'deg)';

	});
});

var rellax = new Rellax('.para');