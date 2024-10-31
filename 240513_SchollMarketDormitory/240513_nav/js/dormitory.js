//selection 3개 가져오기
const SelectionItemDivs = document.getElementsByClassName("selection-item");
console.log(SelectionItemDivs);

//각 페이지 요소 가져오자
const calendarDiv = document.getElementById("calendar");
const selectionWashingmachineTimeDiv = document.getElementById("selection-washingmachine-time");
const selectionRoomNameDiv= document.querySelector("#selection-room-name");
const boardDiv= document.querySelector("#board");

// calendarDiv.style.display = "block";
// selectionWashingmachineTimeDiv.style.display="block";
// selectionRoomNameDiv.style.display ="block";
//const boardDiv.style.display = "block";

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
setPage(2);