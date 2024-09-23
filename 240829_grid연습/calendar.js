//이전, 다음 버튼 클릭하면 이전/다음 달로 변경
//현재 날짜 구하자
currentDate = new Date();
console.log(currentDate);

//월 구하자
const month = currentDate.getMonth(); //1월: 0월
console.log(year, month);
//제목 표시하자
//HTML -> JS 변수 가져오자 (calendar-header h1)
const calendarHeader = document.getElementById("calendar-header");
 const calendarHeaderH1 = calendarHeader.getElementsByTagName("h1")[0];// 시험
 //const calendarHeaderH1 = document.querySelector("#calendar-hearder h1"); // 시험

//JS 변수에 innerHTML = `${year}년 ${month + 1}월`
calendarHeaderH1.innerHTML = `<i>${year}년 ${month + 1}월</i>`


console.log
console.log(`${year}년 ${month + 1}월`);