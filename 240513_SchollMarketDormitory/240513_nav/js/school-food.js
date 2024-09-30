const API_KEY = "2bc491a2c55545ccbe39dfb79bcce0d1"; //학교급식 API
const URL = "https://open.neis.go.kr/hub/mealServiceDietInfo";  //학교급식 API URL
const ATPT_OFCDC_SC_CODE = "B10";  //서울특별시교육청
const SD_SCHUL_CODE = "7011569"    //미림마이스터고등학교

let currentDate = new Date();

//급식 정보 제목 표시
const displayDate = () => {
    let days = "일월화수목금토";
    let maonth = currentDate.getMonth() + 1;    //현재 달 불러오기기
    let date = currentDate.getDate();  //현재 날짜 불러오기
    let day = currentDate.getDay();    //요일 (0: 일 1: 월)
    days = days.split("");  // days 내용을 쪼개줌

    const schoolFoodTitleHeader = document.getElementsByClassName("school-food-title")[0];
    const titleText = `🍚 ${days[day]}요일(${maonth}/${date})의 메뉴 🍚`
    schoolFoodTitleHeader.innerText = titleText;
}

//급식 정보 날짜
const changeDate = (diff) => {
    currentDate.setDate(currentDate.getDate() + diff);

    //이전 날짜 버튼으로 왔을 때, 월 -> 일X -> 토x -> 금
    if (currentDate.getDay() === 0) {   //일요일X -> 금요일
        currentDate.setDate(currentDate.getDate() -2);
    }; if (currentDate.getDay() === 6) {  //토요일X -> 월요일
        currentDate.setDate(currentDate.getDate() +2);
    };
    
    displayDate();  //화면에 변경된 날짜를 표시

    const dateData = currentDate.toISOString().slice(0, 10).replace(/-/g, "");  //2024-05-23 -> 20240523
    getSchoolFoodMenu(dateData);
}

//급식 API 이용해서 급식 정보
const getSchoolFoodMenu = (dateData) => {
    let url = `${URL}?Type=json&KEY=${API_KEY}&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&MLSV_YMD=${dateData}`;

    //비동기로 url 호출
    //erro 없다면 then 함수 호출되고, reponse,json()으로 실제 데이터만 가져옴
    //error 있다면 catch 함수 호출되고, 에러 출력
    fetch(url)
        .then((response) => response.json())
        .then((data) => setSchoolFoodMenu(data))
        .catch((error) => console.error.error(error));
}

//받아온 급식 정보 표시 
const setSchoolFoodMenu = (data) => {
    //breakfastMenuUl 가져오기 HTML -> js
    //lunchMenuUl 가져오기
    //dinnerMenuUl 가져오기
    const breakfastMenuUl = document.getElementsByClassName("menu breakfast")[0];
    const lunchfastMenuUl = document.getElementsByClassName("menu lunch")[0];
    const dinnerMenuUl = document.getElementsByClassName("menu dinner")[0];
    breakfastMenuUl.innerHTML = "<li>급식 메뉴를 불러오지 못 했습니다.</li>"
    lunchfastMenuUl.innerHTML = "<li>급식 메뉴를 불러오지 못 했습니다.</li>"
    dinnerMenuUl.innerHTML = "<li>급식 메뉴를 불러오지 못 했습니다.</li>"

    //data 메뉴 가져오기
    console.log(data);
    console.log(data["mealServiceDietInfo"]);
    if (data["mealServiceDietInfo"] == undefined) return;   //급식이 없거니 데이터 잘못 가져오면, 에러 출력X, return
    const menuData = data["mealServiceDietInfo"][1]["row"];

    //필요없는 요소 지우기
    menuData.forEach((menuRow) => {
        //(...) 없애기 
        let cleanedMenu = menuRow.DDISH_NM;
        cleanedMenu = cleanedMenu.replace(/\([^\)]*\)/g, "");  //소괄호 연문자로 시작~소괄호 닫는문자를 제외한 문자들 0~n개, 소괄호 닫는문자

        //'.' 없애기 
        cleanedMenu = cleanedMenu.replace(/\./g, ""); // .(점) 문자 찾아서 "" 대체

        //'*' 없애기
        cleanedMenu = cleanedMenu.replace(/\*/g, ""); // *(별) 문자 찾아서 "" 대체

        // <br>태그로 나누기
        let cleanedMenuArray = cleanedMenu.split("<br/>");
        console.log(cleanedMenuArray);

        //빈칸 없애기
        cleanedMenuArray = cleanedMenuArray.map((item) => item.trim());

        let menuFoodLis = "";
        cleanedMenuArray.forEach((menuFood) => {
            //<li class=menu-food"> 가져온 메뉴 하나씩 </li>
            menuFoodLis += `<li class="menu-food">${menuFood}</li>\n`;
        });

        //js -> html
        if (menuRow["MMEAL_SC_NM"] === "조식") {
            //조식의 경우, breakfastMenuUl에 넣기
            breakfastMenuUl.innerHTML = menuFoodLis;
        } else if (menuRow["MMEAL_SC_NM"] === "중식") {
            //중식의 경우, lunchMenuUl에 넣기
            lunchfastMenuUl.innerHTML = menuFoodLis;
        } else if (menuRow["MMEAL_SC_NM"] === "석식") {
            //석식의 경우, dinnerMenuUl에 넣기 js -> HTML
            dinnerMenuUl.innerHTML = menuFoodLis;
        }
    });

    // console.log("setSchoolFoodMenu", data);
    // console.log(data["mealServiceDietInfo"][1]["row"][1]["DDISH_NM"]);
}

changeDate(0);