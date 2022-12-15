// <<sketch.js>>
let pokemonUrl;
let pokemonimg;
let moveUrl;
let Move;

let purse = 500;

let playerThrowSpritesheet;
let playerThrowSheetData;
let playerAnimation = [];

let pokeballThrowSpritesheet;
let pokeballThrowSheetData;
let pokeballAnimation = [];
let newPokemonUnlock = new pokemonDrawn(" ", '');
let collection = [];

let soundtrack;
let mute;


let startPressed = false;
let collectionPressed = false;
let drawPressed = false;
let partyEditor = false;

let startXLeft = 100;
let startYLeft = 200;
//let leftX = 30;
//let leftY = 200;
let leftPlayerCoords;
let startXRight = 240;
let startYRight = 150;
let rightX = startXRight;
let rightY = startYRight;





let currentAnimation = null;

pokemonList = [];
pokemonNumberList = [7, 17, 19, 30, 40, 45, 56, 70, 80, 81,
                    83, 93, 110, 117, 118, 120, 128, 131, 136, 138,
                    149, 151, 153, 165, 170, 172, 173, 175, 176, 185,
                    186, 191, 194, 197, 206, 210, 212, 214, 229, 234,
                    239, 240, 241, 248, 250, 260, 276, 278, 294, 297,
                    303, 304, 306, 311, 315, 317, 327, 340, 345, 357,
                    367, 377, 379, 383, 384, 390, 392, 398, 400, 405,
                    409, 411, 419, 426, 427, 432, 433, 438, 440, 442,
                    446, 451, 453, 461, 466, 467, 469, 476, 486, 487,   // this is the list of pokedex indexes so the program knows which pokemon to search for when the api is called
                    492, 494, 497, 498, 501, 503, 513, 521, 523, 526,
                    530, 534, 537, 545, 553, 558, 571, 579, 587, 590,
                    609, 612, 643, 649, 651, 658, 662, 663, 667, 675,
                    687, 691, 697, 700, 701, 702, 706, 713, 715, 719,
                    724, 732, 743, 744, 748, 750, 752, 754, 758, 759,
                    766, 772, 776, 781, 788, 794, 797, 802, 804, 806];
pokemonImageList = [];
pokemonNameTestList = [];
moveList = [];

commonPokemonList = [];
rarePokemonList = [];
ultraPokemonList = [];
legendaryPokemonList = [];

collectionList = [];
let collectionIndex = 0;

moveList = [];

let partyIndex = 1;

let turnCount = 0;
// above is the initalisation of the global variables that will need to be accessed throughout the program


function preload() {    // this function preloads all the assets that will be needed throughout the game, for example the pokemon sprites

    soundtrack = loadSound('sprites/sound fx/144 Battle! Gym Leader.mp3');

    pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/luxray/';
    pokemonSpecies = loadJSON(pokemonUrl);

    playerThrowSheetData = loadJSON('sprites/player sprite/playerSprite.json');
    playerThrowSpritesheet= loadImage('sprites/player sprite/34020.png');

    pokeballThrowSheetData = loadJSON('sprites/pokeball throw/pokeballThrow.json');
    pokeballThrowSpritesheet = loadImage('sprites/pokeball throw/pokeball-1.png.png');


    pokemonPlaceholderImage = loadImage('sprites/pokemon sprites/placeholder.png');

    for (let i = 0; i < 150; i++) {
        pokemonImageList[i] = new pokemonImageHolder(loadImage(`sprites/final sprite folder/${pokemonNumberList[i]}/${pokemonNumberList[i]}Left.gif`), loadImage(`sprites/final sprite folder/${pokemonNumberList[i]}/${pokemonNumberList[i]}LeftS.gif`), loadImage(`sprites/final sprite folder/${pokemonNumberList[i]}/${pokemonNumberList[i]}Right.gif`), loadImage(`sprites/final sprite folder/${pokemonNumberList[i]}/${pokemonNumberList[i]}RightS.gif`), loadImage(`sprites/final sprite folder/${pokemonNumberList[i]}/${pokemonNumberList[i]}mini.png`));
    }

   
}

