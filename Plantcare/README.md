# 🌿 The Watering Whisperer for Plants

A virtual plant care assistant web app that helps you manage your plant collection by keeping track of watering schedules, sending real-time reminders, and allowing image uploads and species-based identification.

---

## 🚀 Features

- ✅ **Add and Track Plants:** Input plant details such as name, species, watering frequency, and last watered date.
- 📸 **Image Support:** Upload your own plant photo or use species-based images from a local dataset.
- ⏰ **Real-Time Notifications:** Get browser notifications when it’s time to water your plants.
- 🌱 **Overdue Alerts:** Plants that are overdue for watering are visually highlighted.
- 📋 **User-Friendly Interface:** Clean and intuitive form and card-based UI built with HTML, CSS, and JavaScript.
- 🔒 **Login/Signup Pages:** Basic login and signup screens (with hardcoded/localStorage-based auth for demo purposes).

---

## 💡 How It Works

1. **Add a Plant**  
   Fill in the form with your plant’s name, species, watering frequency, and other preferences.

2. **Track Watering**  
   The app calculates the next watering date based on your last watered date and frequency. It shows how many days are left.

3. **Get Notified**  
   If a plant is overdue, you’ll receive a browser notification and visual alert on the card.

4. **Responsive Cards**  
   Each plant is displayed in a styled card showing all key details, including image, species, size, and type.

---

## 📁 Project Structure

```bash
📦 plant-care-app/
├── index.html             # Main plant tracker interface
├── login.html             # Login page
├── signup.html            # Signup page
├── script.js              # Core functionality and notification logic
├── login.js               # Login form handler
├── signup.js              # Signup form handler
├── style.css              # Styles for index.html
├── style-login.css        # Styles for login.html
├── style-signup.css       # Styles for signup.html
├── images/                # Backgrounds, logo, and plant photos
└── plantImages.json       # (Optional) Species-based plant image dataset
