export function filterIndexInput(evt) {
	let textvalue = $(".indexFilter")[0].value.toLowerCase();
	$(".indexContainer .items button").each(function (i) {
		if ($(this).text().toLowerCase().indexOf(textvalue) > -1) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
}

/*
bi-sort-alpha-down
bi-sort-alpha-up
bi-calendar-date
bi-calendar-date-fill

*/
export function sortIndex(evt) {
	let az = 0;
	let modified = 0;
	let elem;
	if (evt && evt.currentTarget)
		elem = evt.currentTarget;
	else
		elem = document.querySelector(".sortIndex input:checked");
	let elemClass = elem.value;
	switch (elemClass) {
		case "cal3":
			az = 1;
			break;
		case "cal4":
			az = -1;
			break;
		case "cal1":
			modified = -1;
			break;
		case "cal2":
			modified = 1;
			break;
		default:
			break;
	}
	//elem.querySelector("i").className
	// let elemClass = elem.getAttribute("class");
	// if (elemClass) {
	// 	// if (elemClass.includes("btn-secondary")) {
	// 	// 	elemClass = elemClass.replace("btn-secondary", "");
	// 	// } else {
	// 	// 	elemClass += " btn-secondary";
	// 	// }
	// 	if (elemClass.includes("bi-sort-alpha-down")) {
	// 		az = 1;
	// 		elemClass = elemClass.replace("bi-sort-alpha-down", "bi-sort-alpha-up");
	// 	} else if (elemClass.includes("bi-sort-alpha-up")) {
	// 		az = -1;
	// 		elemClass = elemClass.replace("bi-sort-alpha-up", "bi-sort-alpha-down");
	// 	} else if (elemClass.includes("bi-calendar-date-fill")) {
	// 		modified = -1;
	// 		elemClass = elemClass.replace("bi-calendar-date-fill", "bi-calendar-date");
	// 	} else if (elemClass.includes("bi-calendar-date")) {
	// 		modified = 1;
	// 		elemClass = elemClass.replace("bi-calendar-date", "bi-calendar-date-fill");
	// 	}
	// 	elem.querySelector("i").className = elemClass;
	// }
	let list = document.querySelector(".indexContainer div.items");
	// let items = document.querySelectorAll(".indexContainer .items button");
	// let itemsArr = [];
	[...list.children]
		.sort((a, b) => {
			let rv = 0;
			if (az !== 0) {
				console.log(a.textContent + " " + b.textContent);
				if (a.textContent === b.textContent) rv = 0;
				//compare ignore case 
				else rv = a.textContent.localeCompare(b.textContent, undefined, { sensitivity: 'accent' });
				//if (a.textContent.localeCompare(b.textContent))
				// rv = az; else rv = -1 * az;
				rv *= az;
			} else if (modified !== 0) {
				console.log(a.getAttribute('data-modified') + " " + b.getAttribute('data-modified'));
				if (a.getAttribute('data-modified') === b.getAttribute('data-modified')) rv = 0;
				else rv = a.getAttribute('data-modified').localeCompare(b.getAttribute('data-modified'))
				rv *= modified;
			}
			console.log("value: " + rv);
			return rv;
		})
		.forEach(node => list.appendChild(node));
	// 	.forEach(node => itemsArr.push(node));
	// let i = 0;
	// list.innerHTML = '';//clear children
	// for (i = 0; i < itemsArr.length; ++i) {
	// 	list.appendChild(itemsArr[i]);
	// }
}

// document.addEventListener('DOMContentLoaded', function () {
// 	$(".indexFilter").on("input", filterIndexInput);
// 	setTimeout(filterIndexInput, 2000);
// });