//selection 3개 가져오기
const SelectionItemDivs = document.getElementsByClassName("selection-item");
// console.log(SelectionItemDivs);

//각 페이지 요소 가져오자
const calendarDiv = document.getElementById("calendar");
const selectionWashingmachineTimeDiv = document.getElementById("selection-washingmachine-time");
const selectionRoomNameDiv= document.querySelector("#selection-room-name");
const boardDiv= document.querySelector("#board");

// calendarDiv.style.display = "block";
// selectionWashingmachineTimeDiv.style.display="block";
// selectionRoomNameDiv.style.display ="block";
//const boardDiv.style.display = "block";

let allData; // 모든 초기화 정보: 세탁기, 시간, 호실 정보
let weeklyReservations; //미리 요일별로 지정된 예약 정보
let newReservation; //사용자가 입력하고 있는 예약 정보
let reservation; //사용자가 예약 완료한 정보들

const initData = async () => {
    //allData 가져오자
    const getAllData = async (url) => {
        return fetch(url)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error.message))
    }

    //weeklyReservation 가져오자
    const getWeeklyReservation = async (url) => {
        try{
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch(error){
            console.error(error.message);
        } 
    }

    allData = await getAllData("js/allData.json");

    weeklyReservations = await getWeeklyReservation("js/weekly-reservation.json");

}
const pageDivs = [calendarDiv, selectionWashingmachineTimeDiv, selectionRoomNameDiv, boardDiv];
const setPage = (page) => {

    //clear select

    for(const SelectionItemDiv of SelectionItemDivs){
        SelectionItemDiv.classList.remove("select");
    }
 
    //select selection
    if(SelectionItemDivs.length >= page){ //4페이지 selection은 없음.
        SelectionItemDivs[page-1].classList.add("select");
    }

    //clear pages
    pageDivs.forEach(pageDiv => {
        pageDiv.style.display = "none"; //모든 페이지 안 보이게
    });
    //show page
    pageDivs[page-1].style.display = "block";  //1페이지: calendar, 2페이지: swt, 3페이지: srn, 4페이지: board
}
initData();
setPage(1);