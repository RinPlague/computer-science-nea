class pokemon {
    constructor(in_name, in_rarity, in_primary_type, in_secondary_type, in_player_left_img, in_player_left_shiny_img, in_player_right_img, in_player_right_shiny_img, in_mini_sprite, in_move1, in_move2, in_move3, in_move4, in_health, in_attack, in_defence, in_spAttack, in_spDefence) {
    
    this.name = in_name;
    this.rarity = in_rarity;
    this.primaryType = in_primary_type;
    this.secondaryType = in_secondary_type;

    this.leftImg = in_player_left_img;
    this.rightImg = in_player_right_img;
    this.leftShiny = in_player_left_shiny_img;
    this.rightShiny = in_player_right_shiny_img;
    this.miniImg = in_mini_sprite;

    this.availableMoves = [];
    this.move1 = in_move1;
    this.move2 = in_move2;
    this.move3 = in_move3;
    this.move4 = in_move4;
    
    this.healthStat = in_health;
    this.attackStat = in_attack;
    this.defenceStat = in_defence;
    this.spAttackStat = in_spAttack;
    this.spDefenceStat = in_spDefence;

    }

    rarity() {
        return this.rarity;
    }

    addMove(move) {
        this.availableMoves.push(move);
    }
}