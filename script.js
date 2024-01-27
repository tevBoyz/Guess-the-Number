var mytable = document.getElementById("table_history").getElementsByTagName('tbody')[0];
var mydisplay = document.getElementById("screen");
var correct_nums = document.getElementById("correct_numbers");
var correct_pos = document.getElementById("correct_position");
var curr_num;
let res = [-1, -1, -1];


var num_to_Guess = random4Digit();
// var num_to_Guess = 2134;

var input = document.getElementById("new_number");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    check();
  }
});


function addRow(number, cn, cp){
    var new_content = "<tr> <td>"+ number +"</td> <td>"+ cn +"</td> <td>"+ cp + "</td> </tr>";
    var new_row = mytable.insertRow(mytable.rows.length);
    new_row.innerHTML = new_content;
}

function displayOnDisplay(num, cn, cp){
    mydisplay.innerHTML = (num);
    correct_nums.innerHTML = "Correct Numbers: " + cn;
    correct_pos.innerHTML = "Correct Positions: " + cp;
}

function compare(guessed_num){
    res = [0, 4, 4];
    if(guessed_num == num_to_Guess){
        res[0] = 1;
    }
    else{
        let g = String(guessed_num).split('').map(Number);
        let an = String(num_to_Guess).split('').map(Number);

        res[0] = 0;
        res[1] = getCorrectPosCount(g, an);
        res[2] = getRightNums(g, an);
    }
}


function check(){
    console.log(num_to_Guess);
    curr_num = document.getElementById("new_number").value;
    if (curr_num >= 1000 && curr_num <= 9999){
        document.getElementById("new_number").classList.remove("red")
        compare(curr_num);
        if (res[0] == 0){
            displayOnDisplay(curr_num, res[2], res[1]);
            addRow(curr_num, res[2], res[1]);
            curr_num = document.getElementById("new_number").value = "";
        document.getElementById("new_number").focus();
        }
        else{
            displayOnDisplay(curr_num, res[2], res[1]);
            addRow(curr_num, res[2], res[1]);
            document.getElementById("container").style.display = "none";
            document.getElementById("congrats").style.display = "flex";
            document.getElementById("corres").innerHTML = curr_num;
        }
    }
    else{
        alert('Please enter exactly 4 digits. No Zeroes, No repititions');
        curr_num = document.getElementById("new_number").value = "";
        document.getElementById("new_number").focus();
    }
}

function getCorrectPosCount(guessed, answer){
    let count = 0;
    for(let i = 0; i < 4; i++){
        if(guessed[i] == answer[i])
            count++;
    }
    return count;
}


function back(){
    document.getElementById("container").style.display = "flex";
    document.getElementById("congrats").style.display = "none";
}

function restart(){
    location.reload();
}


function getRightNums(guessed, answer){
    let count = 0;
    let gotNums = [];
    for(let i = 0; i < 4; i++){
        if ((answer.indexOf(guessed[i]) !== -1) && (gotNums.indexOf(guessed[i]) == -1))
        { 
            count++;
            gotNums.push(guessed[i]);
        }
    }
    return count;
}


function validateInput() {
    const input = document.getElementById('new_number');
    const value = input.value;

    if (value.length > 4 || isNaN(value)) {
      alert('Please enter exactly 4 digits. No Zeroes, No repititions');
      input.value = '';
    }
  }

  function random4Digit(){
    return shuffle( "123456789".split('') ).join('').substring(0,4);
  }
  
  function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }
  
