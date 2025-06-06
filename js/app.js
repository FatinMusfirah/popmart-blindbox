// app.js
const seriesData = {
    skullpanda: [
      { name: "Skullpanda Angel", img: "assets/images/skullpanda1.png", rarity: "Common" },
      { name: "Skullpanda Devil", img: "assets/images/skullpanda2.png", rarity: "Rare" },
      { name: "Skullpanda Sleepy", img: "assets/images/skullpanda3.png", rarity: "Epic" },
    ],
    labubu: [
      { name: "Labubu Pirate", img: "assets/images/labubu1.png", rarity: "Common" },
      { name: "Labubu Astronaut", img: "assets/images/labubu2.png", rarity: "Rare" },
      { name: "Labubu Chef", img: "assets/images/labubu3.png", rarity: "Legendary" },
    ],
  };
  
  let currentSeries = "skullpanda";
  let collection = [];
  
  function selectSeries(series) {
    currentSeries = series;
    document.getElementById("resultBox").innerHTML = `
      <p class="text-xl font-bold text-[#ff70a6]">Series selected: ${series.charAt(0).toUpperCase() + series.slice(1)}</p>
    `;
  }
  
  function openBox() {
    const box = document.getElementById("resultBox");
    const sound = document.getElementById("openSound");
    const items = seriesData[currentSeries];
    const random = items[Math.floor(Math.random() * items.length)];
  
    // Play sound
    sound.currentTime = 0;
    sound.play();
  
    // Show result
    box.innerHTML = `
      <p class="text-lg">You got:</p>
      <p class="text-2xl font-bold text-pink-500">${random.name}</p>
      <img class="mx-auto my-4 rounded-xl shadow-md w-40" src="${random.img}" alt="${random.name}" />
    `;
  
    // Add to collection
    collection.push(random);
    updateCollection();
  }
  
  function updateCollection() {
    const area = document.getElementById("collectionArea");
    area.innerHTML = "";
    collection.forEach(item => {
      const container = document.createElement("div");
      container.className = "inline-block text-center mx-2";
      container.innerHTML = `
        <img class="h-20 w-20 object-cover rounded-lg shadow" src="${item.img}" alt="${item.name}" />
        <p class="text-sm mt-1">${item.name}</p>
      `;
      area.appendChild(container);
    });
  }  