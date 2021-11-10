document.getElementById("form-bill").addEventListener("change", formatFormBill);

document.getElementsByName("select-tip-radio").forEach(element => element.addEventListener("focus", resetCustomTipValue));
document.getElementsByName("select-tip-radio").forEach(element => element.addEventListener("change", updateResult));

document.getElementById("tip-custom-input").addEventListener("focus", resetTipPercantageRadioGroup);
document.getElementById("tip-custom-input").addEventListener("change", updateResult);

document.getElementById("form-people").addEventListener("change", updateResult);


function updateResult() {
	if (document.getElementById("form-bill").value == "") {
		resetResults();
		return;
	}
	const billInputValue = document.getElementById("form-bill").value; 
	const tipPercentage = getTipPercentage();
	const noOfPeople = getNumberOfPeople();
	console.log(billInputValue, tipPercentage, noOfPeople);
	document.getElementById("total-per-person").innerHTML = '$' + (Math.ceil(billInputValue*(1 + tipPercentage/100)/noOfPeople*100)/100).toFixed(2);
	document.getElementById("tip-per-person").innerHTML = '$' + (Math.ceil(billInputValue*tipPercentage/noOfPeople)/100).toFixed(2);
	
	
}

function formatFormBill() {
	const billInput = document.getElementById("form-bill");
	if (billInput.value == "" || billInput.value == NaN || billInput.value < 0) {billInput.value = 0;}
	billInput.value = (Math.floor(billInput.value * 100) / 100).toFixed(2);
	updateResult();
	//tipAmount.style.color = "blue";
}

function getTipPercentage() {
	
	const customTipValue = document.getElementById("tip-custom-input").value;
	if (customTipValue != "") return customTipValue;
	
	const tipPercentageFromRadioGroup = document.querySelector('input[name="select-tip-radio"]:checked');
	if (tipPercentageFromRadioGroup === null) return 0;
	
	return tipPercentageFromRadioGroup.value;
}

//should I check for null if it's my code and not an argument?
function resetTipPercantageRadioGroup() {
	const tipPercentageFromRadioGroup = document.querySelector('input[name="select-tip-radio"]:checked');
	if (tipPercentageFromRadioGroup === null) return;
	tipPercentageFromRadioGroup.checked = false;		
}

function resetCustomTipValue() {
	customTipInput = document.getElementById("tip-custom-input").value = "";
}

function getNumberOfPeople() {
	const numberOfPeople = document.getElementById("form-people").value;
	if (numberOfPeople != "") return numberOfPeople;
	return 1;
}

function resetResults() {
	document.getElementById("tip-per-person").content = "$0.00";
	document.getElementById("total-per-person").content = "$0.00";
}

function resetForm() {
	//TODO
}

//validate input in custom tip and number of people numbers
//e and dot problem