'use strict';

const getDateString = (date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return `${year}/${month}/${day}`;
}

const bootstrap = () => {
  const minTime = new Date('2022-05-14T21:00:00+09:00');
  const defaultTime = new Date('2022-06-01T21:00:00+09:00');
  const maxTime = new Date('2023-07-28T08:00:00+09:00');

  const date = document.querySelector("#date input");
  // 오늘 날짜 string
  const baseDate = new Date('2022-05-14T21:00:00+09:00');
  baseDate.setUTCHours(baseDate.getUTCHours() + 9);

  const minDate = document.createAttribute("data-min-date");
  minDate.value = getDateString(minTime);
  date.attributes.setNamedItem(minDate);

  // 현재 날짜 이후로 선택 불가
  const maxDate = document.createAttribute("data-max-date");
  maxDate.value = getDateString(maxTime);
  date.attributes.setNamedItem(maxDate);

  // 기본 값을 오늘 날짜로
  const currentDate = document.createAttribute("value");
  currentDate.value = getDateString(defaultTime);
  date.attributes.setNamedItem(currentDate);

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
