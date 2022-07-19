class Slot {
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
    marked = false
}

class Piece {
    constructor(team) {
        this.team = team
    }

    checkMove(i,j) {
        if (table[i] !== undefined && table[i][j] !== undefined) {
            var target = table[i][j]
            if (target.have !== null) {
                if (target.have.team !== turn) {
                    target.mark("red")
                }
            } else {
                target.mark("green")
            }
        }
    }
}

class Knight extends Piece {
    constructor(team) {
        super(team)
    }

    move(i,j) {
        selected.x = i
        selected.y = j
        this.checkMove(i+2,j+1)
        this.checkMove(i+2,j-1)
        this.checkMove(i+1,j+2)
        this.checkMove(i+1,j-2)
        this.checkMove(i-1,j+2)
        this.checkMove(i-1,j-2)
        this.checkMove(i-2,j+1)
        this.checkMove(i-2,j-1)
        table[i][j].mark("blue")
    }

    type = "Knight"
}

var selected = {
    x: null,
    y: null
}
var turn = 0
var table

//Setup
function setup () {
    table = [[],[],[],[],[],[],[],[]]
    for(i=0;i<8;i++) {
        for(j=0;j<8;j++) {
            table[i][j] = new Slot(i,j);
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
function addEvents() {
    for (let i = 0; i < 64; i++) {
        document.getElementById(i).addEventListener("click",click)
    }
} addEvents()
function colorPattern() {
    for (let i = 0; i < 64; i++) {
        var y = Math.floor(i/8)
        var x = i % 8
        var target = table[x][y]
        if ((x+y)%2 == 0) {
            target.background = "black"
        } else {
            target.background = "white"
        }
    }
} colorPattern()

//View
function view() {
    for(i=0;i<64;i++){
        let y = Math.floor(i/8)
        let x = i%8
        let slot = document.getElementById(i)
        let target = table[x][y]
        if(target.color == "") {
            slot.style.backgroundColor = target.background
        } else {
            slot.style.backgroundColor = target.color
        } if (target.have !== null) {
            if (target.have.team == 1) {
                slot.style.color = "red"
            } if (target.have.team == 0) {
                slot.style.color = "green"
            }
            switch (target.have.type) {
                case "Knight":
                    slot.value = "K"
                    break;
            }
        } else {
            slot.value = "."
            slot.style.color = "rgb(1,1,1,0)"
        }
    }
    document.getElementById("texto").innerHTML = "turn: " + turn;
} view()

//Click
function click(event) {
    var valor = event.srcElement.id
    var y = Math.floor(valor/8)
    var x = valor % 8
    var target = table[x][y]
    if (!target.marked) {
        if(target.have !== null) {
            if(target.have.team == turn) {
                target.have.move(x,y)
            } else {alert("Seleccione una pieza de su equipo")}
        } else {alert("Seleccione una Slot con una pieza")}
    } else {
        if (target.color == "blue") {
            unMarkAll()
        } if (target.color == "green" || target.color == "red") {
            target.have = table[selected.x][selected.y].have
            table[selected.x][selected.y].have = null
            unMarkAll()
            turn = (turn+1)%2
        }
    }
    view()
}

//Desmarcar todo
function unMarkAll() {
    table.forEach(array => {
        array.forEach(slot => {
            slot.unmark()
        })
    })
}

table[1][0].have = new Knight(0)
table[6][0].have = new Knight(0)
table[1][7].have = new Knight(1)
table[6][7].have = new Knight(1)
// table[1][1].have.move(1,1)
// console.log(table[2][3])
console.log(table)
view()