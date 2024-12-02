document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var eventInfoEl = document.getElementById("event-info"); // 이벤트 정보를 표시할 요소
  document.documentElement.style.setProperty("--fc-bg-event-opacity", "0");

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
    events: events.map((event) => {
      if (event.end) {
        let endDate = new Date(event.end);
        endDate.setDate(endDate.getDate() + 1); // end 날짜를 하루 증가시켜, 캘린더에 올바르게 반영하도록 조정
        return {
          ...event,
          end: endDate.toISOString().split("T")[0],
        };
      }
      return event;
    }),
    dayCellContent: function (arg) {
      const { date } = arg;
      return {
        html: `<div style="display: flex; justify-content: center; align-items: center; height: 100%;">${date.getDate()}</div>`,
      };
    },

    // 특정 날짜 클릭 시 해당 날짜의 모든 이벤트 정보를 표시
    dateClick: function (info) {
      const clickedDate = info.dateStr; // 클릭된 날짜 (YYYY-MM-DD 형식)
      const relatedEvents = events.filter(
        (event) =>
          (event.start <= clickedDate && event.end >= clickedDate) ||
          (event.start === clickedDate && !event.end)
      );

      // 클릭한 날짜와 관련된 이벤트 정보를 표시
      let htmlContent = `<div class="selected-date">${clickedDate}</div>`; // 클릭한 날짜 표시

      if (relatedEvents.length > 0) {
        htmlContent += relatedEvents
          .map((event) => `<div class="event-details">• ${event.title}</div>`)
          .join("");
      } else {
        htmlContent += "<div class='no-event'>학사 일정이 없습니다.</div>";
      }

      // HTML 요소에 삽입
      eventInfoEl.innerHTML = htmlContent;
    },

    // 이벤트 컨텐츠에 스타일 적용 (이벤트를 날짜 셀 뒤에 겹쳐지도록 설정)
    eventContent: function (arg) {
      return {
        html: `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(33, 150, 243, 0.2); opacity: 1; z-index: -1;">${arg.event.title}</div>`,
      };
    },
    eventDisplay: "background", // 이벤트를 배경 요소로 설정해 겹쳐지도록 합니다.

    // 달력 날짜가 설정될 때 실행, 마지막 주 숨기기
    views: {
      dayGridMonth: {
        type: "dayGrid",
        duration: { months: 1 },
        monthMode: true,
        fixedWeekCount: false, // 필요에 따라 유동적으로 주 수 결정
      },
    },
  });

  calendar.render();

  // 이전 달의 날짜와 다음 달의 날짜를 연한 회색으로 표시
  const style = document.createElement("style");
  style.innerHTML = `
    .fc-day-other {
      color: #c0c0c0; /* 연한 회색 */
    }
    .selected-date {
      display: inline-block;
      border-left: 2px solid rgba(0,0,0,0.8);
      padding-left:0.2rem;
      font-size: 0.9rem;
      letter-spacing: 0.1rem;
      // background-color:var(--gray);
      margin-bottom: 0.4rem;
    }
    .event-details {
      font-size: 0.75rem;
      color:rgba(0,0,0,0.5);
      margin-top:0.3rem;
      letter-spacing: 0.02rem
    }
    .no-event {
      color:rgba(0,0,0,0.5);
      font-size: 0.75rem;
      letter-spacing: 0.02rem;
      margin-top:0.3rem;
      font-size: 0.8rem;
    }
  `;
  document.head.appendChild(style);
});
