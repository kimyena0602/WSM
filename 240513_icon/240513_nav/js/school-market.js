//data.json -> js -> HTML

const setData = (data) => {
    let productContainerString = "";
    //data 하나씩 꺼내서
    data.froEach(element => {
        //article 만들어
    let articleString = `<article class="product-item">
        <img src="images/${element.image}" alt="">
            <div class="name">${element.name}</div>
    </article>\n`;
    productContainerString += articleString;
     });
    //.product-container 추가
    const productContainerDiv = document.getElementsByClassName("product-containe")[0];
    productContainerDiv.innerHTML = productContainerString;
}
const getData = () => {
    const filename = 'js/data.json';
    fetch(filename) //백엔드 있을 때 여기에 백엔드 API URL이 들어감.
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error));
}
getData();