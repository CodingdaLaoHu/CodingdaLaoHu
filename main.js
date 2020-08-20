window.onresize = function () {
  starPosition();
  init();
  viewHeight = document.body.clientHeight;
  let maxHeight = parent.scrollHeight;
  let maxPage = Math.round(maxHeight / viewHeight);
};
let resumeTitle = $("#resume");
let vueAppTitle = $("#vueapp");
let resumeDetail = $("#resume-detail");
let vueappDetail = $("#vueapp-detail");
function switchTitle() {
  resumeTitle.removeClass("menu-selected");
  vueAppTitle.removeClass("menu-selected");
  resumeDetail.removeClass("selected");
  vueappDetail.removeClass("selected");
  $(this).addClass("menu-selected");
  if (resumeTitle.hasClass("menu-selected")) {
    resumeDetail.addClass("selected");
  } else {
    vueappDetail.addClass("selected");
  }
}
resumeTitle.on("click", switchTitle);
vueAppTitle.on("click", switchTitle);

(function (doc) {
  var init = function () {
    setSize();
    bindEvent();
  };

  function bindEvent() {
    window.addEventListener("resize", setSize, false);
  }
  function setSize() {
    var cWidth = doc.documentElement.clientWidth;
    if (cWidth <= 414) {
      doc.documentElement.style.fontSize = cWidth / 37.5 + "px";
    } else {
      let fontSize = doc.documentElement.style.fontSize;
      if (fontSize != "62.5%") {
        doc.documentElement.style.fontSize = "62.5%";
      }
    }
  }
  init();
})(document);

//////////////scroll//////////////////////
let viewHeight = document.body.clientHeight;
var parent = document.getElementById("parent");
var projectDetail = document.querySelector(".project-detail");

function stopProp(e) {
  e = e || window.event;
  if (projectDetail.scrollTop != 0) {
    if (e.stopPropagation) {
      e.stopPropagation();
      ableScroll = true;
    } else {
      e.cancelBubble = true;
      ableScroll = true;
    }
  }
}

// touch
var startY = 0;
var moveEndY = 0;
var directionY = 0;
$(parent).on("touchstart", function (e) {
  e = e || window.event;
  startY = e.originalEvent.changedTouches[0].pageY;
});
$(parent).on("touchend", function (e) {
  e = e || window.event;
  moveEndY = e.originalEvent.changedTouches[0].pageY;
  directionY = moveEndY - startY;
  scrollFun();
});
$(projectDetail).on("touchend", stopProp);
if (navigator.userAgent.toLowerCase().indexOf("firefox") != -1) {
  document.addEventListener("DOMMouseScroll", scrollFun, false);
  projectDetail.addEventListener("DOMMouseScroll", stopProp, false);
} else if (document.addEventListener) {
  document.addEventListener("mousewheel", scrollFun, false);
  projectDetail.addEventListener("mousewheel", stopProp, false);
} else if (document.attachEvent) {
  document.attachEvent("onmousewheel", scrollFun, false);
  projectDetail.attachEvent("onmousewheel", stopProp, false);
} else {
  document.onmousewheel = scrollFun;
  projectDetail.onmousewheel = stopProp;
}
let nowPage = 1;
let nowTime = 0;
let endTime = 0;
let ableScroll = true;
let maxHeight = parent.scrollHeight;
let maxPage = Math.round(maxHeight / viewHeight);
function scrollFun(e) {
  var e = e || window.event;
  var delta = e.deltaY;

  if (ableScroll) {
    if (
      (delta > 0 && nowPage < maxPage) ||
      (directionY < 0 && nowPage < maxPage)
    ) {
      nowPage++;
      ableScroll = false;
      $(parent).animate(
        { scrollTop: viewHeight * (nowPage - 1) },
        1000,
        function () {
          ableScroll = true;
        }
      );
    } else if ((delta < 0 && nowPage > 1) || (directionY > 0 && nowPage > 1)) {
      nowPage--;
      ableScroll = false;
      $(parent).animate(
        { scrollTop: viewHeight * (nowPage - 1) },
        1000,
        function () {
          ableScroll = true;
        }
      );
    }
  }
}
