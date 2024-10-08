let game_btns = document.querySelectorAll(".game_btn");
let win = document.querySelector("#win");
let wintitle = document.querySelector("#winningtitle");
let heading = document.querySelector("#main_heading");
let dispturn = document.querySelector("#turn");
let modebtn = document.querySelector("#mode");
let reset_btns = document.querySelectorAll(".new_game");
let winning_patterns = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]];
let body = document.querySelector("body");
let turn = 'X';
let moves=0;
game_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        moves++;
        if (turn == 'X') {
            btn.innerText = "X";
            turn = 'O';
        }
        else {
            btn.innerText = "O";
            turn = 'X';
        }
        dispturn.innerText = `TURN: ${turn}`;
        btn.style.backgroundColor = "White";
        btn.disabled = true;
        checkwinner(winning_patterns);
        if(moves>=9) game_over("draw");
    })
})
reset_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        reset();
    })
})
modebtn.addEventListener("click", () => {
    if (body.className == "light") {
        body.classList.add("dark");
        body.classList.remove("light");
        modebtn.innerHTML='<i class="fa-solid fa-sun"></i>';
    }
    else {
        body.classList.remove("dark");
        body.classList.add("light");
        modebtn.innerHTML='<i class="fa-solid fa-moon"></i>';
    }
})
function checkwinner(winning_patterns) {
    winning_patterns.forEach((pattern) => {
        let check = 1;
        for (let i = 0; i < 3; i++) {
            if (game_btns[pattern[i]].innerText == "") {
                check = 0;
                break;
            }
        }
        if (check) {
            if ((game_btns[pattern[0]].innerText == game_btns[pattern[1]].innerText) && (game_btns[pattern[1]].innerText == game_btns[pattern[2]].innerText)){
                game_over("win");
                game_btns[pattern[0]].style.color="green";
                game_btns[pattern[1]].style.color="green";
                game_btns[pattern[2]].style.color="green";
            }
        }
    })
}
function game_over(verdict) {
    game_btns.forEach((btn) => {
        btn.disabled = true;
    })
    heading.style.marginBottom = "70px";
    win.style.display = "inline-block";
    if (turn == 'X') turn = 'O';
    else turn = 'X';
    if(verdict=="win") wintitle.innerText = `WINNER : ${turn}`;
    else if(verdict=="draw") wintitle.innerText = "DRAW";
}
function reset() {
    game_btns.forEach((btn) => {
        btn.disabled = false;
        btn.innerHTML = "";
        btn.style.backgroundColor = "";
        btn.style.color="";
    })
    turn='X';
    dispturn.innerHTML = "TURN: X";
    win.style.display = "None";
    moves=0;
}
