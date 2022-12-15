class pokemonParty {
    constructor(inPokemon1, inPokemon2, inPokemon3, inPokemon4, inPokemon5, inPokemon6) {
        this.pokemon1 = inPokemon1;
        this.pokemon2 = inPokemon2;
        this.pokemon3 = inPokemon3;
        this.pokemon4 = inPokemon4;
        this.pokemon5 = inPokemon5;
        this.pokemon6 = inPokemon6; 
        this.counter = 1;       
    }

    setPokemon(x, newPokemon) {
        if (x == 1) {
            this.pokemon1 = newPokemon;    
        } else if (x == 2) {
            this.pokemon2 = newPokemon;    
        } else if (x == 3) {
            this.pokemon3 = newPokemon;    
        } else if (x == 4) {
            this.pokemon4 = newPokemon;    
        } else if (x == 5) {
            this.pokemon5 = newPokemon;    
        } else if (x == 6) {
            this.pokemon6 = newPokemon;    
        }

    }

    setCounter(x) {
        this.counter = x;
    }
}