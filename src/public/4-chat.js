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
    "교양 과목 알려줘",
    "학생회관 메뉴 알려줘",
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

  /*------------장서현 코드: 달력-------------------*/
  var calendarEl = document.getElementById("calendar");
  var eventInfoEl = document.getElementById("event-info"); // 이벤트 정보를 표시할 요소

  const events = [
    {
      title: "2학기 기말고사 성적마감",
      start: "2024-01-02",
      end: "2024-01-03",
    },
    {
      title: "1학기 복학, 휴학 신청",
      start: "2024-01-22",
      end: "2024-01-28",
    },
    { title: "1학기 수강신청", start: "2024-02-13", end: "2024-02-16" },
    { title: "제82회 학위수여식", start: "2024-02-16", end: "2024-02-16" },
    { title: "1학기 등록", start: "2024-02-19", end: "2024-02-23" },
    { title: "입학식", start: "2024-02-26", end: "2024-02-26" },
    { title: "1학기 개강", start: "2024-03-04", end: "2024-03-04" },
    {
      title: "수강신청 과목 확인 및 변경",
      start: "2024-03-05",
      end: "2024-03-08",
    },
    { title: "교직신청", start: "2024-03-06", end: "2024-03-19" },
    { title: "수강신청과목 철회", start: "2024-03-27", end: "2024-03-29" },
    { title: "1학기 중간고사", start: "2024-04-22", end: "2024-04-26" },
    {
      title: "1학기 중간고사 성적 입력",
      start: "2024-04-27",
      end: "2024-05-01",
    },
    {
      title: "1학기 중간고사 성적 열람 및 정정",
      start: "2024-05-02",
      end: "2024-05-07",
    },
    {
      title: "창립 84주년 기념휴일 (창립일 : 1940. 5. 20)",
      start: "2024-05-03",
      end: "2024-05-03",
    },
    {
      title: "복수·부전공, 연계융합전공 신청",
      start: "2024-05-07",
      end: "2024-05-19",
    },
    {
      title: "하계 계절학기 수강신청",
      start: "2024-06-03",
      end: "2024-06-05",
    },
    { title: "1학기 강의평가", start: "2024-06-10", end: "2024-06-26" },
    {
      title: "1학기 기말고사 및 수업결손 보충",
      start: "2024-06-17",
      end: "2024-06-21",
    },
    {
      title: "1학기 기말고사 성적 입력",
      start: "2024-06-22",
      end: "2024-06-26",
    },
    {
      title: "하계방학 시작 및 계절학기 개강",
      start: "2024-06-24",
      end: "2024-06-24",
    },
    {
      title: "1학기 기말고사 성적 열람 및 정정",
      start: "2024-06-27",
      end: "2024-07-01",
    },
    {
      title: "1학기 기말고사 성적마감",
      start: "2024-07-02",
      end: "2024-07-03",
    },
    {
      title: "2학기 복학, 휴학 신청",
      start: "2024-07-29",
      end: "2024-08-04",
    },
    { title: "2학기 수강신청", start: "2024-08-12", end: "2024-08-19" },
    {
      title: "제82회 후기 학위수여식",
      start: "2024-08-16",
      end: "2024-08-16",
    },
    { title: "2학기 등록", start: "2024-08-20", end: "2024-08-23" },
    { title: "2학기 개강", start: "2024-09-02", end: "2024-09-02" },
    {
      title: "수강신청과목 확인 및 변경",
      start: "2024-09-03",
      end: "2024-09-06",
    },
    { title: "수강신청과목 철회", start: "2024-09-25", end: "2024-09-27" },
    { title: "2학기 중간고사", start: "2024-10-21", end: "2024-10-25" },
    {
      title: "2학기 중간고사 성적 입력",
      start: "2024-10-26",
      end: "2024-10-29",
    },
    {
      title: "2학기 중간고사 성적 열람 및 정정",
      start: "2024-10-30",
      end: "2024-11-03",
    },
    {
      title: "전공신청, 복수⋅부전공, 연계융합전공 신청",
      start: "2024-11-04",
      end: "2024-11-13",
    },
    {
      title: "동계 계절학기 수강신청",
      start: "2024-12-02",
      end: "2024-12-04",
    },
    { title: "2학기 강의평가", start: "2024-12-09", end: "2024-12-26" },
    {
      title: "2학기 기말고사 및 수업결손 보충",
      start: "2024-12-16",
      end: "2024-12-20",
    },
    {
      title: "2학기 기말고사 성적 입력",
      start: "2024-12-21",
      end: "2024-12-26",
    },
    {
      title: "동계방학 시작 및 계절학기 개강",
      start: "2024-12-23",
      end: "2024-12-23",
    },
    {
      title: "2학기 기말고사 성적 열람 및 정정",
      start: "2024-12-27",
      end: "2024-12-31",
    },
    {
      title: "2학기 기말고사 성적마감",
      start: "2025-01-02",
      end: "2025-01-03",
    },
    {
      title: "1학기 복학, 휴학 신청",
      start: "2025-01-27",
      end: "2025-02-02",
    },
    { title: "1학기 수강신청", start: "2025-02-11", end: "2025-02-14" },
    { title: "제83회 학위수여식", start: "2025-02-14", end: "2025-02-14" },
    { title: "1학기 등록", start: "2025-02-18", end: "2025-02-21" },
    { title: "입학식", start: "2025-02-24", end: "2025-02-24" },
  ];
  // FullCalendar 초기화
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    height: "auto",
    locale: "ko",
    headerToolbar: {
      left: "today",
      center: "title",
      right: "prev,next",
    },
    events: events,

    dayCellContent: function (arg) {
      const { date } = arg;
      return {
        html: `<div style="display: flex; justify-content: center; align-items: center; height: 100%;">${date.getDate()}</div>`,
      };
    },

    eventClick: function (info) {
      const eventTitle = info.event.title;
      const startDate = info.event.start.toISOString().split("T")[0];
      const endDate = info.event.end
        ? info.event.end.toISOString().split("T")[0]
        : startDate;

      eventInfoEl.innerHTML = `<b>${startDate} ~ ${endDate}</b><br> • ${eventTitle}`;
    },
    datesSet: function () {
      const allWeeks = document.querySelectorAll(".fc-daygrid-week");

      allWeeks.forEach((week, index) => {
        if (index >= 5) {
          week.style.display = "none";
        }
      });
    },
    eventContent: function (arg) {
      return {
        html: `<div style="position: relative;">
                    <span style="opacity: 0;">${1}</span>
                  </div>`,
      };
    },
  });

  calendar.render();

  const headerToolbar = document.querySelector(".fc-header-toolbar");
});

// eventRender: function (info) {
//   // 이벤트 커스터마이징
//   info.el.style.backgroundColor = "#ff5722";
//   info.el.style.color = "white";
//   info.el.querySelector(".fc-event-title").innerHTML = "내 디자인 텍스트";
// },
