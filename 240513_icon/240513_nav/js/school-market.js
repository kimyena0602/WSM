const setData = (data) => {
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

const getData = () => {
    const filename = 'js/data.json';

    fetch(filename) // 백엔드 API가 있을 때는 여기에 API 주소를 입력합니다.
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error));
}

getData(); // 호출 오타 수정 완료