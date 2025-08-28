# spaghetti-monster
A library for running genetic algorithms, in Javascript. I used Node v18.19.1 to run the examples.

## How it works
The library works by operating on genomes. Each genome represents a solution to a problem one wishes to solve. The caller must decide how to represent genomes as data, generate new genomes, how to mutate them and how to estimate a score for genomes. The score decides how fit a genome is, and it is up to the caller to come up with a function that correctly expresses the fitness of genomes.

## Provided examples
### Solves the given problems with a genetic algorithm

| Problem name | File name | Link | 
|--------------|-----------|------|
| Maximize cylinder volume | example_maximze_cylinder_volume.js | |
| Eight queens problem | example_eight_queens.js | https://en.wikipedia.org/wiki/Eight_queens_puzzle | 
| Sudoku | example_sudoku.js | https://en.wikipedia.org/wiki/Sudoku |


## API
Use the library by calling the function run_algorithm in the file spaghetti-monster.js.

```
run_algorithm(new_genome_function, mutate, evaluate, output, finish)

//For some user defined genome datatype G
  
new_genome_function() -> G
mutate(G) -> G
evaluate(G) -> number (the score/fitness of the genome)
output(G) 
finish(G) -> boolean
```