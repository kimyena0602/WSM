// 반응형 웹의 JavaScript에서 하는 일
//1. HTML 요소 -> js 뱐수로 가져온다.
//2. 이벤트 처리한다.(click, focus, mouseup)
//3. class를 수정하여 style을 적용한다.

//HTML .nav-toggle -> js변수     navToggleDiv
//HTML .nav-list -> js변수       navListUl
//HTML .nav-toggle > i -> js변수 toggleI

//navToggleDiv 클릭 이벤트 처리

// navListUl을 보이자.  show-menu 클래스 추가하자 / 제거하자
//tohhleI bi-list <-> bi-x-lg

function toggleMenu(){
const navToggleDiv = document.getElementsByClassName("nav-toggle")[0];
//const navToggleDiv = document.getElementById("nav-toggle"); 
const navListUl = document.getElementsByClassName("nav-list")[0];
const toggleI = navToggleDiv.getElementsByTagName("i")[0];

navToggleDiv.onclick = (event) => {
    navListUl.classList.toggle("show-menu");
    // navListUl.classList.add("show-menu");
    // navListUl.classList.remove("show-menu");

    toggleI.classList.toggle("bi-lsit");
    toggleI.classList.toggle("bi-x-lg");
    //toggleI.classList.remove("bi-lsit");
    //toggleI.classList.add("bi-x-lsit");
    //toggleI.classList.remove("bi-x-lsit");
    //toggleI.classList.add("bi-lsit");
    }
}
toggleMenu();
// function 함수명(파라미터1, 파라미터2){
//     명령어 1;
//     return 리턴값;
// }
// 함수명(아규먼트1, 아규먼트2);



// function 함수명(파라미터1, 파라미터2){
//     명령어 1;
//     return 리턴값;
// }



// (파라미터1, 파라미터2) => {
//     명령어1;
//     return 리턴값;
// }



// (파라미터1, 파라미터2) => 리턴값;