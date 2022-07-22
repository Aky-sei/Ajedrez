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

    checkMove(i,j,p) {
        if (board[i] !== undefined && board[i][j] !== undefined) {
            var target = board[i][j]
            if (target.have !== null) {
                if (target.have.team !== turn) {
                    if (p == "r" || p == undefined) {
                        target.mark("red")
                    }
                }
            } else {
                if (p == "g" || p == undefined) {
                    target.mark("green")
                }
            }
        }
    }

    checkLine(i,j,a,b) {
        this.checkMove(i+a,j+b)
        for(let k=2;k<8;k++){
            if(board[i+k*a-a] !== undefined && board[i+k*a-a][j+k*b-b] !== undefined && board[i+k*a-a][j+k*b-b].have == null) {
                this.checkMove(i+k*a,j+k*b)
            } else {
                break
            }
        }
    }
}

class Pawn extends Piece {
    constructor(team) {
        super(team)
    }

    move(i,j) {
        selected.x = i
        selected.y = j
        var direction = 0
        if (this.team == 0) {
            direction = 1
        } if (this.team == 1) {
            direction = -1
        }
        this.checkMove(i+1,j+direction,"r")
        this.checkMove(i-1,j+direction,"r")
        this.checkMove(i,j+direction,"g")
        if (this.team == 0 && j == 1) {
            this.checkMove(i,j+direction*2,"g")
        } if (this.team == 1 && j == 6) {
            this.checkMove(i,j+direction*2,"g")
        }
        board[i][j].mark("blue")
    }

    type = "Pawn"
}

class Queen extends Piece {
    constructor(team) {
        super(team)
    }

    move(i,j) {
        selected.x = i
        selected.y = j
        this.checkLine(i,j,1,1)
        this.checkLine(i,j,-1,-1)
        this.checkLine(i,j,1,-1)
        this.checkLine(i,j,-1,1)
        this.checkLine(i,j,0,1)
        this.checkLine(i,j,0,-1)
        this.checkLine(i,j,1,0)
        this.checkLine(i,j,-1,0)
        board[i][j].mark("blue")
    }

    type = "Queen"
}

class Bishop extends Piece {
    constructor(team) {
        super(team)
    }

    move(i,j) {
        selected.x = i
        selected.y = j
        this.checkLine(i,j,1,1)
        this.checkLine(i,j,-1,-1)
        this.checkLine(i,j,1,-1)
        this.checkLine(i,j,-1,1)
        board[i][j].mark("blue")
    }

    type = "Bishop"
}

class Rook extends Piece {
    constructor(team) {
        super(team)
    }

    move(i,j) {
        selected.x = i
        selected.y = j
        this.checkLine(i,j,0,1)
        this.checkLine(i,j,0,-1)
        this.checkLine(i,j,1,0)
        this.checkLine(i,j,-1,0)
        board[i][j].mark("blue")
    }

    type = "Rook"
}

class King extends Piece {
    constructor(team) {
        super(team)
    }

    move(i,j) {
        selected.x = i
        selected.y = j
        this.checkMove(i+1,j+1)
        this.checkMove(i+1,j)
        this.checkMove(i+1,j-1)
        this.checkMove(i,j+1)
        this.checkMove(i,j-1)
        this.checkMove(i-1,j+1)
        this.checkMove(i-1,j)
        this.checkMove(i-1,j-1)
        board[i][j].mark("blue")
    }

    type = "King"
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
        board[i][j].mark("blue")
    }

    type = "Knight"
}

var selected = {
    x: null,
    y: null
}
var turn = 0
var board
var images = {
    KnightB: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png",
    KnightW: "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png",
    KingB: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png",
    KingW: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png",
    BishopB: "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png",
    BishopW: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png",
    PawnB: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png",
    PawnW: "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png",
    QueenB: "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png",
    QueenW: "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png",
    RookB: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png",
    RookW: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png",
    None: "https://upload.wikimedia.org/wikipedia/commons/5/54/Blank_Canvas_on_Transparent_Background.png"
}

