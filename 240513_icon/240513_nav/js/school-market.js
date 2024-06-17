let allData;

const showData = (data) => {
    let productContainerString = " ";
    //data 하나씩 꺼내기
    data.forEach(element => {
        //article 만들기
        let articleString = `<article class="product-item">
            <img src="images/${element.image}" alt="">
                <div class="name">${element.name}</div>
        </article>\n`;  
        productContainerString += articleString;
    });
    //.product-container 추가
    const productContainerDiv = document.getElementsByClassName("product-container")[0];
    productContainerDiv.innerHTML = productContainerString;
}
const setData = (data) => {
    allData = data; //처음 한 번 전체 data 보관하자
    showData(data);
}
const getData = () => {
    const filename = 'js/data.json';

    fetch(filename) // 백엔드 API가 있을 때는 여기에 API 주소를 입력합니다.
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error));
}



getData(); // 호출 오타 수정 완료

const searchData = (query) => {
    if (query === "") showData(allData);        //아무것도 입력하지 않으면, 전체 data를 보여주자
    //전체 data에서 하나 꺼내, name에 query가 있는지 확인하자. 
    let data = allData.filter((Onedata) => Onedata["name"].includes(query) || Onedata["category"].includes(query));
    showData(data);
}