async function loadRemoteData() { // this function loads the data from the api

    for (let i = 0; i < 150; i++) {
        const response = await fetch( `https://pokeapi.co/api/v2/pokemon/${pokemonNumberList[i]}`);
        const data = await response.json(); // await tells the program to wait for the api data to have been recieved before the rest of the program can continue
    
        let rarity = "";
        let baseStatTotal = data.stats[0].base_stat + data.stats[1].base_stat + data.stats[2].base_stat + data.stats[3].base_stat + data.stats[4].base_stat + data.stats[5].base_stat;
        console.log(baseStatTotal);

        if (baseStatTotal < 375) {      // this if statement usess the worked out base stat total to split the pokemon in to their different rarities
            rarity = "Common";
        } else if (baseStatTotal >= 375 && baseStatTotal < 500) {
            rarity = "Rare";
        } else if (baseStatTotal >= 500 && baseStatTotal < 570) {
            rarity = "Ultra Rare";
        } else if (baseStatTotal > 570) {
            rarity = "Legendary";
        }
    
        let pokemonType1 = data.types[0].type.name;     //assignment of the pokemon types
        let pokemonType2;
    
        if (data.types.length > 1){
            pokemonType2 = data.types[1].type.name;
        } else {
            pokemonType2 = "none"
        }
    
        pokemonList[i] = new pokemon(data.name, rarity, pokemonType1, pokemonType2, pokemonImageList[i].leftImg, pokemonImageList[i].leftShinyImg, pokemonImageList[i].rightImg, pokemonImageList[i].rightShinyImg, pokemonImageList[i].miniImg, "", "", "", "", data.stats[0].base_stat, data.stats[1].base_stat, data.stats[2].base_stat, data.stats[3].base_stat, data.stats[4].base_stat);
        //creation of the pokemon object itself


        let raritySort = pokemonList[i].rarity;
        console.log('>> ' + i + ' > ' + pokemonList[i]);
        if (raritySort == 'Common') {       // this sorts the pokemon out in to their respective rarities ready to be sorted later to be drawn
            commonPokemonList.push([pokemonList[i].name, pokemonList[i].rightImg, pokemonList[i].rightShiny]);
        } else if (raritySort == 'Rare') {
            rarePokemonList.push([pokemonList[i].name, pokemonList[i].rightImg, pokemonList[i].rightShiny]);
        } else if (raritySort == "Ultra Rare") {
            ultraPokemonList.push([pokemonList[i].name, pokemonList[i].rightImg, pokemonList[i].rightShiny]);
        } else if (raritySort == "Legendary") {
            legendaryPokemonList.push([pokemonList[i].name, pokemonList[i].rightImg, pokemonList[i].rightShiny]);
        }
    
        console.log(pokemonList[i].name);
    }

    for (let i = 0; i < 826; i++) {
        const moveResponse = await fetch(`https://pokeapi.co/api/v2/move/${i + 1}/`); // this recieves the data for the moves to be used
        const moveData = await moveResponse.json();

        moveList[i] = new pokemonMove(moveData.name, moveData.accuracy, moveData.power, moveData.damage_class.name, moveData.pp, moveData.priority, moveData.type.name, moveData.learned_by_pokemon);
        //creation of move object
        console.log(moveList[i]);
    }
}




