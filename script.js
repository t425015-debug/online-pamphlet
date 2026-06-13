let images = [];

let currentPage = 0;

const pamphletImage =
document.getElementById(
    "pamphletImage"
);

const nextButton =
document.getElementById(
    "nextButton"
);

const prevButton =
document.getElementById(
    "prevButton"
);

const pageTitle =
document.getElementById(
    "pageTitle"
);

const pageNumber =
document.getElementById(
    "pageNumber"
);

function UpdatePage()
{
    pamphletImage.style.opacity = 0;
    setTimeout(function()
    {

    pamphletImage.src =
    images[currentPage].image;

    pageTitle.textContent =
    images[currentPage].title;

    pageNumber.textContent =
    (currentPage + 1) + " / " +
    images.length;

prevButton.disabled =
    currentPage === 0;

    nextButton.disabled =
    currentPage === images.length - 1;

    pamphletImage.style.opacity = 1;
    }, 300);
}

fetch("pages.json")
.then(response => response.json())
.then(data =>
{
    images = data;
    UpdatePage();
});

nextButton.onclick =
function ()
{
    currentPage++;

    if(currentPage >=
       images.length)
    {
        currentPage =
        images.length - 1;
    }

    UpdatePage();
};

prevButton.onclick =
function ()
{
    currentPage--;

    if(currentPage < 0)
    {
        currentPage = 0;
    }

    UpdatePage();
};

let startX = 0;

pamphletImage.addEventListener(
    "touchstart",
    function (event)
{
    startX = event.touches[0].clientX;
},
    {passive: true}
);

pamphletImage.addEventListener(
    "touchend",
    function (event)
{
   let endX = event.changedTouches[0].clientX;
   let moveX = endX - startX;
   if(Math.abs(moveX) < 80){
         return;
    }
    if (moveX < 0)
    {
        nextButton.click();
    }
    else 
    {
        prevButton.click();
    }
},
    {passive: true}
);