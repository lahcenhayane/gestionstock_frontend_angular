function showNot() {
  var boxNoti = document.getElementById('boxNoti');
  var boxMsg = document.getElementById('boxMessage');
  if (boxMsg.classList.contains("showNot")) {
    boxMsg.classList.remove("showNot");
  }
  boxNoti.classList.toggle("showNot");
}


function showMsg() {
  var boxNoti = document.getElementById('boxNoti');
  var boxMsg = document.getElementById('boxMessage');
  if (boxNoti.classList.contains("showNot")) {
    boxNoti.classList.remove("showNot");
  }
  boxMsg.classList.toggle("showNot");
}
