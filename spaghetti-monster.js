
export function run_algorithm(new_genome_function, mutate, evaluate, output, finish) {
	
	let habitat_len = 50;
	let best_genom_index = 0;
	let habitat = []

	for (var i = 0; i < habitat_len; i++) {
		habitat.push(new_genome_function());
		if (evaluate(habitat[i]) > evaluate(habitat[best_genom_index])) {
			best_genom_index = i;
		}
	}


	while(!finish(habitat[best_genom_index])) {
		for (var iteration = 0; iteration < 1000; iteration ++) {
			const mutated_clone = mutate(habitat[random_int(habitat_len)]);

			const new_score = evaluate(mutated_clone);

			for (var i = 0; i < habitat_len; i++) {
				if ( evaluate(habitat[i]) < new_score ) {
					habitat[i] = mutated_clone;
					if ( evaluate(habitat[best_genom_index]) < new_score ) {
						best_genom_index = i;
					}
					break;
				}
			}
		}
		output(habitat[best_genom_index]);
	}

	
	return habitat[best_genom_index];
}

function random_int(upper_bound) {
	return Math.floor(Math.random() * upper_bound);
}
