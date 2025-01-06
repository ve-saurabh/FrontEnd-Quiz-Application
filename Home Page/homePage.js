// Retrieve stored data for all users and current user
let allusers = JSON.parse(localStorage.getItem("allusers"));
console.log(allusers);

let currentuser = JSON.parse(localStorage.getItem("currentuser"));
console.log(currentuser);

// Display current user's full name
let fname = document.getElementById('fname');
fname.innerText = currentuser.FullName;

// Initialize section and question number display
let sectionname = document.getElementById('sectionname');
let section = "HTML";
sectionname.innerHTML = section;

let qnumber = document.getElementById('qnumber');
let count = 1;
qnumber.innerHTML = `Question number: ${count}/30`;

// Handle exit button click event
let exitbtn = document.getElementById('exitbtn');
exitbtn.addEventListener('click', () => {
    let result = confirm('Are you sure you want to exit?');
    if (result) {
        location.href = "../Registration Page/RegistrationPage.html";
    }
});

// Initialize variables for quiz
let questionIndexNumber = 0;
let totalScore = 0;
let result;
let question = document.getElementById('ques');
let options = document.getElementsByClassName('options');

// Fetch quiz data from JSON file  
fetch('./data.json')
    .then(res => res.json())
    .then(res => {
        result = res;
        displayData(result);
    })
    .catch(() => console.log('Failed to fetch data'));

// Function to display the current question and options
let displayData = result => {
    console.log(result);
    question.innerHTML = `${result[questionIndexNumber].id}. ${result[questionIndexNumber].question}`;
    for (let i = 0; i < options.length; i++) {
        options[i].style.backgroundColor = '';
        options[i].innerText = result[questionIndexNumber].options[i];
    }
}

// Function to check the user's answer
let CheckAnswer = (result, index) => {
    if (index == result[questionIndexNumber].answer) {
        totalScore++;
        options[index].style.backgroundColor = 'green';
    } else {
        options[index].style.backgroundColor = 'red';
    }

    setTimeout(() => {
        questionIndexNumber++;
        if (questionIndexNumber < result.length) {
            displayData(result);
            count++;
            qnumber.innerHTML = `Question number: ${count}/30`;

            // Update section based on question count
            if (count > 10 && count <= 20) {
                sectionname.innerText = "CSS";
            } else if (count > 20 && count <= 30) {
                sectionname.innerText = "JavaScript";
            }
        }
        if(questionIndexNumber == result.length){
            alert(`your quiz is completed.Your total score is ${totalScore}`);
        }
    }, 1000);
}

// Add click event listener to options for answer selection
for (let i = 0; i < options.length; i++) {
    options[i].addEventListener('click', () => {
        CheckAnswer(result, i);
    });
}

