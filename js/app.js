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
  
  function selectSeries(seriesName) {
    currentSeries = seriesName;
  
    const buttons = document.querySelectorAll('.series-list button');
    buttons.forEach(btn => {
      btn.classList.remove('selected');
      if (btn.dataset.series === seriesName) {
        btn.classList.add('selected');
      }
    });
  
    document.getElementById("resultBox").innerHTML = '';
  }
  
  function openBox() {
    const box = document.getElementById("resultBox");
    const sound = document.getElementById("openSound");
    const items = seriesData[currentSeries];
    const random = items[Math.floor(Math.random() * items.length)];
  
    sound.currentTime = 0;
    sound.play();
  
    box.innerHTML = `
      <p class="text-lg">You got:</p>
      <p class="text-2xl font-bold rarity-${random.rarity.toLowerCase()}">${random.name} (${random.rarity})</p>
      <img class="animate rarity-${random.rarity}" src="${random.img}" alt="${random.name}" />
    `;
  
    setTimeout(() => {
      const img = document.getElementById("revealedItem");
      if (img) img.classList.add("animate");
    }, 50);
  
    addToCollection(random);
    updateCollection();
    saveCollection();
  }
  
  function addToCollection(item) {
    const existing = collection.find(i => i.name === item.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      collection.push({ ...item, quantity: 1 });
    }
  }
  
  function updateCollection() {
    const area = document.getElementById("collectionArea");
    area.innerHTML = "";
    collection.forEach(item => {
      const container = document.createElement("div");
      container.className = "inline-block text-center mx-2 relative";
  
      container.innerHTML = `
        <div class="relative">
          <img class="h-20 w-20 object-cover rounded-lg shadow" src="${item.img}" alt="${item.name}" />
          ${item.quantity > 1 ? `<div class="absolute bottom-0 right-0 bg-black text-white text-xs px-1 rounded-full">x${item.quantity}</div>` : ''}
        </div>
        <p class="text-sm mt-1">${item.name}</p>
      `;
  
      area.appendChild(container);
    });
    updateCollectionCount();
  }
  
  function saveCollection() {
    localStorage.setItem('popmartCollection', JSON.stringify(collection));
  }
  
  function loadCollection() {
    const saved = localStorage.getItem('popmartCollection');
    if (saved) {
      collection = JSON.parse(saved);
      updateCollection();
    }
  }
  
  function updateCollectionCount() {
    const countEl = document.getElementById("collectionCount");
    const total = collection.reduce((sum, item) => sum + item.quantity, 0);
    countEl.textContent = `Total items collected: ${total}`;
  }
  
  window.onload = function () {
    loadCollection();
  }
  
  document.getElementById("clearCollectionBtn").addEventListener("click", () => {
    collection = [];
    updateCollection();
    saveCollection();
    document.getElementById("resultBox").innerHTML = "";
  });
  