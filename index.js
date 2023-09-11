const mm = document.getElementById("mm");
const hohe = document.querySelector(".hohe");
const lengthInput = document.getElementById("length");
const width = document.getElementById("width");
const recommendedMaterialInKg = document.getElementById("material_kg");
const notesContainer = document.getElementById("notes__container");
const clearInput = document.querySelector(".fa-window-close");
const materialInput = document.getElementById("materialInput");
const materialOptions = document.getElementById("materialOptions");
let materialId = null;
function fetchMaterials(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "fetch_materials.php", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const materials = JSON.parse(xhr.responseText);
      console.log(materials);
      callback(materials);
    }
  };
  xhr.send();
}

fetchMaterials(function (materials) {
  function filterMaterials(searchTerm) {
    const filteredMaterials = materials?.material.filter((material) => {
      return material.material_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    return filteredMaterials;
  }

  function updateMaterialOptions() {
    const searchTerm = materialInput.value;

    materialOptions.innerHTML = "";
    const filteredMaterials = filterMaterials(searchTerm);

    filteredMaterials.forEach((material) => {
      const option = document.createElement("div");
      option.classList.add("material-option");
      option.textContent = material.material_name;
      materialOptions.style.backgroundColor = "white";
      materialOptions.style.padding = "10px";
      option.setAttribute(
        "data-material-values",
        `${material?.coerning_from}-${material?.coerning_to}`
      );
      option.setAttribute("data-material-id", material.material_id);
      option.addEventListener("click", () => {
        materialId = option.getAttribute("data-material-id");
        materialInput.value = material.material_name;
        console.log(option.getAttribute("data-material-values"));
        materialOptions.innerHTML = "";
        materialOptions.style.backgroundColor = "none";
        materialOptions.style.padding = "0";
        updateFields(option.getAttribute("data-material-values"));
      });

      materialOptions.appendChild(option);
    });
  }

  const materialInput = document.getElementById("materialInput");
  materialInput.addEventListener("input", () => {
    updateMaterialOptions();
  });

  console.log(materials);
});

const bulkDensity = 1600;
let hoheValue = 0;

function fetchNotes(recommendedKg) {
  const xhr = new XMLHttpRequest();
  const url = `fetch_articles.php?material_id=${encodeURIComponent(
    materialId
  )}`;

  xhr.open("GET", url, true);

  xhr.onreadystatechange = function () {
    notesContainer.innerHTML = "";
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      console.log(response.articles);
      response?.articles.forEach(function (article) {
        console.log(
          typeof recommendedKg,
          recommendedKg,
          typeof article.packing_capacity_in_kg,
          article.packing_capacity_in_kg
        );
        const noteDiv = `
          <div class="article">
            <p>${article.item_number}</p>
            <p>${article.packaging_unit}</p>
            <p>${(recommendedKg / article.packing_capacity_in_kg)
              .toString()
              .replace(".", ",")} StÜck</p>
          </div>
        `;

        notesContainer.insertAdjacentHTML("beforeend", noteDiv);
      });
    }
  };

  xhr.send();
}

function updateFields(selectedMaterial) {
  console.log(selectedMaterial, "sm");
  if (selectedMaterial) {
    const values = selectedMaterial.split("-");
    console.log(values);
    mm.value = values[1];
    bis.value = values[0];
    hohe.value = (mm.value * 2) / 1000;
    calculateRecommendedMaterial();
  } else {
    console.log("run");
    mm.value = "";
    bis.value = "";
    hohe.value = "";
    recommendedMaterialInKg.value = "";
    notesContainer.innerHTML = "";
  }
}

function calculateRecommendedMaterial() {
  console.log("running");
  console.log(lengthInput);
  const lengthValue = parseFloat(lengthInput.value);
  console.log(lengthValue);
  const widthValue = parseFloat(width.value);

  if (!isNaN(lengthValue) && !isNaN(widthValue)) {
    const area = lengthValue * widthValue * hohe.value;
    const recommendedMaterial = area * bulkDensity;
    console.log(recommendedMaterial);
    let updateRecommendedMaterial = recommendedMaterial;
    console.log("running");
    recommendedMaterialInKg.value = `${updateRecommendedMaterial} kg`;
    fetchNotes(updateRecommendedMaterial);
  }
}

mm.addEventListener("input", () => {
  hohe.value = (mm.value * 2) / 1000;
  calculateRecommendedMaterial();
});

clearInput.addEventListener("click", () => {
  console.log("run");
  materialInput.value = "";
  materialOptions.innerHTML = "";
});

function resetForm() {
  document.getElementById("materialInput").value = "";
  document.getElementById("mm").value = "";
  document.getElementById("bis").value = "";
  document.getElementById("length").value = "";
  document.getElementById("width").value = "";
  document.getElementById("result").value = "";
  document.getElementById("material_kg").value = "";
  document.getElementById("notes__container").innerHTML = "";
}

lengthInput.addEventListener("input", calculateRecommendedMaterial);
width.addEventListener("input", calculateRecommendedMaterial);
const initialSelectedMaterial = null;
updateFields(initialSelectedMaterial);
