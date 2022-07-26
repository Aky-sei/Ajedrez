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
    mated = false
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
        if (this.team == 0 && j == 1 && board[i][j+1].have == null) {
            this.checkMove(i,j+direction*2,"g")
        } if (this.team == 1 && j == 6 && board[i][j-1].have == null) {
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

    checkMateLine(i,j,a,b,p) {
        this.checkMate(i+a,j+b,i,j)
        for(let k=2;k<8;k++){
            if(board[i+k*a-a] !== undefined && board[i+k*a-a][j+k*b-b] !== undefined && board[i+k*a-a][j+k*b-b].have == null) {
                this.checkMate(i+k*a,j+k*b,p,i,j)
            } else {
                break
            }
        }
    }

    checkMate(i,j,p,k,h) {
        if (board[i] !== undefined && board[i][j] !== undefined) {
            var target = board[i][j]
            if (p == "d" && target.have !== null && target.have.team !== board[k][h].have.team) {
                if (target.have.type == "Bishop" || target.have.type == "Queen") {
                    target.mated = true
                    board[k][h].mated = true
                }
            } if (p == "r" && target.have !== null && target.have.team !== board[k][h].have.team) {
                if (target.have.type == "Rook" || target.have.type == "Queen") {
                    target.mated = true
                    board[k][h].mated = true
                }
            } if (p == "k" && target.have !== null && target.have.team !== board[k][h].have.team) {
                if (target.have.type == "Knight") {
                    target.mated = true
                    board[k][h].mated = true
                }
            } if (p == "p" && target.have !== null && target.have.team !== board[k][h].have.team) {
                if (target.have.type == "Pawn") {
                    target.mated = true
                    board[k][h].mated = true
                }
            }
        }
    }

    mate(i,j) {
        this.checkMateLine(i,j,1,0,"r")
        this.checkMateLine(i,j,0,1,"r")
        this.checkMateLine(i,j,-1,0,"r")
        this.checkMateLine(i,j,0,-1,"r")
        this.checkMateLine(i,j,1,1,"d")
        this.checkMateLine(i,j,-1,-1,"d")
        this.checkMateLine(i,j,1,-1,"d")
        this.checkMateLine(i,j,-1,1,"d")
        this.checkMate(i+2,j+1,"k",i,j)
        this.checkMate(i+2,j-1,"k",i,j)
        this.checkMate(i+1,j+2,"k",i,j)
        this.checkMate(i+1,j-2,"k",i,j)
        this.checkMate(i-1,j+2,"k",i,j)
        this.checkMate(i-1,j-2,"k",i,j)
        this.checkMate(i-2,j+1,"k",i,j)
        this.checkMate(i-2,j-1,"k",i,j)
        if(this.team == 0) {
            this.checkMate(i-1,j+1,"p",i,j)
            this.checkMate(i+1,j+1,"p",i,j)
        } else {
            this.checkMate(i-1,j-1,"p",i,j)
            this.checkMate(i+1,j-1,"p",i,j)
        }
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
var king = {
    zero: {
        x: 0,
        y: 0
    },
    one: {
        x: 0,
        y: 0
    }
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
    unMateAll()
    board[king.zero.x][king.zero.y].have.mate(king.zero.x,king.zero.y)
    board[king.one.x][king.one.y].have.mate(king.one.x,king.one.y)
    for(i=0;i<64;i++){
        let y = Math.floor(i/8)
        let x = i%8
        let slot = document.getElementById(i)
        let target = board[x][y]
        if(target.color == "") {
            if(target.have !== null && target.mated == true){
                slot.style.backgroundColor = "orange"
            } else {
                slot.style.backgroundColor = target.background
            }
        } else {
            slot.style.backgroundColor = target.color
        } if (target.have !== null) {
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
        document.getElementById("texto").innerHTML = "Turno: Blanco";
    } else {
        document.getElementById("texto").innerHTML = "Turno: Negro";
    }
}

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
                view()
            } else {
                unMarkAll()
                selected.x = null
                selected.y = null
                alert("Seleccione una pieza de su equipo")
                view()
            }
        } else {
            unMarkAll()
            if(selected.x == null) {
                alert("Seleccione una casilla con una pieza")
            }
            selected.x = null
            selected.y = null
            view()
        }
    } else {
        if (selected.x == king.zero.x && selected.y == king.zero.y) {
            king.zero.x = x
            king.zero.y = y
        } if (selected.x == king.one.x && selected.y == king.one.y) {
            king.one.x = x
            king.one.y = y
        }
        if (target.color == "blue") {
            unMarkAll()
            selected.x = null
            selected.y = null
            view()
        } if (target.color == "green" || target.color == "red") {
            if (target.color == "red" && target.have.type == "King") {
                if (turn == 0) {
                    alert("Gana el jugador Blanco")
                } else {
                    alert("Gana el jugador Negro")
                }
                reset()
                view()
            } else {
                target.have = board[selected.x][selected.y].have
                board[selected.x][selected.y].have = null
                unMarkAll()
                selected.x = null
                selected.y = null
                turn = (turn+1)%2
                view()
            }
        }
    }
}

//Desmarcar todo
function unMarkAll() {
    board.forEach(array => {
        array.forEach(slot => {
            slot.unmark()
        })
    })
}

function unMateAll() {
    board.forEach(array => {
        array.forEach(slot => {
            slot.mated = false
        })
    })
}

function reset() {
    for(i=0;i<64;i++) {
        board[Math.floor(i/8)][i%8].have = null
    }
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
    king.zero.x = 3
    king.zero.y = 0
    king.one.x = 4
    king.one.y = 7
    view()
} reset()