function setup() {


    loadRemoteData().then(() => { 
        // this loop sorts the move in to the pokemon's move list, which allows for the pokemon to have a set of random moves
        for (let i = 0; i < moveList.length; i++) {
            for (let j = 0; j < pokemonList.length; j++) {
                for (let k = 0; k < moveList[i].userList.length; k++) {
                    if (pokemonList[j].name == moveList[i].userList[k].name) {
                        pokemonList[j].addMove(moveList[i]);
                    }
                }
            }
        }

        for (let i = 0; i < pokemonList.length; i++) {
            move1Value = Math.floor(Math.random() * pokemonList[i].availableMoves.length);  //randomly selects a move from the pokemons move list and adds it to its using moves
            move2Value = Math.floor(Math.random() * pokemonList[i].availableMoves.length);
            move3Value = Math.floor(Math.random() * pokemonList[i].availableMoves.length);
            move4Value = Math.floor(Math.random() * pokemonList[i].availableMoves.length);

            pokemonList[i].move1 = pokemonList[i].availableMoves[move1Value];
            pokemonList[i].move2 = pokemonList[i].availableMoves[move2Value];
            pokemonList[i].move3 = pokemonList[i].availableMoves[move3Value];
            pokemonList[i].move4 = pokemonList[i].availableMoves[move4Value];
        }

    });
    
    newPokemonUnlock.image = pokemonPlaceholderImage;
    createCanvas(windowWidth, windowHeight - 100);

    let playerAnimationFrames = playerThrowSheetData.frames;
    for (let i = 0; i < playerAnimationFrames.length; i++) { // sets the positioning for the animation at the beginning of the fight game
        console.log(">>> " + playerAnimationFrames[i])
        let framePositionPlayerThrow = playerAnimationFrames[i].position;
        let grabbedFrame = playerThrowSpritesheet.get(framePositionPlayerThrow.x, framePositionPlayerThrow.y, framePositionPlayerThrow.w, framePositionPlayerThrow.h);
        playerAnimation.push(grabbedFrame); 
    }

    let pokeballAnimationFrames = pokeballThrowSheetData.frames;
    for (let i = 0; i < pokeballAnimationFrames.length; i++) { // second animation initialisation
        console.log(">>> " + pokeballAnimationFrames[i])
        let framePositionPokeballThrow = pokeballAnimationFrames[i].position;
        let grabbedFramepokeball = pokeballThrowSpritesheet.get(framePositionPokeballThrow.x, framePositionPokeballThrow.y, framePositionPokeballThrow.w, framePositionPokeballThrow.h);
        pokeballAnimation.push(grabbedFramepokeball);
    }
    
    //initialisation of the party to add pokemon to
    collectionArray = new pokemonParty(pokemonPlaceholderImage, pokemonPlaceholderImage, pokemonPlaceholderImage, pokemonPlaceholderImage, pokemonPlaceholderImage, pokemonPlaceholderImage);

    //initialisation for the animation to be called
    playerThrowSequence = new playerThrow(playerAnimation, 50, 225);
    pokeballThrowSequence = new playerThrow(pokeballAnimation, 150, 200);
    leftPlayerCoords = new coordinates(startXLeft, startYLeft);
    
    //initialisation of the different buttons used in the game
    buttonToolbar = createDiv();
    buttonToolbar.addClass("toolbar");

    buttonBattlebar = createDiv();
    buttonBattlebar.addClass("battlebar")

    utilBar = createDiv();
    utilBar.addClass("utilbar");

    startPressed = false;
    startButton = createButton("Start");
    startButton.parent(buttonToolbar);
    startButton.mousePressed(startButtonPressed);
    startButton.addClass("btn btn-primary");
    
    drawPressed = false;
    drawCharacterButton = createButton("Character Draw");
    drawCharacterButton.parent(buttonToolbar);
    drawCharacterButton.mousePressed(drawCharacterButtonPressed);
    drawCharacterButton.addClass("btn btn-primary");

    collectionPressed = false;
    collectionButton = createButton("Collection");
    collectionButton.parent(buttonToolbar);
    collectionButton.mousePressed(collectionButtonPressed);
    collectionButton.addClass("btn btn-primary");

    purchased = false;
    purchaseButton = createButton("Buy");
    purchaseButton.parent(buttonToolbar);
    purchaseButton.mousePressed(randomDraw);
    purchaseButton.addClass("btn btn-primary");

    partyEditor = false;
    partyButton = createButton("Add to Party");
    partyButton.parent(buttonToolbar);
    partyButton.mousePressed(partyEditorPressed);
    partyButton.addClass("btn btn-primary");

    mute = true;
    muteButton = createButton("Unmute");
    muteButton.parent(utilBar);
    muteButton.mousePressed(mutePressed);
    muteButton.addClass("btn btn-primary");

    move1 = createButton("");
    move1.style('background-color', 'light-grey');
    move1.mousePressed(move1Pressed);
    move1.parent(buttonBattlebar);
    move1.addClass("btn btn-success");

    move2 = createButton("");
    move2.style('background-color', 'light-grey');
    move2.mousePressed(move2Pressed);
    move2.parent(buttonBattlebar);
    move2.addClass("btn btn-danger");

    move3 = createButton("");
    move3.style('background-color', 'light-grey');
    move3.mousePressed(move3Pressed);
    move3.parent(buttonBattlebar);
    move3.addClass("btn btn-warning");

    move4 = createButton("");
    move4.style('background-color', 'light-grey');
    move4.mousePressed(move4Pressed);
    move4.parent(buttonBattlebar);
    move4.addClass("btn btn-info");
    
    next_pokemon = createButton('Next >');
    next_pokemon.style('font-size', '25px');
    next_pokemon.position(500, 400);
    next_pokemon.mousePressed(next_pokemon_pressed);

    last_pokemon = createButton('< Previous');
    last_pokemon.style('font-size', '25px');
    last_pokemon.position(300, 400);
    last_pokemon.mousePressed(prev_pokemon_pressed);

    nextParty = createButton('next');
    nextParty.style('font-size', '12px');
    nextParty.position(725, 300);
    nextParty.mousePressed(next_party_pressed);

    lastParty = createButton('prev');
    lastParty.style('font-size', '12px');
    lastParty.position(650, 300);
    lastParty.mousePressed(prev_party_pressed);

    mainMenu = createButton("Main Menu");
    mainMenu.parent(buttonToolbar);
    mainMenu.mousePressed(mainMenuPressed);
    mainMenu.addClass("btn btn-primary");

    mainMenuF = createButton("Main Menu");
    mainMenuF.parent(utilBar);
    mainMenuF.mousePressed(mainMenuPressed);
    mainMenuF.addClass("btn btn-primary");
   
   
}

