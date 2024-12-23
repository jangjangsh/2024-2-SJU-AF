document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      if (!response.ok) throw Error();
      const token = await response.json();
      console.log(token);
      location.href = "/4-chat.html";
    } catch (e) {
      alert("로그인에 실패했습니다.");
    }
  });
});
