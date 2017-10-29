
function multiply(A, B) {
	var new_matrix = [];
	for (r = 0; r < 4; r++) { 
   	for (c = 0; c < 4; c++) { 
   		new_matrix.push( A[r*4]*B[c] + A[r*4+1]*B[c+4] + A[r*4+2]*B[c+8] + A[r*4+3]*B[c+12] );
		}
	}
	console.log(new_matrix);
	return new_matrix
}
function make_css(matrix){
	css_matrix = matrix.slice(0, 2);
	css_matrix.push(0);
	css_matrix = css_matrix.concat( matrix.slice(4, 6) );
	css_matrix.push(0);
	console.log(css_matrix);
	return "matrix(" + css_matrix.join() + ")";
}

function base_matrix_adjust(current, transform) {
	a = .2;
	var transform_matrix;
	switch (transform){
		case "cw":
			transform_matrix =  [ Math.cos(a) , Math.sin(a) , 0 , 0 ,
						 				 -Math.sin(a) , Math.cos(a) , 0 , 0 ,
						 				 0 , 0 , 1 , 0 ,
						 				 0 , 0 , 0 , 1 ];
			break;
		case "ccw":
			transform_matrix =  [ Math.cos(a) , -Math.sin(a) , 0 , 0 ,
						 				 Math.sin(a) , Math.cos(a) , 0 , 0 ,
						 				 0 , 0 , 1 , 0 ,
						 				 0 , 0 , 0 , 1];
			break;
		case "left":
			transform_matrix =  [ 1 , 0 , 0 , 0 ,
						 				 0 , 1 , 0 , 0 ,
						 				 0 , 0 , 0 , 0 ,
						 				 0 , 0 , 0 , 1];
			break;
		case "right":
			transform_matrix =  [ 1 , 0 , 0 , 0 ,
						 				 0 , 1 , 0 , 0 ,
						 				 0 , 0 , 0 , 0 ,
						 				 0 , 0 , 0 , 1 ];
			break;
		default:
			transform_matrix =  [ 1 , 0 , 0 , 0 ,
						 				 0 , 1 , 0 , 0 ,
						 				 0 , 0 , 1 , 0 ,
						 				 0 , 0 , 0 , 1 ];}
	
	return multiply( transform_matrix, current);
}

function rotate(current, transform){
	var new_base_matrix = base_matrix_adjust(current, transform);
	$(".circle").css("transform", make_css(new_base_matrix) );
	console.log($(".circle").css("transform"));
	return new_base_matrix;
}

$( document ).ready(function() {
	var base_matrix = [ 1 , 0 , 0 , 0 ,
 					 		  0 , 1 , 0 , 0 ,
 					 		  0 , 0 , 1 , 0 ,
 					 		  0 , 0 , 0 , 1 ];
 					 
	$( "td" ).click(function(){ 
		console.log(this.id); 
		base_matrix = rotate(base_matrix, this.id);
	});
});