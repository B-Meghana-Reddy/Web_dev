document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      // Hardcoded username and password for demo
      const correctUsername = "user";
      const correctPassword = "123";
  
      if (username === correctUsername && password === correctPassword) {
        // Redirect to main page or plant page after login
        window.location.href = "index.html";  // Replace with your main page URL
      } else {
        alert("Invalid username or password!");
      }
    });
  });
  