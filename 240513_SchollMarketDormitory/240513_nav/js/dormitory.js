//selection 3개 가져오기
const SelectionItemDivs = document.getElementsByClassName("selection-item");
// console.log(SelectionItemDivs);
//각 페이지 요소 가져오자
const calendarDiv = document.getElementById("calendar");
const selectionWashingmachineTimeDiv = document.getElementById("selection-washingmachine-time");
const selectionRoomNameDiv = document.querySelector("#selection-room-name");
const boardDiv = document.querySelector("#board");
const washingmachineSelect = document.getElementById("washingmachine");
const timeSelect = document.querySelector("#time");

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
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error.message);
        }
    }

    allData = await getAllData("js/allData.json");

    weeklyReservations = await getWeeklyReservation("js/weekly-reservation.json");

}
const pageDivs = [calendarDiv, selectionWashingmachineTimeDiv, selectionRoomNameDiv, boardDiv];
const setPage = (page) => {

    //clear select

    for (const SelectionItemDiv of SelectionItemDivs) {
        SelectionItemDiv.classList.remove("select");
    }

    //select selection
    if (SelectionItemDivs.length >= page) { //4페이지 selection은 없음.
        SelectionItemDivs[page - 1].classList.add("select");
    }

    //clear pages
    pageDivs.forEach(pageDiv => {
        pageDiv.style.display = "none"; //모든 페이지 안 보이게
    });
    //show page
    pageDivs[page - 1].style.display = "block";  //1페이지: calendar, 2페이지: swt, 3페이지: srn, 4페이지: board

    //2page
    if (page === 2) {    //세탁기, 시간
        initWashingmachineTime();
    } else if (page === 3) { // 호실, 이름

    } else if (page === 4) {  //세탁기 예약 현황표

    }
}
const clickDate = (event) => {
    console.log(event.target.dataset.data); //<div class = "item" data-date = "무언가"> 텍스트 </div> => 무언가
    newReservation = {  //날짜, 세탁기, 시간, 호실, 이름, 알림
        "date": undefined,
        "washingmachine": undefined,
        "time": undefined,
        "room": undefined,
        "name": undefined,
        "notification": true,
    }
    newReservation.date = event.target.dataset.date; //클릭한 날짜 정보 새 예약에 기록하자
    setPage(2); // 2페이지로 이동
}
initData();
setPage(1);

const initWashingmachineTime = () => {
    //1,2,3번 세탁기, 1,2,3 시간 초기화
    //{"1": ["1","2","3"],"2": ["1","2","3"],"3": ["1","2","3"]};
    let allWashingmachineTime = {};

    //초기 세팅하자
    allData.washingmachine.forEach((washingmachine) => { //1,2,3
        allWashingmachineTime[washingmachine] = Object.keys(allData.time);
    });
    console.log(allWashingmachineTime);
    // 클릭한 날짜의 요일 구하자
    // 미리 예약된 예약을 보고 예약된 세탁기와 예약된 시간이 있으면 초기화 항목에서 빼자
    // 사용자가 예약한 예야을 보고, 예약된 세탁기와 예약된 시간이 있으면 초기회 항목에서 빼자
    // 초기화 항목에서 예약된 시간 뺀 후 모든 시간이 없는 세탁기는 빼자
    //세탁기 select에 option 만들어 넣자
    washingmachineSelect.innerHTML = "";
    let washingmachines = Object.keys(allWashingmachineTime); //["1","2","3"]
    washingmachines.forEach((washingmachine) => {
        let newOption = document.createElement("option"); //<option></option>
        newOption.value = washingmachine; //<option value = "세탁기 번호"></option>
        newOption.textContent = `${washingmachine}번 세탁기`; //<option value = "세탁기 번호">세탁기 번호번 세탁기</option>
        washingmachineSelect.appendChild(newOption); //washingmachineSelect에 자식으로 넣자
    });
    //시간 select에 option 만들어 넣자
    const setTimeSelect = (event) => {
        timeSelect.innerHTML = "";
        const selectedWashingmachine = washingmachineSelect.value;
        let times = allWashingmachineTime[selectedWashingmachine]; //["1", "2", "3"]
        times.forEach((time) => {
            let newOption = document.createElement("option"); ////<option></option>
            newOption.value = time; // <option value = "시간값("1", "2", "3" 중 하나)"> </option>
            newOption.textContent = allData["time"][time]; //<option value = "시간값("1", "2", "3" 중 하나)"> 7시 ~ 8시 10분 => ... </option>
            timeSelect.appendChild(newOption);
        });

    };
    setTimeSelect();

    //세탁기 번호 바뀔 떄 setTimeSelect(); 출력
    washingmachineSelect.onchange = (event) => setTimeSelect(event);

    // [다음] 클릭 => 세탁기 번호, 시간 번호를 보관하자 => setPage(3)

}
