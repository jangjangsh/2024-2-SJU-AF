let isFirst = true;

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.querySelector(".question-input"); // 메시지 입력 필드
  const submitForm = document.querySelector(".question-form"); // 전송 버튼
  const chatContainer = document.querySelector(".chatbot-main"); // 채팅 메시지들이 추가될 영역
  const introduceContainer = document.querySelector(".chatbot-introduce");
  const exampleButtons = document.querySelectorAll(".question-example"); // 예상 질문 버튼들
  const questionButtons = document.querySelectorAll(".question-example"); // 예상 질문 랜덤돌리기에 쓰는거

  // 처음에는 소개 컨테이너만 화면에 보이도록 초기 설정
  chatContainer.style.display = "none";
  introduceContainer.style.display = "flex";

  // 사용자가 메시지를 전송하는 함수
  function sendMessage(message) {
    // 입력이 처음이라면 소개 컨테이너 비활성화 및 채팅 컨테이너 활성화
    if (isFirst) {
      chatContainer.style.display = "block";
      introduceContainer.style.display = "none";
      isFirst = false;
    }

    if (!message.trim()) return; // 빈 입력 방지

    // 사용자 메시지를 DOM에 추가
    const userMessageContainer = document.createElement("div");
    userMessageContainer.classList.add("me-question-container");
    userMessageContainer.innerHTML = `
          <div class="me-question">
            <div class="chatbot-bubble-group me-bubble">
              <span class="me-question-content">${message}</span>
            </div>
          </div>
        `;
    chatContainer.appendChild(userMessageContainer);

    inputField.value = ""; // 입력 필드 초기화

    // 백엔드로 메시지 전송
    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: message }),
    })
      .then((response) => {
        return response.json();
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

  // 예상 질문 버튼 클릭 이벤트
  exampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const exampleMessage = button.textContent; // 버튼의 텍스트 가져오기
      sendMessage(exampleMessage); // 메시지 전송
    });
  });

  // 제출 이벤트
  submitForm.addEventListener("submit", (event) => {
    event.preventDefault(); // 버튼 기본 동작 방지
    const formData = new FormData(submitForm);
    sendMessage(formData.get("question")); // 입력된 메시지 전송
  });

  //예상질문 랜덤돌리기 코드 (클릭한애만 바뀜)
  const questions = [
    "꿀교양 알려줘",
    "이번학기 수강신청 일정 알려줘",
    "학사일정 언제부터 시작해?",
    "학교 근처 맛집 추천해줘",
    "내일 날씨 어때?",
    "교수님 연락처 알 수 있을까?",
    "학점 관리 어떻게 해야 할까?",
    "수업 평가 어떻게 찾아?",
    "교환학생 프로그램 어떻게 진행돼?",
    "장학금 신청 마감일은 언제야?",
    "세종대학교 캠퍼스 맵 어디 있어?",
    "시험 공지사항 어디서 확인할 수 있어?",
    "온라인 강의 어떻게 듣는 거야?",
    "교수님 강의실 위치 어디야?",
    "학과 소식 어디서 확인하지?",
    "도서관 운영 시간 알려줘",
    "교내 행사 일정은 어디서 확인해?",
    "카페테리아 메뉴는 어떻게 확인해?",
    "컴퓨터실 예약 어떻게 하지?",
    "기숙사 신청 방법이 뭐야?",
  ];

  questionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];
      button.textContent = randomQuestion; // 버튼 텍스트를 랜덤으로 변경
    });
  });
});
