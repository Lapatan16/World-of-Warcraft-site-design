let more = document.getElementById('more');

function showMore()
{
    more.innerHTML = 
    `
        <div class="naslov">
        <h2>Before the sundering</h2>
        </div>
        <p>Before the War of the Ancients all these continents and islands were one single landmass known as Kalimdor, the name which would live on in the modern western continent. At the end of the war, with the implosion of the Well causing the Great Sundering, the landmass shattered into four continents while the sunken land in between became the Great Sea. </p>
        <img src="images/Ordered_Azeroth.webp" alt="">
        <div class="show">
            <button onclick="showLess()">SHOW LESS</button>
        </div>       
    `
}

function showLess()
{
    more.innerHTML = 
    `
        <div class="show">
            <button onclick="showMore()">SHOW MORE</button>
        </div>
    `
}