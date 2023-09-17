function filterIndexInput() {
	let textvalue = $(".indexFilter")[0].value.toLowerCase();
	$(".indexContainer button").each(function (i) {
		if ($(this).text().toLowerCase().indexOf(textvalue) > -1) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
}

document.addEventListener('DOMContentLoaded', function () {
	$(".indexFilter").on("input", filterIndexInput);
	setTimeout(filterIndexInput, 2000);
});