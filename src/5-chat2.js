document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.querySelector(".question-input"); // 메시지 입력 필드
  const submitButton = document.querySelector(".question-submit-button"); // 전송 버튼
  const chatContainer = document.querySelector(".chatbot-main"); // 채팅 메시지들이 추가될 영역

  // 사용자가 메시지를 전송하는 함수
  function sendMessage() {
    const message = inputField.value.trim(); // 입력값 가져오기
    if (!message) return; // 빈 입력 방지

    // 사용자 메시지를 DOM에 추가
    const userMessageContainer = document.createElement("div");
    userMessageContainer.classList.add("me-question-container"); // 사용자 메시지 컨테이너 클래스
    userMessageContainer.innerHTML = `
        <div class="me-question">
          <div class="chatbot-bubble-group me-bubble">
            <span class="me-question-content">${message}</span>
          </div>
        </div>
      `;
    chatContainer.appendChild(userMessageContainer);

    inputField.value = ""; // 입력 필드 초기화

    // 백엔드로 메시지 전송 (테스트용 코드)
    fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: message }),
    })
      .then(() => {
        // 테스트용 응답
        return {
          answer: "테스트 응답입니다!",
        };
      })
      .then((data) => {
        // 서버 응답 메시지 추가
        addChatbotResponse(data.answer);
      })
      .catch((error) => {
        console.error("Error:", error);
        addChatbotResponse("죄송합니다, 오류가 발생했습니다.");
      });
  }

  // 서버 응답을 채팅창에 추가하는 함수
  function addChatbotResponse(answer) {
    const botMessageContainer = document.createElement("div");
    botMessageContainer.classList.add("chatbot-answer-container");
    botMessageContainer.innerHTML = `
        <div class="chatbot-profile">
          <div class="chatbot-profile-img">
            <img src="./img/Logo.png" alt="profile" />
          </div>
        </div>
        <div class="chatbot-answer">
          <div class="chatbot-bubble-group chatbot-bubble">
            <span class="chatbot-answer-content">${answer}</span>
          </div>
        </div>
      `;
    chatContainer.appendChild(botMessageContainer);

    // 새 메시지로 스크롤 이동
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // 전송 버튼 클릭 이벤트
  submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // 버튼 기본 동작 방지
    sendMessage();
  });

  // Enter 키로 메시지 전송
  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });
});
