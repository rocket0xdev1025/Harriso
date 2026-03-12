const elements = {
  Hat: document.getElementById("capybara-hat"),
  Glasses: document.getElementById("capybara-glasses"),
  Clothes: document.getElementById("capybara-clothes"),
  Universe: document.getElementById("capybara-universe"),
};

const itemLists = {
  Hat: [...Array(60)].map((_, i) => `./assets/img/generate/h-${i + 1}.png`),
  Glasses: [...Array(60)].map((_, i) => `./assets/img/generate/g-${i + 1}.png`),
  Clothes: [...Array(60)].map((_, i) => `./assets/img/generate/c-${i + 1}.png`),
  Universe: [...Array(60)].map(
    (_, i) => `./assets/img/generate/bg-${i + 1}.png`
  ),
};

const indices = { Hat: 0, Glasses: 0, Clothes: 0, Universe: 0 };

function getRandomElement(array) {
  const index = Math.floor(Math.random() * array.length);
  return { index, item: array[index] };
}

function updateImage(category) {
  const { index, item } = getRandomElement(itemLists[category]);
  const fileName = item.split("/").pop().split(".")[0];
  indices[category] = index;
  elements[category].src = item;
  elements[category].dataset.who = fileName;
  document.getElementById(
    `${category.toLowerCase()}-choice`
  ).textContent = `${category} ${index + 1}`;
}

function randomizeBtn() {
  Object.keys(itemLists).forEach(updateImage);
}

document.getElementById("name-input").addEventListener("input", function () {
  this.value = this.value.replace(/[^a-z\s]/g, "");
});

document
  .getElementById("sendToXCapyBara")
  .addEventListener("click", async () => {
    const button = document.getElementById("sendToXCapyBara");
    const buttonText = button.querySelector("span");
    button.disabled = true;
    buttonText.innerHTML = "Processing...";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const container = document.querySelector(".generatedImageContainer");
    const images = container.querySelectorAll(".generatorImageElement");
    const nameText = document.getElementById("name-input").value || "";

    canvas.width = canvas.height = 1000;

    const bgImage = await loadImage(elements.Universe.src);
    ctx.drawImage(bgImage, 0, 0, 1000, 1000);

    await document.fonts.ready;
    ctx.font = '80px "Potato Bold", sans-serif';
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(nameText, 500, 950);

    const dataWhoArray = [];

    for (const img of images) {
      dataWhoArray.push(img.dataset.who);
      if (img.id !== "capybara-universe") {
        const loadedImg = await loadImage(img.src);
        ctx.drawImage(loadedImg, 0, 0, 1000, 1000);
      }
    }

    const imageBase64 = canvas.toDataURL("image/jpeg", 0.8);

    // Benzersiz ID olu���tur
    const uniqueId = `custom_capybara_${Date.now()}`;

    const formData = new FormData();
    formData.append("image", imageBase64);
    formData.append("image_id", uniqueId);
    formData.append("image_who", dataWhoArray);

    try {
      const response = await fetch("upload_image.php", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        console.log(data);

        if (data.success) {
          const oauthUrl = "twitter_oauth.php";
          window.open(oauthUrl, "twitter-login", "width=600,height=400");
        }

        window.addEventListener("message", function (event) {
          console.log("Gelen mesaj:", event.data);
          if (event.data === "tweet_success") {
            Swal.fire({
              title: "Great!",
              text: "Tweet sent!",
              icon: "success",
              confirmButtonText: "Okay",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } else if (event.data === "tweet_error") {
            Swal.fire({
              title: "Error!",
              text: "Failed to Send Tweet!",
              icon: "error",
              confirmButtonText: "Okay",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        });
      } else {
        console.error("Image could not be uploaded:", data.message);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      button.disabled = false;
      buttonText.innerHTML = "Send to";
    }
  });

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function changeChoice(e) {
  const parent = e.target.parentElement;
  const text = parent.querySelector(".generateChoiceText").textContent;
  const category = Object.keys(itemLists).find((key) => text.includes(key));
  if (!category) return;

  const direction = e.target.classList.contains("previousChoice") ? -1 : 1;
  indices[category] =
    (indices[category] + direction + itemLists[category].length) %
    itemLists[category].length;

  const fileName = itemLists[category][indices[category]]
    .split("/")
    .pop()
    .split(".")[0];

  elements[category].src = itemLists[category][indices[category]];
  elements[category].dataset.who = fileName;
  parent.querySelector(".generateChoiceText").textContent = `${category} ${
    indices[category] + 1
  }`;
}

document
  .querySelectorAll(".generatorArrow")
  .forEach((el) => el.addEventListener("click", changeChoice));
