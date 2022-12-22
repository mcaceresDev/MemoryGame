
//---------- VARIABLES GLOBALES ------------
class Environment {
    static instance

    cards
    movesCounter   
    currentLevel
    levels
    timer
    isRelaxMode = false
    hasSound = true
    
    /* Elementos HTML */
    levelIndicator = document.querySelector("#nivel")
    movesIndicator = document.querySelector("#movTotal")
    btnCloseMenu   = document.querySelector(".btn-cierre");
    btnBurguer     = document.querySelector('#burguer')
    mainScreen     = document.querySelector('#pantallaInicio')

    
    //Sonidos
    btnSound       = document.getElementById("sonido");
    btnMute        = document.getElementById("mute");
    flipSound      = document.querySelector("#volteo")
    successSound   = document.querySelector("#acertado")
    failSound      = document.querySelector("#fallo")
    gameOverSound  = document.querySelector("#fallaste")

    /* Elementos interactivos */
    cards = [
        ['A', 'B', 'E', 'G'],
        ['C', 'D', 'N', 'O', 'S', 'K'],
        ['M', 'H', 'V', 'L', 'X', 'Y', 'R', 'Q'],
        ['Z', 'I', 'F', 'W', '[', 'T', '_', '^', 'U', ']']
    ];

    levels = [
        {
            cardGroup: this.cards[0],
            maxMoves: 8,
            maxMinutes: 0,
            maxSeconds: 20
        },
        {
            cardGroup: this.cards[1],
            maxMoves: 12,
            maxMinutes: 0,
            maxSeconds: 40
        },
        {
            cardGroup: this.cards[2],
            maxMoves: 20,
            maxMinutes: 1,
            maxSeconds: 0
        },
        {
            cardGroup: this.cards[3],
            maxMoves: 25,
            maxMinutes: 1,
            maxSeconds: 0
        },
        {
            cardGroup: this.cards[2].concat(this.cards[0]),
            maxMoves: 30,
            maxMinutes: 1,
            maxSeconds: 20
        }
    ];

    constructor(){
        if (Environment.instance) {
            return Environment.instance;
        }
        
        Environment.instance = Environment;
    }
}

// const env = new Environment()
const environment = new Environment();
const { mainScreen, btnBurguer } = environment