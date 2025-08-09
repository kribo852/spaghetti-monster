
/**
 * 
 * function run, runs a genetic algorithm 
 * 
 * For some user defined genome datatype G
 * 
 * new_genome_function() -> G
 * mutate(G) -> G
 * evaluate(G) -> number (the score/fitness of the genome)
 * output(G) 
 * finish(G) -> boolean
 * 
 * All these are user defined functions operating on the user defined genome. The genome represents 
 * a solution to a problem
 * 
*/
export function run_algorithm(new_genome_function, mutate, evaluate, output, finish) {
	
	let habitat_len = 50;
	let best_genome_index = 0;
	let habitat = []

	for (var i = 0; i < habitat_len; i++) {
		habitat.push(new_genome_function());
		if (evaluate(habitat[i]) > evaluate(habitat[best_genome_index])) {
			best_genome_index = i;
		}
	}


	while(!finish(habitat[best_genome_index])) {
		for (var iteration = 0; iteration < 1000; iteration ++) {
			const mutated_clone = mutate(habitat[random_int(habitat_len)]);

			const new_score = evaluate(mutated_clone);

			for (var i = 0; i < habitat_len; i++) {
				if ( evaluate(habitat[i]) < new_score ) {
					habitat[i] = mutated_clone;
					if ( evaluate(habitat[best_genome_index]) < new_score ) {
						best_genome_index = i;
					}
					break;
				}
			}
		}
		output(habitat[best_genome_index]);
	}

	
	return habitat[best_genome_index];
}

function random_int(upper_bound) {
	return Math.floor(Math.random() * upper_bound);
}
