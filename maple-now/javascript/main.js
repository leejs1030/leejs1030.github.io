const base = "https://ljs1030.github.io/maplenow-logs-html";
const regex = /.*\/[1-6]/;
const selection = document.getElementById("select-page");
const pos = $("#html-position");
const dateInput = $("#date input");
const minTime = 1652530199000; //서비스 시작 시점! 수정 필요.

bootstrap(new Date(minTime + 9 * 60 * 60 * 1000));

const mergeCell = (column = 0) => {
  const tables = document.querySelectorAll('table');

  tables.forEach((table) => {
    let headerCell = null;
    let headerLength = null;
    [...table.rows].forEach((row) => {
      const firstCell = row.cells[headerLength ? column - headerLength + row.cells.length : column];
      if (headerCell === null || firstCell.innerText !== headerCell.innerText) {
        headerCell = firstCell;
        headerLength = headerLength ? headerLength : row.cells.length;
      } else {
        headerCell.rowSpan++;
        firstCell.remove();
      }
    })
  });
};

const mergeRequiredIndex = {
  'cube/2': [0, 1],
  'cube/4': [0, 1],
};

const getMergeRequired = (page) => mergeRequiredIndex[page] ? mergeRequiredIndex[page] : [0];

const loadHtml = ({year, month, day, hour, page}) => {
  try {
    pos.load(
      `${base}/${year}/${month}/${day}/${hour}/${page}.html #body-div`,
      (r, s) => {
        if (s === "error") return alert('알 수 없는 이유로 로그를 가져올 수 없습니다...\n' +
        '서버의 사정으로 로그가 찍히지 않았을 가능성이 높습니다.\n' +
        '혹은 사용자의 네트워크의 사정 상 실패하였을 수 있습니다.');
        const mergeRequired = getMergeRequired(page);
        mergeRequired.forEach(mergeCell);
      }
    );
  } catch (err) {
    alert(
      "내부 오류입니다. 다음에 뜨는 안내 창을 최대한 자세히 찍거나 복사하여 문의해 주세요."
    );
    alert(JSON.stringify(err, Object.getOwnPropertyNames(err)));
  }
};

const validateDate = ({year, month, day, hour}) => {
  const now = new Date();
  const selected = new Date(`${year}-${month}-${day}T${hour}:10:00`).getTime(); // utc 0 시간
  const maxTime = now.getTime(); // utc 0 시간
  const beforeYear = (() => {
    const x = new Date(now);
    x.setUTCFullYear(now.getUTCFullYear() - 1);
    return x.getTime();
  })();
  if (selected >= maxTime) {
    alert("아직 로그가 작성되지 않은 시점입니다!");
    return false;
  } else if (selected <= minTime) {
    alert("로깅 서비스 시작 전으로, 조회할 수 없는 데이터입니다!");
    return false;
  } else if (selected <= beforeYear) {
    alert("로그의 최대 보관 기한은 1년입니다!");
    return false;
  }
  return true;
};

selection.addEventListener("click", (e) => {
  const page = e.target.id;
  const [year, month, day] = dateInput.val().split("/");
  const hour = $("#time > select").val();
  if (regex.test(page) && validateDate({year, month, day, hour})) {
    loadHtml({year, month, day, hour, page});
  }
});
