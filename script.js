
// Break things into small pieces as much as possible and test often (console.log() and error messages)
// small changes are easier to debug than building half your app and finding out you went astray somewhere

//Adds  Current Date
function updateDate() {
  const currentDateElement = document.getElementById('current-date');
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  currentDateElement.textContent = formattedDate;
}

updateDate();


//Shift Toggle
const shiftSelect = document.getElementById("shift-select");

shiftSelect.addEventListener("change", () => {
  const selectedValue = shiftSelect.value;
  const shiftText = selectedValue === "day" ? "Day" : "Night";
  shiftSelect.textContent = `Shift: ${shiftText}`;
})

// Pop up menu
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const menuPopup = document.getElementById("menu-popup");

    menuIcon.addEventListener("click", function () {
        if (menuPopup.style.display === "block") {
            menuPopup.style.display = "none";
        } else {
            menuPopup.style.display = "block";
        }
    });
    document.addEventListener("click", function (event) {
        if (!menuPopup.contains(event.target) && event.target !== menuIcon) {
            menuPopup.style.display = "none";
        }
    });
});

//Adds functionality to Bed links
document.addEventListener("DOMContentLoaded", function () {
  const bedLinks = document.querySelectorAll(".bed-link");
  const formFieldsets = document.querySelectorAll(".workload-form fieldset");

  bedLinks.forEach(function (bedLink) {
    bedLink.addEventListener("click", function () {
      formFieldsets.forEach(function (fieldset) {
        fieldset.style.display = "none";
      });
      formFieldsets[0].style.display = "block";
    })
  });
});


// Adds functionality to form tabs
const assess_collab_link = document.getElementById("assess-collab-tab");
const fieldsetAssessCollab = document.getElementById("assess-collab-form");

const basic_care_link = document.getElementById('basic-care-tab');
const fieldsetBasicCare = document.getElementById("basic-care-form");

const monitor_eval_link = document.getElementById("monitor-eval-tab");
const fieldsetMonitorEval = document.getElementById("monitor-eval-form");

const nurse_int_link = document.getElementById("nurse-int-tab");
const fieldsetNurseIntervention = document.getElementById("nurse-int-form");

const other_int_link = document.getElementById("other-int-tab");
const fieldsetOtherIntervention = document.getElementById("other-int-form");

// Grabs all form sections based on a shared classname
const allFormSections = Array.from(document.getElementsByClassName('fieldset'));

// Generic callback for showing discrete form sections based on the tab being clicked
const showFormSection = (formSectionToShow) => {
  if (!formSectionToShow) throw Error('Invalid HTML element provided as input')

  // Hides all form sections to start with
  allFormSections.forEach(formSection => formSection.classList.add('hidden'))

  // show only the form section specified as input
  formSectionToShow.classList.remove('hidden')
}

// shows related form section and hides all others
assess_collab_link.addEventListener('click', () => showFormSection(fieldsetAssessCollab));
basic_care_link.addEventListener('click', () => showFormSection(fieldsetBasicCare));
monitor_eval_link.addEventListener('click', () => showFormSection(fieldsetMonitorEval))
nurse_int_link.addEventListener('click', () => showFormSection(fieldsetNurseIntervention))
other_int_link.addEventListener('click', () => showFormSection(fieldsetOtherIntervention))


// ========================================================================
// TEST SUBMIT CODE WITH WORKLOAD VALUE ATTRIBUTE
// ========================================================================

//const enterBtn1 = document.getElementById('enter_btn');

//const assess_admit = document.getElementById('admit-assess');

//const meetings = document.getElementById('meetings');

// Testing for submission of checkbox with predefined workload-value attached to element
// test_btn.addEventListener('click', () => {
//   // NOTE: There is a string literal in the first return here, it allows us to render JS code directly in a string which cannot
//   // be done using normal single quotes ' ' 
//   if(assess_admit.checked) return console.log(`Added ${assess_admit.getAttribute('workload-value')} workload points to the total`);

//   else return console.log('no workload value is modified')
// })

