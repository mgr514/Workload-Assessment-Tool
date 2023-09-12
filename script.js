
// Break things into small pieces as much as possible and test often (console.log() and error messages)
// small changes are easier to debug than building half your app and finding out you went astray somewhere


// Pop up menu
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const menuPopup = document.getElementById("menu-popup");

    const hidePopup = () =>
    {
        menuPopup.style.display = "none";

        // Remove the event listener from the body to listen for clicks outisde the Popup
        document.body.removeEventListener('click', event => clickOutsidePopup(event))
    }

    const clickOutsidePopup = event =>
    {
      // Hides the Popup if the clicked element isn't the Popup itself
      // or part of the menuIcon element used to open the Popup
      if (!menuPopup.contains(event.target) && !menuIcon.contains(event.target)) {
        hidePopup()
      }
    }

    menuIcon.addEventListener("click", function () {
        if (menuPopup.style.display !== "block") {
            console.log('show popup')
            menuPopup.style.display = "block";
            // Attach event listener to close the Popup if a click occurs outside of it
            document.body.addEventListener("click", event => clickOutsidePopup(event))
        }
    });
});

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
  const selectedOption = shiftSelect.options[shiftSelect.selectedIndex];
  const selectedValue = selectedOption.value;
  const shiftText = selectedValue === "day" ? "Day" : "Night";
  selectedOption.textContent = shiftText;
});

const bedLinks = document.querySelectorAll('.bed-link');
//Adds functionality to Bed links
document.addEventListener("DOMContentLoaded", function () {

    bedLinks.forEach(function (bedLink) {
        bedLink.addEventListener("click", function () {
            // Remove the "active" class from all bed links
            bedLinks.forEach(function (link) {
                link.classList.remove("active");
            });

            // Add the "active" class to the clicked bed link
            bedLink.classList.add("active");
        });
    });
});
//Active class is working in the console log, it is registering the click. But no change appears.


// Get the assess-collab-form fieldset
const assessCollabForm = document.getElementById('assess-collab-form');
// Open first form fieldset when bed-link clicked
bedLinks.forEach((bedLink, index) => {
  bedLink.addEventListener('click', () => {
    assessCollabForm.setAttribute('id', `Bed ${index + 1}`);
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
const showFormSection = (formSectionToShow, tabElement) => {
  if (!formSectionToShow || !tabElement) throw Error('Invalid HTML element provided as input')

  // Hides all form sections to start with
  allFormSections.forEach(formSection => formSection.classList.add('hidden'));

  // show only the form section specified as input
  formSectionToShow.classList.remove('hidden');

  tabElement.classList.add('active-tab');
}

// shows related form section and hides all others
assess_collab_link.addEventListener('click', () => showFormSection(fieldsetAssessCollab, assess_collab_link));
basic_care_link.addEventListener('click', () => showFormSection(fieldsetBasicCare, basic_care_link));
monitor_eval_link.addEventListener('click', () => showFormSection(fieldsetMonitorEval, monitor_eval_link))
nurse_int_link.addEventListener('click', () => showFormSection(fieldsetNurseIntervention, nurse_int_link))
other_int_link.addEventListener('click', () => showFormSection(fieldsetOtherIntervention, other_int_link))


const someValidationCallback = (input_value) => {
  if (!input_value) throw Error(`no input value provided`);

  if (typeof (input_value) !== 'number') return Number(input_value) ?? 0;

  // other filter conditions can be added here

  return input_value
}

//Allows submit button to flow user into next fieldset
let currentFieldsetIndex = 0;
const fieldsets = document.querySelectorAll('fieldset');
let submittedFieldsets = 0;

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

let workload_point_total = 0

document.getElementById("workload-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Checks all checkbox elements with a 'workload-value' attribute
  const checkboxes = document.querySelectorAll('[workload-value]');

  //  totalize the inputs of all free form number input fields in the entirety of the form's fieldsets
  checkboxes.forEach(
    checkbox => {
      if (checkbox.checked) {
        const workloadValue = (Number(checkbox.getAttribute('workload-value')));
        workload_point_total = workload_point_total + workloadValue
        console.log(`Added ${workloadValue} workload points. Total: ${workload_point_total}`);
      }
    });


  // totalize the inputs of all free form number input fields in the entirety of the form's fieldsets
  unique_fields_array.forEach(
    field_element => {
      const workload_value = handleExtractUniqueValue(field_element)
      if (workload_value) workload_point_total = workload_point_total + workload_value
    });

  console.log('The form has a total score of: ', workload_point_total)

  submittedFieldsets++; // Increment the variable for each submitted fieldset

  if (submittedFieldsets === fieldsets.length) {
  //Thank you message
    const thankYouMessage = document.getElementById("thank-you-message");
    thankYouMessage.style.display = "block";
               
    const formElement = document. getElementById("workload-form");
    formElement.style.display = "none";
  

    //Display Total workload points in message
    const totalWorkloadElement = document.getElementById("total-workload");
    totalWorkloadElement.textContent = workload_point_total;
  }
});


//LOCAL STORAGE
function saveDataToLocalStorage() {
    // Get the selected bed, shift, and nurses
    const selectedBed = document.querySelector('.bed-link.active').textContent;
    const selectedShift = document.getElementById('shift-select').value;
    const numberOfNurses = parseFloat(document.getElementById('nurses').value);

    //Get value from checkboxes
    const checkboxes = document.querySelectorAll('[workload-value]');
    const workloadValues = {};
    checkboxes.forEach(checkbox => {
      const name = checkbox.getAttribute('workload-value');
      const value = checkbox.checked;
      workloadValues[name] = value;
    });
  
//Create array
    const dataToSave = {
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        shift: selectedShift,
        bed: selectedBed,
        workloadValues: workloadValues,
        numberOfNurses: numberOfNurses,
        meetings: meetingsValue,
        arrest: arrestValue,
        complexdsg: complexdsgValue,
        burnCare: burnCareValue,
        transport: transportValue,
        unplanned: unplannedValue,
      };
    
      // Generate a unique key for this data entry
      const localStorageKey = `${selectedBed}-${selectedShift}-${new Date().getTime()}`;
    
      // Save the data to Local Storage
      localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
    }
    
    // You can call this function when you want to save the data, for example, when submitting the form
    document.getElementById('submit-button').addEventListener('click', saveDataToLocalStorage);  


//Since adding the local storage function the form is not corresponding to the tabs

//preferably autosave select values for each bed and repopulate for next user to minimize burden
//however I believe there will be issues with that idea in practicality (would need to code only certain selections to autosave)

//Populate total tally stat for header bar

//What will we do about the data page? create dummy content? get rid of it for now?

