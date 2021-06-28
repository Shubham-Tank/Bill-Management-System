let srNo = 0
function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

function addToBill(id, pname, price) {

    const newele = document.querySelector('.prod-id-' + id)

    if (newele) {
        document.querySelector('.prod-id-' + id + ' .quantity').value++
    }
    else {
        srNo++

        const tableBody = document.querySelector('.table-body')
        const tr = document.createElement('tr')
        const th = document.createElement('th')

        tr.className = 'tbl-rows prod-id-' + id
        th.setAttribute('scope', 'rows')
        th.innerText = srNo
        tr.append(th)

        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        const td3 = document.createElement('td')

        td1.className = "products"
        td2.className = "prices"

        td1.innerText = pname
        td2.innerText = Number(price).toFixed(2)
        td3.innerHTML = `<input class ='quantity' type='number' value='1' style='width:50px' onchange='updateTotal()' > 
    <button type='button' class='btn btn-danger btn-sm' style='margin-left:50px;margin-top:-3px;padding-top:0' onclick='rmEle("${id}");'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
    class="bi bi-trash-fill" viewBox="0 0 16 16">
    <path
        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
</svg></button>`

        tr.append(td1)
        tr.append(td2)
        tr.append(td3)

        tableBody.append(tr)
    }
}

function addToTotal(price) {
    const TOTAL = document.querySelector('.total')
    TOTAL.innerHTML = (Number(TOTAL.innerHTML) + Number(price)).toFixed(2)
}

function updateTotal() {
    const prices = document.querySelectorAll('.prices')
    const quantities = document.querySelectorAll('.quantity')
    let total = 0
    for (let i = 0; i < prices.length; i++) {
        total += prices[i].innerText * quantities[i].value
    }
    document.querySelector('.total').innerHTML = total.toFixed(2)

}

function rmEle(id) {
    const rmele = document.querySelector('.prod-id-' + id)
    rmele.remove()
    const sr = document.querySelectorAll('.table-body tr th')
    sr.forEach((element, index) => {
        element.innerHTML = index + 1
    })
    srNo--
    updateTotal()
}

function search() {
    const searchBox = document.querySelector('.search-overlay')
    const hidecards = document.querySelectorAll('.prod>:not([id^="' + searchBox.value + '"])')
    const showcards = document.querySelectorAll('.prod>[id^="' + searchBox.value + '"]')

    if (searchBox.value === '') {
        document.querySelectorAll('.card').forEach((element) => {
            element.style.display = 'block'
        })
    }
    else {
        hidecards.forEach((element) => {
            element.style.display = 'none'
        })

        showcards.forEach((element) => {
            element.style.display = 'block'
        })
    }

}

function generateBill() {

    const customer_name = document.querySelector('#cname').value
    const mobile_no = document.querySelector('#mobno').value
    const Total = Number(document.querySelector('.total').innerText)

    if (customer_name && mobile_no.length == 10 && Total) {

        let srNos = document.querySelectorAll('.tbl-rows th')
        let products = document.querySelectorAll('.tbl-rows .products')
        let prices = document.querySelectorAll('.tbl-rows .prices')
        let quantities = document.querySelectorAll('.tbl-rows .quantity')

        let productArr = []

        for (let i = 0; i < srNos.length; i++) {
            productArr.push({
                srNo: Number(srNos[i].innerText),
                pname: products[i].innerText,
                price: Number(prices[i].innerText),
                qty: Number(quantities[i].value)
            })
        }
        let bill = {
            customer_name,
            mobile_no,
            products: productArr,
            total: Total
        }

        postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bill)
        }
        try {
            fetch('/createCustomerBill', postData)
            location.replace("/customerBill/" + customer_name)
        }
        catch (err) {
            console.log(err)
        }
    }
}