const someValidationCallback = (input_value) => {
  if (!input_value) throw Error(`no input value provided`);

  if (typeof (input_value) !== 'number') return Number(input_value) ?? 0;

  // other filter conditions can be added here

  return input_value
}

// Generic callback for handling value extraction from any freeform workload value input
const handleExtractUniqueValue = (field_element) => {
  if (field_element?.value) {
    const input_points_value = someValidationCallback(field_element?.value)
    console.log(`${field_element.name} had ${input_points_value} entered, adding to workload points total`);
    return input_points_value
  } else {
    console.log(`no value entered in the ${field_element.name} input`)
    return undefined
  }
}

const meetings = document.getElementById("meetings");
const arrest = document.getElementById("arrest");
const complexdsg = document.getElementById("complexdsg")
const burn_care = document.getElementById("burn-care");
const transport = document.getElementById("transport")
const unplanned = document.getElementById("unplanned")

// combine all unique fields into an array so we can operate on them all as a group with the generic callback function above
const unique_fields_array = [
  meetings,
  arrest,
  complexdsg,
  burn_care,
  transport,
  unplanned
];



// document.getElementById(".workload-form").addEventListener("submit", function (e) { // Original Code
document.getElementById("workload-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Checks all checkbox elements with a 'workload-value' attribute
  // const checkboxes = document.querySelectorAll('input[type="checkbox"][workload-value]'); // Original code
  const checkboxes = document.querySelectorAll('[workload-value]');

  let workload_point_total = 0

  // CAUTION: Nesting event listeners can cause a lot of unexpected behaviour... consider that this event listener will only
  // get attached to our checkboxes when we submit the form, meaning interactions would be pointless until the form gets submitted for
  // the first time
  // checkboxes.forEach(function (checkbox) {
  //     checkbox.addEventListener("change", function () {
  //         if (checkbox.checked) {
  //             const workloadValue = (checkbox.getAttribute('workload-value'));
  //             // workload_point_total = workloadValue // This overwrites the total value with the field value each time
  //             console.log(`Added ${workloadValue} workload points. Total: ${workload_point_total}`);
  //         }
  //     })

  // Nesting quesry selectors can get very confusing, probably best to avoid this if you can
  // const form= document.querySelector(".workload-form");
  // form.addEventListener("submit", function (event) {
  //   e.preventDefault();
  // })
  // });

  //  totalize the inputs of all free form number input fields in the entirety of the form's fieldsets
  checkboxes.forEach(
    checkbox => {
      if (checkbox.checked) {
        const workloadValue = (Number(checkbox.getAttribute('workload-value')));
        workload_point_total = workload_point_total + workloadValue
        console.log(`Added ${workloadValue} workload points. Total: ${workload_point_total}`);
      }
    }
  )


  // totalize the inputs of all free form number input fields in the entirety of the form's fieldsets
  unique_fields_array.forEach(
    field_element => {
      const workload_value = handleExtractUniqueValue(field_element)
      if (workload_value) workload_point_total = workload_point_total + workload_value
    }
  )

  console.log('The form has a total score of: ', workload_point_total)

});

//Allows submit button to flow user into next fieldset
let currentFieldsetIndex = 0;
    const fieldsets = document.querySelectorAll('fieldset');

    function nextFieldset() {
        if (currentFieldsetIndex < fieldsets.length - 1) {
            fieldsets[currentFieldsetIndex].classList.add('hidden');
            currentFieldsetIndex++;
            fieldsets[currentFieldsetIndex].classList.remove('hidden');
        } else {
// If on the last fieldset, submit the form
            document.getElementById('workload-form').submit();
        }
    }

    //Display Total workload points in message
    const totalWorkloadElement = document.getElementById("total-workload");
    totalWorkloadElement.textContent = workload_point_total;

    //Thank you message
    const thankYouMessage = document.getElementById("thank-you-message");
    document.getElementById("thank-you-message").style.display = "block";







//const submit_btn = document.querySelector("submit_btn")

//submit_btn.addEventListener('click', () => { })




//Nurse Stat

//Total Tally Stat

//Menu Icon Functionality