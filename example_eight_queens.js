import { run_algorithm } from './spaghetti-monster.js'

console.log("Return a solution to the eight queens problem");
run_algorithm(new_genome_function, mutate, evaluate, output, finish);


function new_genome_function() {
	let rtn = [];
	for (var i = 0; i < 8; i++) {
		rtn.push(i);
	}
	for (var i = 0; i < 24; i++) {
		let swap_index_a = random_int(8);
		let swap_index_b = random_int(8);
		let temp_swap = rtn[swap_index_a];
		rtn[swap_index_a] = rtn[swap_index_b];
		rtn[swap_index_b] = temp_swap;
	}

	return rtn;
}


function mutate(genome) {
	let rtn = [];
	for (var i = 0; i < 8; i++) {
		rtn.push(genome[i]);
	}

		let swap_index_a = random_int(8);
		let swap_index_b = random_int(8);
		let temp_swap = rtn[swap_index_a];
		rtn[swap_index_a] = rtn[swap_index_b];
		rtn[swap_index_b] = temp_swap;

	return rtn;
}


function evaluate (genome) {
	let score = 0;
	for (var i = 0; i < genome.length; i++ ) {
		for (var j = i+1; j < genome.length; j++ ) {
			let delta_a = j - i;
			let delta_b = genome[i] - genome[j];
			if( delta_a === Math.abs(delta_b)) {
				score -= 1;
			}
		}	
	}
	return score;
}


function output (genome) {
	for (var i = 0; i < genome.length; i++ ) {
		let concat = "";
		for (var j = 0; j < genome.length; j++ ) {
			if(genome[i] === j ) {
				concat+=" X ";
			} else {
				concat+=" ☐ ";
			}
		}
		console.log(concat);	
	}
}


function finish(genome) {
	return evaluate(genome) === 0;
}


function random_int(upper_bound) {
	return Math.floor(Math.random() * upper_bound);
}

