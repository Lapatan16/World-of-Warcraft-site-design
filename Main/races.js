let races = [];
let classes = [];
let race = document.getElementById('race');
let clas = document.getElementById('class');
let raceDesc = document.getElementById('descRace');
let classDesc = document.getElementById('descClass');
let all = document.getElementById('raceAndClass');
let desc = document.getElementById('desc');

function loadXML()
{
    console.log(all);
    // all.hidden = true;
    raceDesc.hidden = true;
    classDesc.hidden = true;
    race.hidden = true;
    clas.hidden = true;
    desc.hidden = true;
    let xhr = new XMLHttpRequest();
    xhr.onload = function()
    {
        if(this.status != 200 && this.status != 304)    return;
        let xmlDoc = xhr.responseXML.getElementsByTagName('race');
        
        for (const it of xmlDoc) 
        {
            let obj = 
            {
                fact : it.getElementsByTagName('faction')[0].textContent,
                name : it.getElementsByTagName('racename')[0].textContent,
                desc : it.getElementsByTagName('descrtiption')[0].textContent,
                classes : [],
                img : it.getElementsByTagName('image')[0].textContent,
                sel : false,
            }; 
            for (const it2 of it.getElementsByTagName('class')) 
            {
                obj.classes.push(it2.textContent);
            }
            races.push(obj);
        }
        loadXML2();
    }
    xhr.open('GET', 'races.xml', true);
    xhr.send();
}

function loadXML2()
{
    let xhr = new XMLHttpRequest();
    xhr.onload = function()
    {
        if(this.status != 200 && this.status != 304)    return;
        let xmlDoc = xhr.responseXML.getElementsByTagName('class');
        
        for (const it of xmlDoc) 
        {
            let obj = 
            {
                name : it.getElementsByTagName('name')[0].textContent,
                desc : it.getElementsByTagName('descrtiption')[0].textContent,
                img : it.getElementsByTagName('image')[0].textContent,
                sel : false,
            }; 
            classes.push(obj);
        }
    }
    xhr.open('GET', 'classes.xml', true);
    xhr.send();
}

function updateRaces(s)
{
    raceDesc.hidden = false;
    classDesc.hidden = false;
    race.hidden = false;
    clas.hidden = false;
    desc.hidden = false;
    unsel();
    updateRace(s, true);
}

function updateRace(s, first)
{
    race.innerHTML = '';
    clas.innerHTML = '';
    raceDesc.innerHTML = '';
    classDesc.innerHTML = '';
    let table = document.createElement('table');
    let br = 0;
    for (const it of races) 
    {
        if(it.fact != s)    continue;
        if(first && br++ == 0)
        {
            it.sel = true;
            updateClass(it, true);
            updateRaceDesc(it);
        }
        let row = document.createElement('tr');
        row.innerHTML =
        `
            <td>${it.name}</td>
            <td><img src="${it.img}"></td>
        `
        if(it.sel)
            row.className = 'selected';
        row.onclick = function()
        {
            unsel();
            it.sel = true;
            updateRace(s, false);
            updateClass(it, true);
            updateRaceDesc(it);
        }
        table.appendChild(row);
    }
    race.appendChild(table);
}

function updateRaceDesc(it)
{
    raceDesc.innerHTML = 
    `
        <h2>${it.name}</h2>
        <p><img src="${it.img}">${it.desc}</p>
    `
}

function updateClass(rasa, first)
{
    clas.innerHTML = '';
    classDesc.innerHTML = '';
    let table = document.createElement('table');
    let br = 0;
    for (const it of rasa.classes) 
    {
        for (const it2 of classes) 
        {
            if(it == it2.name)
            {
                if(first && br++ == 0)
                {
                    it2.sel = true;
                    updateClassDesc(it2);
                }
                let row = document.createElement('tr');
                row.innerHTML = 
                `
                    <td>${it2.name}</td>
                    <td><img src="${it2.img}"></td>
                `
                if(it2.sel)
                    row.className = 'selected';
                row.onclick = function()
                {
                    unsel();
                    it2.sel = true;
                    updateClass(rasa, false);
                    updateClassDesc(it2);
                }
                table.appendChild(row);
            }    
        }
    }
    clas.appendChild(table);
}

function updateClassDesc(it)
{
    classDesc.innerHTML = 
    `
        <h2>${it.name}</h2>
        <p><img src="${it.img}">${it.desc}</p>
    `
}

function unsel()
{
    for (const it of races)
        it.sel = false;    
    for (const it of classes) 
        it.sel = false;
}