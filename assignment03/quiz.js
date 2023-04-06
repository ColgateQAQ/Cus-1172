var name = '';
var number = 1;
var score = 0;
var rigthAnswer = 1;
var question = "";
var answerList = [];

function showQuestion() {

    var address = "https://my-json-server.typicode.com/ColgateQAQ/Cus-1172/questionList?id=" + number;
    fetch(address).then(response => response.json())
        .then(data => {
            rigthAnswer = data[0].rigthAnswer;
            question = data[0].question;
            answerList = data[0].answerList;
            document.getElementById("score").textContent = "Score: "+score;
            document.getElementById("number").textContent = "Q" + number;
            document.getElementById("question").textContent = question;
            console.log(answerList);
            console.log(answerList.length);
            for (var i = 0; i < answerList.length; i++) {
                document.getElementById("label" + (i+1)).textContent = answerList[i];
            }
            number = number + 1;
});
}

function startTest() {
    name = document.getElementById("name").value;
    if (name == '') {
        alert('please insert your name！');
        return;
    }
    document.getElementById("login").style.display = "none";
    document.getElementById("quizView").style.display = "block";
    showQuestion();
}

function sub() {
    var answerList = document.getElementsByName("answer");
    var answer = 0;
    for (var i = 0; i < answerList.length; i++) {
        if (answerList[i].checked){
            answer = answerList[i].value;
        }

    }

    if (answer == rigthAnswer){
        score = score + 1;
    }

    if (number > 20){
        showResult();
    }else {
        showQuestion();
    }
}

function showResult() {
    document.getElementById("quizView").style.display = "none";
    document.getElementById("resultView").style.display = "block";

    document.getElementById("student").textContent = name;
    document.getElementById("finileScore").textContent = score;

    if (score >= 16){
        document.getElementById("message").textContent = "Congratulations " +  name + "! You pass the quiz";
    }else {
        document.getElementById("message").textContent = "Sorry " +  name + ", you fail the quiz";
    }

}