class Casilla {
    constructor() {}

    mark(color) {
        this.marked = true
        this.color = color
    }
    unmark() {
        this.marked = false
        this.color = ""
    }

    color = ""
    have = null
}

class Ficha {
    constructor(team) {
        this.team = team
    }

    checkMove(i,j) {
        if (tablero[i] !== undefined && tablero[i][j] !== undefined) {
            var target = tablero[i][j]
            if (target.have !== null) {
                if (target.have.team !== turno) {
                    target.mark("red")
                }
            } else {
                target.mark("green")
            }
        }
    }
}

class Caballo extends Ficha {
    constructor(team) {
        super(team)
    }

    move(i,j) {
        this.checkMove(i+2,j+1)
        this.checkMove(i+2,j-1)
        this.checkMove(i+1,j+2)
        this.checkMove(i+1,j-2)
        this.checkMove(i-1,j+2)
        this.checkMove(i-1,j-2)
        this.checkMove(i-2,j+1)
        this.checkMove(i-2,j-1)
    }
}

var turno = 0
var tablero

//Setup
function setup () {
    tablero = [[],[],[],[],[],[],[],[]]
    for(i=0;i<8;i++) {
        for(j=0;j<8;j++) {
            tablero[i][j] = new Casilla(i,j);
        }
    }
} setup()
function createButtons() {
    for(j=1;j<9;j++){
        for(i=0;i<8;i++){
            let text = "";
            text += "<input type='button' id='"
            text += (8-j)*8+i
            text += "'>"
            document.write(text)
        }
    }
} createButtons()

//View
function view() {
    for(i=0;i<64;i++){
        let y = Math.floor(i/8)
        let x = i%8
        if(tablero[x][y].color == "") {
            document.getElementById(i).style.backgroundColor = tablero[x][y].background
        } else {
            document.getElementById(i).style.backgroundColor = tablero[x][y].color
        } if (tablero[x][y].ocupado) {
            document.getElementById(i).value = tablero[x][y].jugador
        } else {
            document.getElementById(i).value = "."
        }
    }
    document.getElementById("texto").innerHTML = "Turno: " + turno;
} view()

tablero[1][1].have = new Caballo(0)
tablero[1][1].have.move(1,1)
console.log(tablero[2][3])
console.log(tablero)