function windowResized() {      // resizes the window so the game can be played on differenct sized devices
    resizeCanvas(windowWidth, windowHeight - 100);
}



function mainMenuPressed() { // sets the boolean states in the game loop to display the main menu
    startPressed = false;
    drawPressed = false;
    collectionPressed = false;
    partyEditor = false;
}

function collectionButtonPressed() {  // sets the boolean states in the game loop to display the collection
    collectionPressed = true;
    startPressed = false;
    drawPressed = false;
    partyEditor = false;
}

function partyEditorPressed() {  // checks which index is to be changed and then adds the currently viewed pokemon to the party

    if (partyIndex == 1) {
        collectionArray.setPokemon(1, collectionList[collectionIndex]);

    } else if (partyIndex == 2) {
        collectionArray.setPokemon(2, collectionList[collectionIndex]);

    } else if (partyIndex == 3) {
        collectionArray.setPokemon(3, collectionList[collectionIndex]);

    } else if (partyIndex == 4) {
        collectionArray.setPokemon(4, collectionList[collectionIndex]);

    } else if (partyIndex == 5) {
        collectionArray.setPokemon(5, collectionList[collectionIndex]);

    } else if (partyIndex == 6) {
        collectionArray.setPokemon(6, collectionList[collectionIndex]);

    }
}

function prev_pokemon_pressed() { // goes back one in the collection array
        if (collectionIndex < 0) {
            collectionIndex = 0;
        } else {
            collectionIndex -= 1;
        }
}

function next_pokemon_pressed() { // goes forward one in the collection array
if (collectionIndex > collectionList.length-1) {
    collectionIndex = collectionList.length-1;
} else {
    collectionIndex += 1;
}
}

