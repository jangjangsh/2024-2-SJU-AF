document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(signupForm);

    try {
      const response = await fetch("/api/auth/signup", {
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
      document.querySelector(".success-modal").style.display = "flex";
      // 확인 버튼 클릭 시 팝업창 닫고 로그인 페이지로 이동
      document
        .querySelector(".modal-button")
        .addEventListener("click", function () {
          document.querySelector(".success-modal").style.display = "none"; // 팝업창 숨기기
          window.location.href = "/2-login.html";
        });
    } catch (e) {
      alert("회원가입에 실패했습니다.");
    }
  });
});