//Setup
function setup () {
    board = [[],[],[],[],[],[],[],[]]
    for(i=0;i<8;i++) {
        for(j=0;j<8;j++) {
            board[i][j] = new Slot(i,j);
        }
    }
} setup()
function createButtons() {
    for(j=1;j<9;j++){
        for(i=0;i<8;i++){
            let text = "";
            text += "<button><img id='"
            text += (8-j)*8+i
            text += "'></button>"
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
        var target = board[x][y]
        if ((x+y)%2 == 0) {
            target.background = "#769656"
        } else {
            target.background = "#eeeed2"
        }
    }
} colorPattern()

//View
function view() {
    for(i=0;i<64;i++){
        let y = Math.floor(i/8)
        let x = i%8
        let slot = document.getElementById(i)
        let target = board[x][y]
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
                    if(target.have.team == 0) {
                        slot.src = images.KnightW
                    } else {
                        slot.src = images.KnightB
                    }
                    break;
                case "King":
                    if(target.have.team == 0) {
                        slot.src = images.KingW
                    } else {
                        slot.src = images.KingB
                    }
                    break;
                case "Rook":
                    if(target.have.team == 0) {
                        slot.src = images.RookW
                    } else {
                        slot.src = images.RookB
                    }
                    break;
                case "Bishop":
                    if(target.have.team == 0) {
                        slot.src = images.BishopW
                    } else {
                        slot.src = images.BishopB
                    }
                    break;
                case "Queen":
                    if(target.have.team == 0) {
                        slot.src = images.QueenW
                    } else {
                        slot.src = images.QueenB
                    }
                    break;
                case "Pawn":
                    if(target.have.team == 0) {
                        slot.src = images.PawnW
                    } else {
                        slot.src = images.PawnB
                    }
                    break;
            }
        } else {
            slot.src = images.None
        }
    }
    if (turn == 0) {
        document.getElementById("texto").innerHTML = "Turno: Verde";
    } else {
        document.getElementById("texto").innerHTML = "Turno: Rojo";
    }
} view()

//Click
function click(event) {
    var valor = event.srcElement.id
    var y = Math.floor(valor/8)
    var x = valor % 8
    var target = board[x][y]
    if (!target.marked) {
        if(target.have !== null) {
            if(target.have.team == turn) {
                unMarkAll()
                target.have.move(x,y)
            } else {
                unMarkAll()
                selected.x = null
                selected.y = null
                alert("Seleccione una pieza de su equipo")
            }
        } else {
            unMarkAll()
            if(selected.x == null) {
                alert("Seleccione una casilla con una pieza")
            }
            selected.x = null
            selected.y = null
        }
    } else {
        if (target.color == "blue") {
            unMarkAll()
            selected.x = null
            selected.y = null
        } if (target.color == "green" || target.color == "red") {
            target.have = board[selected.x][selected.y].have
            board[selected.x][selected.y].have = null
            unMarkAll()
            selected.x = null
            selected.y = null
            turn = (turn+1)%2
        }
    }
    view()
}

//Desmarcar todo
function unMarkAll() {
    board.forEach(array => {
        array.forEach(slot => {
            slot.unmark()
        })
    })
}

function reset() {
    board[1][0].have = new Knight(0)
    board[6][0].have = new Knight(0)
    board[1][7].have = new Knight(1)
    board[6][7].have = new Knight(1)
    board[3][0].have = new King(0)
    board[4][7].have = new King(1)
    board[4][0].have = new Queen(0)
    board[3][7].have = new Queen(1)
    board[0][0].have = new Rook(0)
    board[7][0].have = new Rook(0)
    board[0][7].have = new Rook(1)
    board[7][7].have = new Rook(1)
    board[2][0].have = new Bishop(0)
    board[5][0].have = new Bishop(0)
    board[2][7].have = new Bishop(1)
    board[5][7].have = new Bishop(1)
    for(let i=0;i<8;i++) {
        board[i][1].have = new Pawn(0)
        board[i][6].have = new Pawn(1)
    }
    unMarkAll()
    selected.x = null
    selected.y = null
    turn = 0
} reset()

view()