function next_party_pressed() { // goes forward one in the party index
    if (partyIndex > 6) {
        partyIndex = 6;
    } else {
        partyIndex += 1;
    }
}
function prev_party_pressed() {  // goes back one in the party index
    if (partyIndex < 0) {
        partyIndex = 0;
    } else {
        partyIndex -= 1;
    }
}

function startButtonPressed() { //sets the boolean values to start the game
    startPressed = true;
    mute = false;
    muteButton.html("Mute");
}

function drawCharacterButtonPressed() { // sets the boolean values to show the draw menu
    drawPressed = true;
}

function mutePressed() {    // mutes the soundtrack and updates the button dynamically
    if (mute == true) {
        mute = false;
        muteButton.html("Mute");
    } else if (mute == false) {
        mute = true;
        muteButton.html("Unmute");
    }
}



function damageCalculation(movePower, moveType, damageType, attackerAtk, attackerSpAtk, attackerType, targetDef, targetSpDef) { // calculates the amount of damage a pokemon will do to the other
    
    let attackValue;
    let defenceValue;
    
    if (damageType == "physical") { // sets the attack and defence values based on move type: physical or special
        attackValue = attackerAtk;
        defenceValue = targetDef;

    } else if (damageType == "special"){
        attackValue = attackerSpAtk;
        defenceValue = targetSpDef;
    }

    if (attackerType == moveType) { // checks for same type atk bonus
        STAB = 1.5;
    } else {
        STAB = 1;
    }

    //main damage equation used by the actual pokemon games --> values directly interpreted from the official wiki
    outputDamage = ((((((2 * 30 * (Math.floor(Math.random() * 2) + 1))/5) + 2) * movePower * (attackValue / defenceValue)) / 50) + 2) * STAB * ((Math.floor(Math.random() * 38) + 217)/255);    
    console.log(outputDamage);

    move1.show();
    move2.show();
    move3.show();
    move4.show();

    return outputDamage;
}


// the move{i}Pressed() functions are identical, just the values are based on the move in that pokemons slot

function move1Pressed() {
    move1.hide();
    move2.hide();
    move3.hide();
    move4.hide();

    if (turnCount % 2 == 0) { // determines which pokemon's moves should be calculated based on the turncounter, if its even its player 1 if its odd its player 2
        damage = damageCalculation(collectionArray.pokemon1.move1.power, collectionArray.pokemon1.move1.type, collectionArray.pokemon1.move1.damageClass, collectionArray.pokemon1.attackStat, collectionArray.pokemon1.spAttackStat, collectionArray.pokemon1.type, collectionArray.pokemon2.defenceStat, collectionArray.pokemon2.spDefenceStat);
        collectionArray.pokemon2.healthStat -= damage;
    } else {
        damage = damageCalculation(collectionArray.pokemon2.move1.power, collectionArray.pokemon2.move1.type, collectionArray.pokemon2.move1.damageClass, collectionArray.pokemon2.attackStat, collectionArray.pokemon2.spAttackStat, collectionArray.pokemon2.type, collectionArray.pokemon1.defenceStat, collectionArray.pokemon1.spDefenceStat);
        collectionArray.pokemon1.healthStat -= damage;
    }

    turnCount += 1;
}

function move2Pressed() {
    move1.hide();
    move2.hide();
    move3.hide();
    move4.hide();

    if (turnCount % 2 == 0) {
        damage = damageCalculation(collectionArray.pokemon1.move2.power, collectionArray.pokemon1.move2.type, collectionArray.pokemon1.move2.damageClass, collectionArray.pokemon1.attackStat, collectionArray.pokemon1.spAttackStat, collectionArray.pokemon1.type, collectionArray.pokemon2.defenceStat, collectionArray.pokemon2.spDefenceStat);
        collectionArray.pokemon2.healthStat -= damage;
    } else {
        damage = damageCalculation(collectionArray.pokemon2.move2.power, collectionArray.pokemon2.move2.type, collectionArray.pokemon2.move2.damageClass, collectionArray.pokemon2.attackStat, collectionArray.pokemon2.spAttackStat, collectionArray.pokemon2.type, collectionArray.pokemon1.defenceStat, collectionArray.pokemon1.spDefenceStat);
        collectionArray.pokemon1.healthStat -= damage;
    }

    turnCount += 1;
}

