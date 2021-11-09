document.addEventListener('DOMContentLoaded', function() {
	$(".indexFilter").keyup(function() {
		let textvalue = $(".indexFilter")[0].value.toLowerCase();
		$(".indexContainer p").each(function( i ) {
			if($(this).text().toLowerCase().indexOf(textvalue)>-1){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	});
});