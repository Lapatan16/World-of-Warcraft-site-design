let left = document.getElementById('left');
let cart = document.getElementById('cart');
let books = [];
let price = document.getElementById('price');
let search = document.getElementById('search');
let newer = document.getElementById('newer');
let older = document.getElementById('older');
let inpYear = document.getElementById('inp-year');
let selAut = document.getElementById('aut');
let inpPrice = document.getElementById('inp-price');
let ime = document.getElementById('name');
let lastname = document.getElementById('lastname');
let email = document.getElementById('email');
let add = document.getElementById('adr');
let contact = document.getElementById('contact');
let cartDiv = document.getElementById('cartDiv');

function loadXML()
{
    let xhr = new XMLHttpRequest();

    xhr.onload = function()
    {
        if(this.status != 200 && this.status != 304)    return;

        let xmlDoc = xhr.responseXML.getElementsByTagName('book');
        let aut = [];
        for (const it of xmlDoc) 
        {
            let obj = 
            {
                title : it.getElementsByTagName('title')[0].textContent,
                price : it.getElementsByTagName('price')[0].textContent,
                img : it.getElementsByTagName('image')[0].textContent,
                year : it.getElementsByTagName('year')[0].textContent,
                aut : [],
                inCart : false,
            };
            for (const it2 of it.getElementsByTagName('author')) 
            {
                if(aut.indexOf(it2.textContent) == -1)
                    aut.push(it2.textContent);
                obj.aut.push(it2.textContent);    
            }
            books.push(obj);
        }
        cartDiv.hidden = true;
        addAuthors(aut);
        updateBooks();
    }

    xhr.open('GET', 'books.xml', true);
    xhr.send();
}

function updateBooks()
{
    left.innerHTML = '';
    for (const it of books) 
    {
        if(!filters(it))    continue;
        let div = document.createElement('div');
        div.className = 'book';
        div.innerHTML +=
        `
            <h2>${it.title}</h2>
            <img src="${it.img}">
            <p>${it.price}</p>
        `    
        let cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = it.inCart;
        cb.onchange = function()
        {
            it.inCart = cb.checked;
            updateCart();
        }
        div.onclick = function()
        {
            it.inCart = !it.inCart
            updateBooks();
            updateCart();
        }
        div.appendChild(cb);
        left.appendChild(div);
    }
}

function updateCart()
{
    let cena = 0;
    cart.innerHTML = '';
    price.innerHTML = '';
    for (const it of books) 
    {
        if(!it.inCart)  continue;
        let pom = it.price.split('$');
        cena += +pom[1];
        cart.innerHTML +=
        `
            <li>${it.title}-${it.price}</li>
        `
    }
    if(cena != 0)
    {
        price.innerHTML = 'Total: $' + cena.toFixed(2);
        cartDiv.hidden = false;
    }
    else
        cartDiv.hidden = true;
}

function addAuthors(aut)
{
    for (const it of aut) 
    {
        selAut.innerHTML +=
        `
            <option value="${it}">${it}</option>
        `
    }
}

function filters(book)
{
    let reg = new RegExp(search.value, 'i');
    let boolSearch = search.value == '' || reg.test(book.title);
    let boolYear = inpYear.value == '' || (newer.checked && +book.year >= +inpYear.value) || (older.checked && +book.year <= +inpYear.value);
    let boolPrice = inpPrice.value == '' || +((book.price.split('$'))[1]) >= inpPrice.value;
    let boolAut = selAut.value == 'all';
    if(!boolAut)
    {
        for (const it of book.aut) 
        {
            if(selAut.value == it)
                boolAut = true;    
        }
    }

    return boolSearch && boolYear && boolAut && boolPrice;
}

let regName = /^[A-Z][a-z]{0,15}$/
let regLastname = /^[A-Z][a-z]{0,25}$/
let regEmail = /^[a-zA-Z0-9\.-\?!~]{1,40}@[a-z]{2,8}(\.[a-z]{2,6}){1,3}$/
let regAdd = /^[A-Z][a-zA-Z ]{1,30}[0-9]{1,3}$/
let regContact = /^\+[0-9]{3} [0-9]{2} [0-9]{7}$/ 

function info()
{
    let br = 0;
    if(ime.value != '')
    {
        if(regName.test(ime.value))
        {
            ime.className = 'tacno';
            br++;
        }
        else
            ime.className = 'netacno';
    }

    if(lastname.value != '')
    {
        if(regLastname.test(lastname.value))
        {
            lastname.className = 'tacno';
            br++;
        }
        else
            lastname.className = 'netacno';
    }
    
    if(email.value != '')
    {
        if(regEmail.test(email.value))
        {
            email.className = 'tacno';
            br++;
        }
        else
            email.className = 'netacno';
    }

    if(add.value != '')
    {
        if(regAdd.test(add.value))
        {
            add.className = 'tacno';
            br++;
        }
        else
            add.className = 'netacno';
    }

    if(contact.value != '')
    {
        if(regContact.test(contact.value))
        {
            contact.className = 'tacno';
            br++;
        }
        else
            contact.className = 'netacno';
    }

    if(br == 5)
    {
        for (const it of books) 
        {
            it.inCart = false;    
        }
        updateBooks();
        updateCart();
    }
}
