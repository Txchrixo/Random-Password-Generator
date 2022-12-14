const lengthSlider =  document.querySelector(".pass-length input"),
countSpan = document.querySelector(".pass-length span"),
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".input-box span"),
passwordInput = document.querySelector(".input-box input"),
passIndicator = document.querySelector(".pass-indicator"),
generateBtn = document.querySelector(".generate-btn");

const characters = { //objects of letters, symbols & numbers
    lowercase : "abcdefghijklmnopqstuvwxyz",
    uppercase : "ABCDEFGHIJKLMNOPQSTUVWXYZ",
    numbers : "0123456789",
    symbols : "!$%&|[]():;.,*+-#@<>~"
}
const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

    options.forEach(option => { //looping through each option's checkbox
        if(option.checked){ //if checkbox is checked
            //if checkbox id isn't exc-duplicate & spaces
            if(option.id !== "exc-duplicate" && option.id !== "spaces"){
                //adding particular key value from character object to staticPassword
                staticPassword += characters[option.id];
            }
            if(option.id === "spaces"){ //if checkbox id is spaces
                staticPassword += `  ${staticPassword}  `; //adding space at the beginning & end of staticPassword
            }
            if(option.id === "exc-duplicate"){ //if checkbox id is exc-duplicate
                excludeDuplicate = true;
            }

        }
    })
    for (let i = 0; i < passLength; i++) {
        //getting random character from the static password
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate){//if excludeDuplicate is true
            //if randomPassword doesn't contains current random character or randomChar is equal
            //to space " " then add random character to randomPassword else decrement i by -1
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        }
        if(!excludeDuplicate){ //if excludeDuplicate is false
            //add random character to randomPassword
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword; //passing randomPassword to passwordInput value
}
const updatePassIndicator = () => {
    //if lengthSlider is less then 8 then pass "weak" as passIndicator id else if lengthSlider
    //value is les than 16 then pass "medium" as id else pass "strong" as id
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}
const copyPassword = () => {
    copyIcon.innerText == "copy_all" ? navigator.clipboard.writeText(passwordInput.value) : null; //copying random password
    copyIcon.innerText = "check"; //changing copy icon to tick
    setTimeout(() => { //after 1500 ms, changing tick icon back to copy
        copyIcon.innerText = "copy_all"; 
    }, 1500);
}
const updateSlider = () => {
    //passing slider value as counter text
    countSpan.innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
//init countSpan
updateSlider();

copyIcon.addEventListener('click', copyPassword);
lengthSlider.addEventListener('input', updateSlider);
generateBtn.addEventListener('click', generatePassword)