document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is fully loaded!");

  const form = document.getElementById("plant-form");
  const plantsContainer = document.getElementById("plants-container");
  const plantData = []; // Array to store plant information for notifications

   // Request notification permission on page load
   if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  // Function to show a notification
  function showNotification(plantName) {
    if (Notification.permission === "granted") {
      new Notification("Water Reminder", {
        body: `It's time to water your ${plantName}!`,
        // icon: 'images/notification-icon.png',  // Optional icon for notification
      });
    }
  }

  // Load local image dataset
  async function getLocalImage(species) {
    try {
      const response = await fetch("plantImages.json");
      const data = await response.json();
      return data[species.toLowerCase()] || data["default"]; // Default image if species is not found
    } catch (error) {
      console.error("Error fetching local image data:", error);
      return "images/default-plant.jpg"; // Fallback for errors
    }
  }

   // Function to check if a plant is overdue for watering
   function isPlantOverdue(lastWatered, waterFrequency) {
    const lastWateredDate = new Date(lastWatered);
    const today = new Date();
    const nextWateringDate = new Date(lastWateredDate);
    nextWateringDate.setDate(lastWateredDate.getDate() + parseInt(waterFrequency));

    return today > nextWateringDate;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted!");

    const plantName = document.getElementById("plant-name").value;
    const species = document.getElementById("plant-species").value || "Unknown";
    const lastWatered = document.getElementById("last-watered").value;
    const waterFrequency = parseInt(document.getElementById("water-frequency").value, 10);
    const plantPhoto = document.getElementById("plant-photo").files[0];
    const plantType = document.querySelector("input[name='plant-type']:checked")?.value || "Not Specified";
    const wateringTime = document.getElementById("watering-time").value || "Not Specified";
    const plantSize = document.getElementById("plant-size").value;

    console.log({
      plantName,
      species,
      lastWatered,
      waterFrequency,
      plantPhoto,
      plantType,
      wateringTime,
      plantSize,
    });
     


    // Determine photo URL
    let photoURL = "";
    if (plantPhoto) {
      photoURL = URL.createObjectURL(plantPhoto); // Use the uploaded file as the image source
    } else {
      photoURL = await getLocalImage(species); // Use species-specific image or default image
    }

    // Calculate next watering date
    const nextWateringDate = new Date(lastWatered);
    nextWateringDate.setDate(nextWateringDate.getDate() + waterFrequency);

    // Calculate days left for watering
    const today = new Date();
    const daysLeft = Math.ceil((nextWateringDate - today) / (1000 * 60 * 60 * 24));
    console.log("Calculated Days Left: ", daysLeft); // Debugging line to check if the calculation works

    // Check if the plant is overdue for watering
    const isOverdue = isPlantOverdue(lastWatered, waterFrequency);

    // Create a new plant card
    const plantCard = document.createElement("div");
    plantCard.classList.add("plant-card");

    // Apply the 'overdue' class if overdue
    if (isOverdue) {
      plantCard.classList.add("overdue");
      // Show notification for overdue plant
      showNotification(plantName);
    }

    // Adjust the message for days left based on overdue status
    const daysLeftMessage = daysLeft<=0 ? "It's high time to water!!!" : `${daysLeft} days`;


    // plantCard.innerHTML = `
    //   <img src="${photoURL}" alt="${plantName}" class="plant-photo" />
    //   <h3>${plantName}</h3>
    //   <p><strong>Species:</strong> ${species}</p>
    //   <p><strong>Last Watered:</strong> ${lastWatered}</p>
    //   <p><strong>Water Frequency:</strong> Every ${waterFrequency} days</p>
    //   <p><strong>Next Watering:</strong> ${nextWateringDate.toDateString()}</p>
    //   <p><strong>Days Left to Water:</strong> ${daysLeftMessage} </p>
    //   <p><strong>Type:</strong> ${plantType}</p>
    //   <p><strong>Preferred Watering Time:</strong> ${wateringTime}</p>
    //   <p><strong>Size:</strong> ${plantSize}</p>
    // `;

    plantCard.innerHTML = `
  <img src="${photoURL}" alt="${plantName}" class="plant-photo" />
  <div class="plant-info">
    <h3>${plantName}</h3>
    <p><strong>Species:</strong> ${species}</p>
    <p><strong>Last Watered:</strong> ${lastWatered}</p>
    <p><strong>Water Frequency:</strong> Every ${waterFrequency} days</p>
    <p><strong>Next Watering:</strong> ${nextWateringDate.toDateString()}</p>
    <p><strong>Days Left to Water:</strong> ${daysLeftMessage} </p>
    <p><strong>Type:</strong> ${plantType}</p>
    <p><strong>Preferred Watering Time:</strong> ${wateringTime}</p>
    <p><strong>Size:</strong> ${plantSize}</p>
  </div>
`;



    // Add the card to the plants container
    plantsContainer.appendChild(plantCard);
    console.log("Plant card added:", plantCard);

     // Add the plant data to the array for notifications
     plantData.push({
      plantName,
      nextWateringDate,
    });

    // Clear the form
    form.reset();
  });

  // Check for watering notifications every minute
  setInterval(() => {
    const currentDate = new Date();
    plantData.forEach((plant) => {
      if (plant.nextWateringDate <= currentDate) {
        console.log(`Reminder: It's time to water your ${plant.plantName}!`);
        // Optionally highlight the plant card or trigger a browser notification
      }
    });
  }, 5000); // Check every 60 seconds
});
