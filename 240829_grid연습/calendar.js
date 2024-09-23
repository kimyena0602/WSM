//이전, 다음 버튼 클릭하면 이전/다음 달로 변경
//현재 날짜 구하자
currentDate = new Date();
console.log(currentDate);
//년 구하자
const year = currentDate.getFullYear(); //1월: 0월
//월 구하자
const month = currentDate.getMonth(); //1월: 0월
console.log(year, month);
//제목 표시하자
//HTML -> JS 변수 가져오자 (calendar-header h1)
const calendarHeader = document.getElementById("calendar-header");
 const calendarHeaderH1 = calendarHeader.getElementsByTagName("h1")[0];// 시험
 //const calendarHeaderH1 = document.querySelector("#calendar-hearder h1"); // 시험



 //이전/다음 버튼 클릭했을 때 이전/다음달로 변경하자
//HTML -> JS 변수 가져오자
//click event 발생했을 때 해야할 일 정하자
const prevMonthButton = document.getElementById("prev-month");
//prevMonthButton.addEventListener("click", console.log("이전"));//리턴값이 undefined => 클릭했을 때, 가만히 있어라
prevMonthButton.addEventListener("click", () => changeMonth(-1)); //시험. (그냥 콘솔만 찍으면 안 되고 () => console.log("이전") 이렇게 함수꼴로!!)

const nextMonthButton = document.querySelector("#next-month");
nextMonthButton.onclick = () => changeMonth(1);

//-1: 이전달 / 0: 현재 달 / 1: 다음 달
const changeMonth = (diff) => {
    currentDate.setMonth(currentDate.getMonth()+diff);
    //년 구하자
    const year = currentDate.getFullYear(); //1월: 0월
    //월 구하자
    const month = currentDate.getMonth(); //1월: 0월
    //제목 바꾸자
    //console.log(`${year}년 ${month + 1}월`)//제목 표시하자
   
    //JS 변수에 innerHTML = `${year}년 ${month + 1}월`
    calendarHeaderH1.innerHTML = `<i>${year}년 ${month + 1}월</i>`;
    
}
changeMonth(0); //현재 달 출력하자