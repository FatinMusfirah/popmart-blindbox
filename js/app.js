// Box data & rarity weights
const boxes = {
    skullpanda: [
      { name: "Skullpanda Common", rarity: "Common" },
      { name: "Skullpanda Rare", rarity: "Rare" },
      { name: "Skullpanda UltraRare", rarity: "UltraRare" },
    ],
    labubu: [
      { name: "Labubu Common", rarity: "Common" },
      { name: "Labubu Rare", rarity: "Rare" },
      { name: "Labubu UltraRare", rarity: "UltraRare" },
    ],
    monster: [
      { name: "Monster Common", rarity: "Common" },
      { name: "Monster Rare", rarity: "Rare" },
      { name: "Monster UltraRare", rarity: "UltraRare" },
    ],
  };
  
  const rarityWeights = { UltraRare: 5, Rare: 25, Common: 70 };
  
  let selectedBox = "skullpanda";
  let collection = [];
  
  const boxPicker = document.getElementById("boxPicker");
  const openButton = document.getElementById("openButton");
  const resultDiv = document.getElementById("result");
  const collectionDiv = document.getElementById("collection");
  
  const boxImages = {
    skullpanda: "assets/images/skullpanda.png",
    labubu: "assets/images/labubu.png",
    monster: "assets/images/monster.png",
  };
  
  const openSound = new Audio('assets/sounds/open-sound.ogg');
  
  function renderBoxes() {
    boxPicker.innerHTML = "";
    for (const [key, items] of Object.entries(boxes)) {
      const col = document.createElement("div");
      col.className = "col-6 col-sm-4 col-md-2 mb-4";
  
      const card = document.createElement("div");
      card.className = "box-card p-3";
      card.setAttribute("tabindex", 0);
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Select ${key.charAt(0).toUpperCase() + key.slice(1)} Box`);
      card.dataset.box = key;
  
      if (key === selectedBox) card.classList.add("selected");
  
      const img = document.createElement("img");
      img.src = boxImages[key];
      img.alt = `${key} blind box`;
      img.className = "img-fluid rounded-3 mb-3";
  
      const label = document.createElement("p");
      label.className = "fw-semibold text-dark mb-0";
      label.textContent = key.charAt(0).toUpperCase() + key.slice(1);
  
      card.appendChild(img);
      card.appendChild(label);
      col.appendChild(card);
      boxPicker.appendChild(col);
  
      card.addEventListener("click", () => {
        document.querySelectorAll(".box-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedBox = key;
        resultDiv.textContent = `Selected box: ${label.textContent}. Click the open button!`;
      });
  
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.click();
        }
      });
    }
  }
  
  function pickRarity() {
    const roll = Math.random() * 100;
    if (roll < rarityWeights.UltraRare) return "UltraRare";
    else if (roll < rarityWeights.UltraRare + rarityWeights.Rare) return "Rare";
    else return "Common";
  }
  
  function getRandomCollectible(boxName) {
    const rarity = pickRarity();
    const filtered = boxes[boxName].filter(c => c.rarity === rarity);
    return filtered[Math.floor(Math.random() * filtered.length)];
  }
  
  function renderCollection() {
    collectionDiv.innerHTML = "";
    collection.forEach(item => {
      const col = document.createElement("div");
      col.className = "col";
  
      const card = document.createElement("div");
      card.className = "p-3 rounded-4 text-center fw-semibold";
  
      if (item.rarity === "Common") card.classList.add("item-common");
      else if (item.rarity === "Rare") card.classList.add("item-rare");
      else card.classList.add("item-ultrarare");
  
      card.textContent = `${item.name} (${item.rarity})`;
  
      col.appendChild(card);
      collectionDiv.appendChild(col);
    });
  }
  
  openButton.addEventListener("click", () => {
    openButton.disabled = true;
    resultDiv.textContent = "Opening...";
    openButton.classList.add("shake");
    openSound.play();
  
    setTimeout(() => {
      const prize = getRandomCollectible(selectedBox);
      resultDiv.textContent = `You got: ${prize.name} (${prize.rarity})!`;
      resultDiv.classList.remove("fade-in");
      void resultDiv.offsetWidth;
      resultDiv.classList.add("fade-in");
  
      collection.push(prize);
      renderCollection();
      openButton.disabled = false;
      openButton.classList.remove("shake");
    }, 2000);
  });
  
  renderBoxes();
  