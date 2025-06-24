document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const mensagemSucesso = document.getElementById("mensagemSucesso");
    const formulario = document.getElementById("formulario");
  
    async function realizarLogin(e) {
      e.preventDefault();
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("senha").value;
  
      try {
        const res = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (res.ok) {
          mensagemSucesso.style.display = "block";
          formulario.style.display = "none";
          setTimeout(() => {
            window.location.href = "telaPrincipal.html";
          }, 1500);
        } else {
          const data = await res.json();
          alert(data.message || "Erro ao fazer login");
        }
      } catch (error) {
        alert("Erro na requisição: " + error.message);
      }
    }
  
    if (loginForm) {
      loginForm.addEventListener("submit", realizarLogin);
    }
  });