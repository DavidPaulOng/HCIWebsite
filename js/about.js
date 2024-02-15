var isNavOpen = true;
var originalbuttonmargin = 0;

function padorupadoru(){
  alert('PADORU PADORU');
}

function navtoggle() {
  var navside = document.getElementById("navside");
  var main = document.getElementById("main");
  var buttontoggle = document.getElementById("navtogglebutton");
  buttontoggle.style.transform = "rotate(" + 180 * isNavOpen+ "deg)";
  


  if (isNavOpen) {
    // If navigation is open, close it
    navside.style.width = "0px";
    buttontoggle.style.marginLeft = originalbuttonmargin;
    // document.body.style.backgroundColor = "white";
    main.style.marginLeft = "0";
  } else {
    // If navigation is closed, open it
    originalbuttonmargin = buttontoggle.style.marginLeft;
    navside.style.width = "140px";
    buttontoggle.style.marginLeft = "105px";
    // document.body.style.backgroundColor = "rgba(0,0,0,0.2)";
    main.style.marginLeft = "140px";

  }
  // Toggle the boolean value
  isNavOpen = !isNavOpen;

}