function move3Pressed() {
    move1.hide();
    move2.hide();
    move3.hide();
    move4.hide();

    if (turnCount % 2 == 0) {
        damage = damageCalculation(collectionArray.pokemon1.move3.power, collectionArray.pokemon1.move3.type, collectionArray.pokemon1.move3.damageClass, collectionArray.pokemon1.attackStat, collectionArray.pokemon1.spAttackStat, collectionArray.pokemon1.type, collectionArray.pokemon2.defenceStat, collectionArray.pokemon2.spDefenceStat);
        collectionArray.pokemon2.healthStat -= damage;
    } else {
        damage = damageCalculation(collectionArray.pokemon2.move3.power, collectionArray.pokemon2.move3.type, collectionArray.pokemon2.move3.damageClass, collectionArray.pokemon2.attackStat, collectionArray.pokemon2.spAttackStat, collectionArray.pokemon2.type, collectionArray.pokemon1.defenceStat, collectionArray.pokemon1.spDefenceStat);
        collectionArray.pokemon1.healthStat -= damage;
    }

    turnCount += 1;
}

function move4Pressed() {
    move1.hide();
    move2.hide();
    move3.hide();
    move4.hide();

    if (turnCount % 2 == 0) {
        damage = damageCalculation(collectionArray.pokemon1.move4.power, collectionArray.pokemon1.move4.type, collectionArray.pokemon1.move4.damageClass, collectionArray.pokemon1.attackStat, collectionArray.pokemon1.spAttackStat, collectionArray.pokemon1.type, collectionArray.pokemon2.defenceStat, collectionArray.pokemon2.spDefenceStat);
        collectionArray.pokemon2.healthStat -= damage;
    } else {
        damage = damageCalculation(collectionArray.pokemon2.move4.power, collectionArray.pokemon2.move4.type, collectionArray.pokemon2.move4.damageClass, collectionArray.pokemon2.attackStat, collectionArray.pokemon2.spAttackStat, collectionArray.pokemon2.type, collectionArray.pokemon1.defenceStat, collectionArray.pokemon1.spDefenceStat);
        collectionArray.pokemon1.healthStat -= damage;
    }


    
    turnCount += 1;
}



