document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
  
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const username = document.getElementById("new-username").value;
      const password = document.getElementById("new-password").value;
  
      // Store user data (you might use localStorage or a backend in a real app)
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
  
      alert("Account created successfully!");
      window.location.href = "login.html"; // Redirect to login after sign up
    });
  });
  