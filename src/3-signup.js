// 가입하기 버튼 클릭 이벤트 처리
document
  .getElementById("signup-button")
  .addEventListener("click", function (event) {
    event.preventDefault(); // 페이지 이동을 방지

    // 팝업창 띄우기
    document.querySelector(".success-modal").style.display = "flex";
  });

// 확인 버튼 클릭 시 팝업창 닫고 로그인 페이지로 이동
document.querySelector(".modal-button").addEventListener("click", function () {
  document.querySelector(".success-modal").style.display = "none"; // 팝업창 숨기기
  window.location.href = "/2-login.html"; // 로그인 페이지로 이동
});