function randomDraw() {
    
    if (purse >= 50) {
        purse -= 50; // lowers the players money: 'pays'
    
        let rarity = Math.random(); // picks a random number between 0 and 1

        if (rarity < 0.5) {
            commonNum = Math.floor(Math.random() * commonPokemonList.length - 1) + 1; // picks a random number in the rarities list and displays it
            console.log(commonPokemonList[commonNum][0]);
            pokemonName = commonPokemonList[commonNum][0];
            pokemonImage = commonPokemonList[commonNum][1];

        } else if (rarity < 0.75 ) {
            rareNum = Math.floor(Math.random() * rarePokemonList.length - 1) + 1;  // picks a random number in the rarities list and displays it
            console.log(rarePokemonList[rareNum][0]);
            pokemonName = rarePokemonList[rareNum][0];
            pokemonImage = rarePokemonList[rareNum][1];

        } else if (rarity < 0.9 ) {
            ultraNum = Math.floor(Math.random() * ultraPokemonList.length - 1) + 1;  // picks a random number in the rarities list and displays it
            console.log(ultraPokemonList[ultraNum][0]);
            pokemonName = ultraPokemonList[ultraNum][0];
            pokemonImage = ultraPokemonList[ultraNum][1];

        } else {
            legendaryNum = Math.floor(Math.random() * legendaryPokemonList.length - 1) + 1;  // picks a random number in the rarities list and displays it
            console.log(legendaryPokemonList[legendaryNum][0]);
            pokemonName = legendaryPokemonList[legendaryNum][0];
            pokemonImage = legendaryPokemonList[legendaryNum][1];

        }
        newPokemonUnlock.name = pokemonName;
        newPokemonUnlock.image = pokemonImage;
        for (i = 0 ; i < pokemonList.length-1 ; i++) {
            if (newPokemonUnlock.name == pokemonList[i].name) {
                pokemonUnlockNumber = i;
                break;
                //console.log(collectionList);
            }
        }
        if (collectionList.length-1 <= 0) {   // puts a pokemon in to the party object, so the players have some pokemon to use even if they have 1
            console.log(pokemonList[pokemonUnlockNumber]);
            collectionList.push(pokemonList[pokemonUnlockNumber]);
            collectionArray.pokemon1 = pokemonList[pokemonUnlockNumber];
            collectionArray.pokemon2 = pokemonList[pokemonUnlockNumber];
            collectionArray.pokemon3 = pokemonList[pokemonUnlockNumber];
            collectionArray.pokemon4 = pokemonList[pokemonUnlockNumber];
            collectionArray.pokemon5 = pokemonList[pokemonUnlockNumber];
            collectionArray.pokemon6 = pokemonList[pokemonUnlockNumber];
        } else {
            for(j = 0; j <= collectionList.length-1; j++) {

                if (newPokemonUnlock.name == collectionList[j].name) {
                    break;
                } else if (j == collectionList.length-1) {
                    console.log(pokemonList[pokemonUnlockNumber]);
                    collectionList.push(pokemonList[pokemonUnlockNumber]);
                }
            
            }
        }
        


        console.log(newPokemonUnlock);  
        return newPokemonUnlock;
    } else {
        alert("insufficient funds"); // shows a dropdown when the player has no money
    }


}

