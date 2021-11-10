function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let offsetPos = 0;
  //set min-width on element
  let minBorderLeft = parseInt($(".indexContainer").css("min-width"));
  let minBorderRight = parseInt($(".contentContainer").css("min-width"));
    
  if(isNaN(minBorderLeft)){
	minBorderLeft=0;
  }
  if(isNaN(minBorderRight)){
	minBorderRight=0;
  }
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }
  
	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		offsetPos = elementPosition() - e.clientX;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		//elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		//elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
		let oldPos = elementPosition();
		let newPos = e.clientX; //+offsetPos;
		console.log("left "+ pos1 + " " + e.clientX + " "+ newPos + " "+ oldPos + " Offset: "+offsetPos);
		if(newPos > minBorderLeft && newPos < (window.innerWidth - minBorderRight)){
			$(".indexContainer").css("flex-basis", newPos + "px");
		}
	}

	function elementPosition(){
		return parseInt($(".indexContainer").css("flex-basis"));
	}
	
	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

document.addEventListener('DOMContentLoaded', function() {
	dragElement($(".draggableSeperator")[0]);
	console.log("draggable done!");
});