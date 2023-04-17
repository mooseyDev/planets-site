// Fetching data and processing - then calling fetchData()
let data;
async function fetchData() {
  try {
    const response = await fetch('./data.json');
    const jsonData = await response.json(); // Change the variable name to avoid redeclaration
    data = jsonData; // Assign the JSON data to the outer scope 'data' variable
    processData(data);
  } catch (error) {
    console.error('Error fetching JSON data:', error);
  }
};
function processData(data) {
  console.log(data);
  data.planets.forEach(planet => {
    console.log('Planet:', planet.name);
  });
};
fetchData();

// Globals
function removeActiveButton() {
  document.querySelector('.overviewButton').classList.remove('currentActiveButtonClass');
}
function addActiveButton() {
  document.querySelector('.overviewButton').classList.add('currentActiveButtonClass');
}

// Info button functions
function removeGeologyImg() {
    const queryIfGeologyImgExists = document.querySelector('.planet .geologyImg');
    if (queryIfGeologyImgExists !== null) {
      console.log('this happened');
      queryIfGeologyImgExists.remove();
    }
}
function overviewButtonClick() {
    const currentPlanetName = document.querySelector("#planetName").innerHTML;
    const currentPlanet = data.planets.find(planet => planet.name === currentPlanetName);
    const currentPlanetOverview = currentPlanet.overview;

    const OverviewContent = currentPlanetOverview.content;

    removeGeologyImg();

    console.log(`${currentPlanetName}`);
  
    const paragraphElement = document.querySelector('.planetInfoParagraph');
    paragraphElement.innerHTML = OverviewContent;
    document.querySelector('.planetImg').src = `./assets/planet-${currentPlanetName}.svg`
};
function structureButtonClick() {
    const currentPlanetName = document.querySelector("#planetName").innerHTML;
    const currentPlanet = data.planets.find((planet) => planet.name === currentPlanetName);
    const currentPlanetStructure = currentPlanet.structure;
  
    const structureContent = currentPlanetStructure.content;

    removeGeologyImg()
    removeActiveButton()

    console.log(`${currentPlanetName}`);
  
    const paragraphElement = document.querySelector('.planetInfoParagraph');
    paragraphElement.innerHTML = structureContent;
    document.querySelector('.planetImg').src = `./assets/planet-${currentPlanetName}-internal.svg`;  }
function surfaceButtonClick() {
    const currentPlanetName = document.querySelector("#planetName").innerHTML;
    const currentPlanet = data.planets.find(planet => planet.name === currentPlanetName);
    const currentPlanetGeology = currentPlanet.geology;
  
    const geologyContent = currentPlanetGeology.content;

    removeGeologyImg();
    removeActiveButton()

    console.log(`${currentPlanetName}`);
  
    const paragraphElement = document.querySelector('.planetInfoParagraph');
    paragraphElement.innerHTML = geologyContent;
    const geologyImage = document.createElement('img')
    geologyImage.src = `./assets/geology-${currentPlanetName}.png`
    document.querySelector('.planetImg').src = `./assets/planet-${currentPlanetName}.svg`
    document.querySelector('.planet').appendChild(geologyImage).classList.add('geologyImg', 'makeAbsolute');};

// Hamburger functions
const menuBtn = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-nav')
menuBtn.addEventListener('click', function() {
  menuBtn.classList.toggle('is-active');
  mobileMenu.classList.toggle('is-active');
})

// Planet changing
function changePlanet(planetChoice) {
  console.log(planetChoice);
  const currentPlanet = data.planets.find(planet => planet.name === planetChoice);
  console.log(currentPlanet.geology.source);

  // close hamburger menu
  const menuBtn = document.querySelector('.hamburger');
  menuBtn.classList.toggle('is-active');
  mobileMenu.classList.toggle('is-active');

  // reset overview
  removeGeologyImg();
  overviewButtonClick();
  addActiveButton();

  // const new elements
  const newPlanetImg = currentPlanet.images.planet
  console.log(newPlanetImg)
  const newPlanetImgInternal = currentPlanet.images.internal
  console.log(newPlanetImgInternal)
  const newPlanetImgGeology = currentPlanet.images.geology
  console.log(newPlanetImgGeology)
  const newTitle = currentPlanet.name
  console.log(newTitle)

  // Changing through the DOM
  document.querySelector('#planetName').innerHTML = newTitle;
  document.querySelector('.planetImg').src = newPlanetImg;

  // Changing color theme dependent on planet
  let root = document.querySelector(':root')
  root.style.setProperty('--theme', `var(--${planetChoice.toLowerCase()}`)

  // document.querySelector('.dataResponse').innerHTML = newPlanetImg.(`${id}`);
  document.querySelector('#rotation').innerHTML = currentPlanet.rotation;
  document.querySelector('#revolution').innerHTML = currentPlanet.revolution;
  document.querySelector('#radius').innerHTML = currentPlanet.radius;
  document.querySelector('#temperature').innerHTML = currentPlanet.temperature;

  //changing sizes
  const planetSizeRatios = {
    mercury: 0.38,
    venus: 0.95,
    earth: 1,
    mars: 0.53,
    jupiter: 11.21,
    saturn: 9.45,
    uranus: 4.01,
    neptune: 3.88
  };
   
  const sizeRatio = planetSizeRatios[currentPlanet];
  const baseSize = 150; // You can adjust this value based on the desired base size for Earth
  const newSize = baseSize * sizeRatio;

  document.querySelector('.planetImg').style.width = `${newSize}px`;
  document.querySelector('.planetImg').style.height = `${newSize}px`;
}

// starry night background
function createStars(numberOfStars) {
  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    const starSize = ["small", "medium", "large", "xlarge", "big"];
    const randomSize = starSize[Math.floor(Math.random() * starSize.length)];

    star.className = `star ${randomSize}`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 3 + 1}s`;
    star.style.animationDelay = `${Math.random() * 2}s`;

    document.body.appendChild(star);
  }
}
createStars(150);

// altering planet sizes

// Update the planet image size
