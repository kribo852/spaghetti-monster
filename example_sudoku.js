import { run_algorithm } from './spaghetti-monster.js';

//generated on the internet
let easy = [
	[5,0,8,7,6,0,0,0,0],
	[0,0,0,0,9,0,7,0,0],
	[0,7,9,1,3,0,6,0,5],
	[9,1,0,0,0,0,5,0,8],
	[0,0,0,0,1,0,3,0,2],
	[2,5,0,6,8,3,1,0,0],
	[0,2,6,0,0,9,8,0,0],
	[3,0,0,0,7,1,0,2,6],
	[8,9,0,2,0,0,0,7,0]
];

function generate_easy() {
	return () => {
		let rtn = new Array(9);
		for(var i=0; i<9; i++) {
			rtn[i] = new Array(9);
			for(var j=0; j<9; j++) {
				if(easy[i][j] !== 0) {
					rtn[i][j] = { locked_value:easy[i][j], guess:null };
				} else {
					rtn[i][j] = { locked_value:null, guess:random_digit() };
				}
			}	
		}
		return rtn;
	}
}

function mutate(instance) {
	let rtn_instance = structuredClone(instance);

	let selected_x = random_position();
	let selected_y = random_position();

	while(rtn_instance[selected_x][selected_y].locked_value != null) {
		selected_x = random_position();
		selected_y = random_position();
	}

	let previous = rtn_instance[selected_x][selected_y].guess;

	while(rtn_instance[selected_x][selected_y].guess === previous) {
		rtn_instance[selected_x][selected_y].guess = random_digit(); 
	}

	if(Math.random() > 0.5) {
		return mutate(rtn_instance);
	}

	return rtn_instance;
}

function score(instance) {
	let rtn_score = 0;
	for (var i = 0; i <9; i++) {
 		for(var j=0; j < 9; j++) {
 			rtn_score -= row_collisions(instance, i, j);
 			rtn_score -= column_collisions(instance, i, j);
 			rtn_score -= box_collisions(instance, i, j);
 		}	
 	}
 	return rtn_score; 
}

function row_collisions(instance, x, y) {
	//console.log(instance);
	if(instance[x][y].locked_value != null) {
		return 0;
	}

	let value = instance[x][y].guess;
 	let collision_score = 0;
 	for(var i=0; i<9; i++) {
 		if( x!=i ) {
 			if (instance[i][y].locked_value != null) {
 				if (instance[i][y].locked_value === value) {
 					collision_score += 10;
 				}
 			} else {
 				if (instance[i][y].guess === value) {
 					collision_score += 1;
 				}
 			}
 		}
 	}
 	return collision_score;
}


function column_collisions(instance, x, y) {
	if(instance[x][y].locked_value != null) {
		return 0;
	}

	let value = instance[x][y].guess;
 	let collision_score = 0;
 	for(var i=0; i<9; i++) {
 		if( y!=i ) {
 			if (instance[x][i].locked_value != null) {
 				if (instance[x][i].locked_value === value) {
 					collision_score += 10;
 				}
 			} else {
 				if (instance[x][i].guess === value) {
 					collision_score += 1;
 				}
 			}
 		}
 	}
 	return collision_score;
}

function box_collisions(instance, x, y) {
	if(instance[x][y].locked_value != null) {
		return 0;
	}

	let square_x = x-x%3;
	let square_y = y-y%3;

	let value = instance[x][y].guess;
 	let collision_score = 0;

	for(var i=0; i<3; i++)for(var j=0; j<3; j++) {
		if(!(x==square_x+i && y==square_y+j)) {
			if (instance[square_x+i][square_y+j].locked_value != null) {
 				if (instance[square_x+i][square_y+j].locked_value === value) {
 					collision_score += 10;
 				}
 			} else {
 				if (instance[square_x+i][square_y+j].guess === value) {
 					collision_score += 1;
 				}
 			}
		}
	}

	return collision_score;
}

function output(instance) {
	console.log(score(instance));
}

function finish(instance) {
	return score(instance) > -0.5;
}

function random_digit() {
	return 1 + Math.floor(Math.random() * 9);
}

function random_position() {
	return Math.floor(Math.random() * 9);
}


function main() {
	let solved = run_algorithm(generate_easy(), mutate, score, output, finish);

	for (var i = 0; i < 9; i++) {
		let print = "";
		for (var j = 0; j < 9; j++) {
			if(j%3==0) {
				print += "|";
			}
			print += (solved[i][j].locked_value !== null ? solved[i][j].locked_value : solved[i][j].guess) + " "; 
		}	
		if(i%3==0) {
			console.log("------------------");
		}
		console.log(print);
	}

}

//This example solves a simple Sudoku that i found on the internet.
//It does so by randommly placing digits, and evaluating how many collisions there are.
//It is not super efficient, so it can take some minutes to get the solution.
main();
