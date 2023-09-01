// No worries on being light on JS for now, the main 2 things I think you can start with will be:
// 1. Handling the change between form tabs using JS (click event triggers CSS changes to switch displayed content)
// 2. Adding a button to 'save form' which will pull the data into LocalStorage for persistence

// Both of these rely heavily on HTML infrastructure being built so that is still your first priority!

// Break things into small pieces as much as possible and test often (console.log() and error messages)
// small changes are easier to debug than building half your app and finding out you went astray somewhere

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


 //Adds  Current Date
 function updateDate() {
    const currentDateElement = document.getElementById('current-date');
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        
        currentDateElement.textContent = formattedDate;
 }

 updateDate();

// ========================================================================
// TEST SUBMIT CODE WITH WORKLOAD VALUE ATTRIBUTE
// ========================================================================

const test_btn = document.getElementById('test_btn');

const assess_admit = document.getElementById('admit-assess');

const meetings = document.getElementById('meetings');

// Testing for submission of checkbox with predefined workload-value attached to element
// test_btn.addEventListener('click', () => {
//   // NOTE: There is a string literal in the first return here, it allows us to render JS code directly in a string which cannot
//   // be done using normal single quotes ' ' 
//   if(assess_admit.checked) return console.log(`Added ${assess_admit.getAttribute('workload-value')} workload points to the total`);

//   else return console.log('no workload value is modified')
// })


const someValidationCallback = (input_value) => {
  if (!input_value) throw Error(`no input value provided`);

  if (typeof (input_value) !== 'number') throw Error(`Input value of ${input_value} is not valid as a number`)

  // other filter conditions can be added here

  return input_value
}


let workload_point_total = 0

// Testing for submission of freeform number input w/ no predetermine workload-value attached
test_btn.addEventListener('click', () => {
  // NOTE: There is a string literal in the first return here, it allows us to render JS code directly in a string which cannot
  // be done using normal single quotes ' ' 
  if (meetings.value) {
    const input_points_value = someValidationCallback(meetings.value)
    workload_point_total = workload_point_total + input_points_value
    return console.log(`Added ${meetings.value} workload points to the total`, `workload point total = ${workload_point_total}`);
  }

  else return console.log('no value entered in the meetings input')
})

