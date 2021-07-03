
//---------- VARIABLES GLOBALES ------------
let cartas;
let movimientos = 0;
let movTotal = document.querySelector("#movTotal");
let nivelActual = 0;
let niveles;
let tiempo;
let modoRelax = false;
let sonido = true;
let indicadorNivel = document.querySelector("#nivel");

let volteo = document.querySelector("#volteo");
let aciertos = document.querySelector("#acertado");
let fallos = document.querySelector("#fallo");
let fallaste = document.querySelector("#fallaste");

//-------- INICIALIZADORES ----------------
var menu = document.querySelector('#burguer');

cartas = [['A','B','E','G'],
          ['C','D','N','O','S','K'],
          ['M','H','V','L','X','Y','R','Q'],
          ['Z','I','F','W','[','T','_','^','U',']']
         ];

niveles = [
            {
                tarjetas: cartas[0],
                movimientos: 8,
                temporizadorMin: 0,
                temporizadorSeg: 20
            },
            {
                tarjetas: cartas[1],
                movimientos: 12,
                temporizadorMin: 0,
                temporizadorSeg: 40
            },
            {
                tarjetas: cartas[2],
                movimientos: 20,
                temporizadorMin: 1,
                temporizadorSeg: 0
            },
            {
                tarjetas: cartas[3],
                movimientos: 25,
                temporizadorMin: 1,
                temporizadorSeg: 0
            },
            {
                tarjetas: cartas[2].concat(cartas[0]),
                movimientos: 30,
                temporizadorMin: 1,
                temporizadorSeg: 20
            }, 
            
           ];