function draw() {
    background(220);
    if (startPressed && !drawPressed && !collectionPressed && !partyEditor) { // starts the battle sim
        startButton.hide();
        drawCharacterButton.hide();
        partyButton.hide();
        collectionButton.hide();
        purchaseButton.hide();
        mainMenu.hide(); // hides menu buttons

        if (mute == true) { // starts the game music
            soundtrack.stop();
        } else if (mute == false) {
            if (!soundtrack.isPlaying()) {
                soundtrack.loop();
            }
        }
        
        if (!playerThrowSequence.isDone()) {
            playerThrowSequence.animate();
        }else if (!pokeballThrowSequence.isDone()){
            pokeballThrowSequence.animate();

        } else {
            muteButton.show();
            mainMenuF.show();
            if (turnCount == 0) {
                move1.show();
                move2.show();
                move3.show();
                move4.show();
            }
        
            if (turnCount % 2 == 0) {
                move1.html(collectionArray.pokemon1.move1.name);
                move2.html(collectionArray.pokemon1.move2.name);
                move3.html(collectionArray.pokemon1.move3.name);
                move4.html(collectionArray.pokemon1.move4.name);
            } else {
                move1.html(collectionArray.pokemon2.move1.name);
                move2.html(collectionArray.pokemon2.move2.name);
                move3.html(collectionArray.pokemon2.move3.name);
                move4.html(collectionArray.pokemon2.move4.name);
            }
            
            if (collectionArray.pokemon2.healthStat <= 0) {
                temp = collectionArray.pokemon2;
                collectionArray.pokemon2 = collectionArray.pokemon4;
                collectionArray.pokemon4 = collectionArray.pokemon6;
                collectionArray.pokemon6 = temp;
            }


            if (currentAnimation != null) {
                if (!currentAnimation.isDone()) {
                    leftPlayerCoords = currentAnimation.compute(leftPlayerCoords);
                    //console.log(">>> " + leftPlayerCoords.toString());
                } else {
                    currentAnimation = null;
                    move1.show();
                }
            }

            text("party", 695, 130);
            image(collectionArray.pokemon1.miniImg, 650, 150);
            image(collectionArray.pokemon2.miniImg, 725, 150);
            image(collectionArray.pokemon3.miniImg, 650, 200);
            image(collectionArray.pokemon4.miniImg, 725, 200);
            image(collectionArray.pokemon5.miniImg, 650, 250);
            image(collectionArray.pokemon6.miniImg, 725, 250);
            text(partyIndex, 705, 315);
            
            playerRight = image(collectionArray.pokemon2.rightImg, rightX, rightY);
            playerLeft = image(collectionArray.pokemon1.leftImg, leftPlayerCoords.x, leftPlayerCoords.y);
            
            playerRightHealth = text(collectionArray.pokemon2.healthStat, rightX + 25, rightY);
            playerLeftHealth = text(collectionArray.pokemon1.healthStat, leftPlayerCoords.x + 25, leftPlayerCoords.y);

            //image(pokemonList[0].leftImg, POKEMON_LEFT_X, POKEMON_LEFT_Y);
            //image(pokemonList[1].rightImg, POKEMON_RIGHT_X, POKEMON_RIGHT_Y);
        }
    } else if (!startPressed && drawPressed  && !collectionPressed && !partyEditor) {
        startButton.hide();
        partyButton.hide();
        drawCharacterButton.hide();
        if (collectionList.length > 0) {
            collectionButton.show();
        } else {
            collectionButton.hide()
        }
        mainMenu.show();
        mainMenuF.hide();
        purchaseButton.show();
        text("coins: "+ purse, windowWidth / 2 - 10, 50);
        text(newPokemonUnlock.name, windowWidth / 2 - 10, 500);
        image(newPokemonUnlock.image, windowWidth / 2 - 10, 300);
    
    } else if (!startPressed && !drawPressed  && collectionPressed && !partyEditor) {
        startButton.hide();
        drawCharacterButton.hide();
        collectionButton.hide();
        purchaseButton.hide();
        partyButton.show();
        mainMenu.show();

        if (collectionIndex <= 0) {
            last_pokemon.hide();
        } else {
            last_pokemon.show();
        }

        if (collectionIndex >= collectionList.length-1) {
            next_pokemon.hide();
        } else {
            next_pokemon.show();
        }

        if (partyIndex <= 1) {
            lastParty.hide();
        } else {
            lastParty.show();
        }

        if (partyIndex == 6) {
            nextParty.hide();
        } else {
            nextParty.show();
        }

        text(collectionList[collectionIndex].name, 300, 100);
        text(collectionList[collectionIndex].rarity, 300, 150);
        image(collectionList[collectionIndex].rightImg, 300, 200);
        image(collectionList[collectionIndex].rightShiny, 450, 200);

        text("party", 695, 130);
        image(collectionArray.pokemon1.miniImg, 650, 150);
        image(collectionArray.pokemon2.miniImg, 725, 150);
        image(collectionArray.pokemon3.miniImg, 650, 200);
        image(collectionArray.pokemon4.miniImg, 725, 200);
        image(collectionArray.pokemon5.miniImg, 650, 250);
        image(collectionArray.pokemon6.miniImg, 725, 250);
        text(partyIndex, 705, 315);

    }   else if (!startPressed && !drawPressed && !collectionPressed && !partyEditor) {
        mute = true;
        partyButton.hide();
        soundtrack.stop();
        drawCharacterButton.show();
;
        if (collectionList.length > 0) {
            collectionButton.show();
            startButton.show()
        } else {
            collectionButton.hide()
            startButton.hide()
        }
        muteButton.hide();
        luxrayimgL.hide;
        piplupimgR.hide;
        muteButton.hide;
        move1.hide();
        move2.hide();
        move3.hide();
        move4.hide();
        purchaseButton.hide();
        next_pokemon.hide();
        last_pokemon.hide();
        mainMenu.hide();
        mainMenuF.hide();
        nextParty.hide();
        lastParty.hide();

    } else if (!startPressed && !drawPressed && !collectionPressed && partyEditor) {
        partyButton.hide();
        collectionButton.show()
        mainMenu.hide();
        next_pokemon.hide();
        last_pokemon.hide();
    }
}