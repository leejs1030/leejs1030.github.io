const bootstrap = (minTime) => {
  const date = document.querySelector("#date input");
  // 오늘 날짜 string
  const now = new Date();
  now.setUTCHours(now.getUTCHours() + 9);
  const todayString = `${now.getUTCFullYear()}/${
    now.getUTCMonth() + 1
  }/${now.getUTCDate()}`;

  const minDate = document.createAttribute("data-min-date");
  const beforeYear = new Date(now);
  beforeYear.setUTCFullYear(now.getUTCFullYear() - 1);
  if (minTime <= beforeYear) minTime = beforeYear;
  minDate.value = `${minTime.getUTCFullYear()}/${
    minTime.getUTCMonth() + 1
  }/${minTime.getUTCDate()}`;
  date.attributes.setNamedItem(minDate);

  // 현재 날짜 이후로 선택 불가
  const maxDate = document.createAttribute("data-max-date");
  maxDate.value = todayString;
  date.attributes.setNamedItem(maxDate);

  // 기본 값을 오늘 날짜로
  const value = document.createAttribute("value");
  value.value = todayString;
  date.attributes.setNamedItem(value);

  Metro.utils.addLocale({
    "ko-KR": {
      calendar: {
        months: [
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
          "11월",
          "12월",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ],
        days: ["일", "월", "화", "수", "목", "금", "토"],
        time: {
          days: "요일",
          hours: "시",
          minutes: "분",
          seconds: "초",
        },
      },
    },
  });
};
