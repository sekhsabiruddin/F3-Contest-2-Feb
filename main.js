let pcontainer = document.getElementById("product-container");

function getMenu() {
  fetch("https://free-food-menus-api-production.up.railway.app/burgers")
    .then((response) => response.json())
    .then((data) => {
      //   console.log("DATA", data);
      let items = data.map((value) => {
        return `
        <div class="box" id="${value.id}">
        <div class="img-box">
            <img src="${value.img}" alt="">
            </div>
            <div class="product-details">
                <h2>${value.name}</h2>
                <div class="icon">
                
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
            </div>
            <h2 class="price">$ ${value.price}</h2>
        </div>
          `;
      });
      pcontainer.innerHTML = items.join("");
      //   console.log(items);
    })
    .catch((error) => {
      alert("Failed" + error);
    });
}
getMenu();
//============================== takeOrder() funtion start here=====================>
//let vl = document.querySelector(".box");
let obj = {};
function takeOrder() {
  const pr = new Promise(function (reslove) {
    setTimeout(() => {
      const spanList = document.getElementsByClassName("box");
      let len = spanList.length;
      let x = 0;
      for (let i = 0; i < 3; i++) {
        len = Math.floor(Math.random() * len);
        //   console.log(document.getElementsByClassName("box")[len]);
        //   document.getElementsByClassName("box")[len].style.cssText = "opacity:0.1";
        let val = document.getElementsByClassName("box")[len];
        val.style.cssText = "opacity:0.1";
        obj[x] = val.id;
        x++;
      }
      reslove(obj);
    }, 2500);
  });
  console.log(obj);
  return pr;
}
//============================== takeOrder() funtion end here

//============================== orderPrep() funtion start here=====================>
function orderPrep(orderStatus) {
  let paymentProceeding = document.getElementsByClassName("wrapper");
  paymentProceeding[0].style.cssText = "visibility: visible;";
  const pr = new Promise(function (reslove) {
    setTimeout(() => {
      orderStatus["order_statu"] = true;
      orderStatus["paid"] = false;
      reslove();
      paymentProceeding[0].style.cssText = "visibility: hidden;";
    }, 1500);
  });
  console.log(orderStatus);
  return pr;
}
//============================== orderPrep() funtion End here=====================>

//==============================  payOrder() funtion start here=====================>
function payOrder() {
  const pr = new Promise(function (reslove) {
    setTimeout(() => {
      orderStatus["order_statu"] = true;
      orderStatus["paid"] = true;
      reslove(orderStatus);
    }, 1500);
  });
  console.log(orderStatus);
  return pr;
}
//==============================  payOrder() funtion End here=====================>
let orderStatus = {};
takeOrder()
  .then(function () {
    return swal("Burger ", "Selected 3 random burger", "success", {
      button: "OK",
    });
  })
  .then(function () {
    return orderPrep(orderStatus);
  })
  .then(function () {
    return payOrder();
  })
  .then(function (obj) {
    if (obj.paid) {
      alert("Thank you ,Payment is successfull");
    }
  });
