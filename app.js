//promises are functions that run in the background while other code runs
// await waits for the function to complete until finished
// good for fetch since you don't know how long fetch takes

async function fetchBreedList() {
  const res = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await res.json();
  createBreedList(data.message);
}

function createBreedList(breedList) {
  document.getElementById(
    "breed"
  ).innerHTML = `<select onchange="loadByBreed(this.value)">
    <option>Choose a Dog Breed</option>
    ${Object.keys(breedList)
      .map(function (breed) {
        return `<option>${breed}</option>`;
      })
      .join("")}
  </select>`;
}



async function loadByBreed(breed) {
  if (breed != "Choose a Dog Breed") {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await res.json();
    console.log(data);
    createSlideshow(data.message)
  }
}


function createSlideshow(images) {
    let currentPosition = 0;
    document.getElementById("slideshow").innerHTML = `
      <div class="slide" style="background-image:url(${images[currentPosition]})"> </div>
      `;
    currentPosition++
    setInterval(nextSlide, 3000);
    function nextSlide(){
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image:url(${images[currentPosition]})"> </div>
        `;

        if (currentPosition + 1 >= images.length){
            currentPosition = 0;
        } else{
            currentPosition++;
        }
    }
  }


fetchBreedList();
