document.addEventListener('DOMContentLoaded', main);

function main() {
    header();
    resultBar();
    createTable();
    document.getElementById("ansBar").style.display = 'none';
}

(function (context) {
    var resultList = [],
        number = "",
        operator = "",
        result = "",
        pi = "",
        ans = "";

    function display(char) {
        var isResultListEmpty = resultList.length === 0;
        result = document.getElementById("displayBar")
        asnBar = document.getElementById("ansBar");
        if (ans !== "") {
            ansBar.style.display = 'block';
        }
        logic(char);
        displayTheResult(char);


    }

    function displayTheResult(char) {
        if (ans && resultList.length === 0 && number.length === 0 && operator.length === 0 && char === "=") {
            return result.innerText = ans;
        } else {

            return result.innerText = resultList.join("") + operator + number;
        }
    }


    function logic(char) {
        if (parseInt(char) == char) {
            itIsNumber(char);
        } else if (char === ".") {
            itIsDot(char);
        } else if (char !== "=" && char !== "AC" && char !== "π" && char !== "ANS") {
            itIsOperator(char);
        } else if (char === "π") {
            itIsPi(char);
        } else if (char === "=") {
            itIsEqual(char);

        } else if (char === "AC") {
            itIsClear(char);
        } else if (char === "ANS") {
            resultList.push(operator);
            operator = "";
            number = ans;
        }

    }
    function itIsNumber(char) {
        if (operator) {
            resultList.push(operator);
            operator = "";
        }
        if (char == "0" && number.indexOf("0") === 0) {
            if (number.length >= 2) {
                number += char;
            }

        } else if (resultList[resultList.length - 1] === "π") {
            resultList.push("*");
            number += char;
        } else {
            number += char;

        }
    }
    function itIsDot(char) {
        if (char == ".") {
            if (operator) {
                resultList.push(operator);
                operator = "";
            }
            if (number.length === 0 && resultList[resultList.length - 1] !== "π") {
                number = "0.";
                return;

            }
            if (number.indexOf(".") === -1) {
                number += ".";
            }
        }
    }
    function itIsOperator(char) {
        if (number) {
            if (number === "0.") {
                resultList.push("0");
                number = "";
                operator = char;
            } else {
                resultList.push(number);
                number = "";
                operator = char;
            }
        }


    }
    function itIsEqual(char) {
        resultList.push(number)
        operator = "";
        pi = (resultList[0] === "π") ? (pi = Math.PI.toString()) : ("*" + Math.PI.toString());
        ans = [eval(resultList.join("").replace(/π/g, pi))];
        ansBar.innerText = "ANS = " + ans;
        ansBar.style.display = "block";
        number = "";
        resultList = [];
        operator = "";
    }
    function itIsClear(char) {
        resultList = [];
        operator = "";
        number = "";
        result.value = "";
    }
    function itIsPi(char) {
        var last = resultList.length - 1;

        if (resultList.length === 0 && number.length === 0) {
            resultList.push("π");
        } else {
            if (operator) {
                resultList.push(operator);
                resultList.push("π");
                operator = "";
            }
            else if (number && number.indexOf("π") === -1) {
                if (number === "0.") {
                    resultList.push("0")
                    resultList.push("*");
                    resultList.push("π");
                    number = "";
                } else {

                    resultList.push(number);
                    resultList.push("π");
                    number = "";
                }
            } else {
                resultList.push("*");
                resultList.push("π");

            }
        }



    }
    context.display = display;
})(window);


function actionButton(char) {
    var actionButtons = ["AC", "=", "+", "-", "/", "%", "*"];
    return actionButtons.indexOf(char) >= 0;

}



function header() {
    var headerType, text, clas, classOfHeader, onclick;

    headerType = document.createElement("h1");
    text = document.createTextNode("Calculator");
    classOfHeader = document.createAttribute("class");
    classOfHeader.value = "header-title";
    headerType.setAttributeNode(classOfHeader);
    headerType.appendChild(text);
    document.body.appendChild(headerType);
}

function resultBar() {
    var result,
        disabled,
        resultID;
    ansBar = document.createElement("div");
    ansID = document.createAttribute("id");
    ansID.value = "ansBar";
    ansBar.setAttributeNode(ansID);
    document.body.appendChild(ansBar);


    result = document.createElement("div");
    resultID = document.createAttribute("id");
    resultID.value = "displayBar";
    result.setAttributeNode(resultID);
    document.body.appendChild(result);
}

function createTable() {
    var layout = getLayout(),
        len = layout.length,
        i = 0,
        table, row, column, button, text, j, onclick;

    table = document.createElement("table");
    for (; i < len; i++) {
        row = document.createElement("tr");
        for (j = 0; j < layout[i].length; j++) {
            column = document.createElement("td");
            button = document.createElement("button");
            onclick = document.createAttribute("onclick");
            onclick.value = "onClick(" + "'" + layout[i][j] + "'" + ")";
            buttonClass = document.createAttribute("class");
            buttonClass.value = addClassToButton(layout[i][j]);
            button.setAttributeNode(buttonClass);
            button.setAttributeNode(onclick);
            button.innerHTML = layout[i][j];
            column.appendChild(button);
            row.appendChild(column);

        }
        table.appendChild(row);

    }
    border = document.createElement("div");
    border.appendChild(document.getElementById("ansBar"));
    border.appendChild(document.getElementById("displayBar"));
    border.appendChild(table);
    borderID = document.createAttribute("id");
    borderID.value = "border";
    border.setAttributeNode(borderID);
    document.body.appendChild(border);
}

function onClick(char) {
    display(char);
}
function addClassToButton(number) {
    numbers = numberButtons();
    if (numbers.indexOf(number) == -1) {
        return "operator";
    } else {
        return "number";
    }
}

function numberButtons() {
    var numberButtons = [],
        firstNumber = 0,
        lastNumber = 10;
    for (firstNumber; firstNumber < lastNumber; firstNumber++) {
        numberButtons.push(firstNumber.toString());
    }
    return numberButtons;
}

function getLayout() {
    return [
        ["AC", "π", "%", "/"],
        ["7", "8", "9", "*"],
        ["4", "5", "6", "-"],
        ["1", "2", "3", "+"],
        ["0", "ANS", ".", "=",]
    ];
}




