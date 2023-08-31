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
 const button1 = document.querySelector(".fieldset1");
 const fieldsetAssessCollab = document.querySelector(".assess-collab");

 button1.addEventListener('click', () => {
   fieldsetAssessCollab.classList.toggle("hidden");
 })


 const button2 = document.querySelector('.fieldset2');
 const fieldsetBasicCare = document.querySelector(".basic-care");

 button2.addEventListener('click', () => {
   fieldsetBasiccare.classList.toggle("hidden");
 })

 const button3 = document.querySelector(".fieldset3");
 const fieldsetMonitorEval = document.querySelector(".monitor-eval");

 button3.addEventListener('click', () => {
   fieldsetMonitorEval.classList.toggle("hidden");
 })

 const button4 = document.querySelector(".fieldset4");
 const fieldsetNurseIntervention = document.querySelector(".nurse-intervention");

 button4.addEventListener('click', () => {
   fieldsetNurseIntervention.classList.toggle("hidden");
 })


 const button5 = document.querySelector(".fieldset5");
 const fieldsetOtherIntervention = document.querySelector(".other-intervention");

 button5.addEventListener('click', () => {
   fieldsetOtherIntervention.classList.toggle("hidden");
 })
