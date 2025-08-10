import { run_algorithm } from './spaghetti-monster.js'

console.log("Try to optimize the volume of a cylinder, with a maximum allowed area");
run_algorithm(new_genome_function, mutate, evaluate, output, finishMetaFunction());


function new_genome_function() {
	return [Math.random(), Math.random()];
}


function mutate(genome) {
	let rtn = [];
	for (var i = 0; i < genome.length; i++) {
		rtn.push(genome[i]);
	}

	rtn[0] += 0.00005*(Math.random()-Math.random());
	rtn[1] += 0.00005*(Math.random()-Math.random());
	return rtn;
}

/**
 * if the surface area exceeds 4PI, then the solution is invalid, return 0 score.
 * else, return the volume, higher volume gives higher score. 
 */
function evaluate (genome) {
	let area = surface_area(genome);
	let volume = (genome[0] ** 2) * Math.PI * genome[1]; 

	if(area > 4 * Math.PI) {
		return 0;
	}
 	return volume;
}


function surface_area(genome) {
	let top_bottom = 2 * (genome[0] ** 2) * Math.PI;
	let side_area = 2 * genome[0] * Math.PI * genome[1];

	return top_bottom + side_area;
}


function output (genome) {
	console.log("radius, height: " + genome);
	console.log("volume: " + (genome[0] ** 2) * Math.PI * genome[1]);
	console.log("surface_area: " + surface_area(genome));	
}


function finishMetaFunction() {
	const milliseconds = new Date().getTime();
	return (genome) => new Date().getTime() - milliseconds > 30000;
}
