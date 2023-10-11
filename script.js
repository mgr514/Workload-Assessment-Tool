//no validation message for nurse field
//issue with data storage



///////////////// GLOBALS FOR QUERY SELECTORS /////////////////////////////
const thankYouMessage = document.getElementById("thank-you-message");
const messageContainer = document.getElementById("message-container")
const formElement = document.getElementById("workload-form")
const nurseInput = document.querySelector('#nurses');
const bedLinks = document.querySelectorAll('.bed-link');
const fieldsets = document.querySelectorAll('.workload-form');
const formFieldset = document.querySelectorAll('fieldset')

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

const meetings = document.getElementById("meetings");
const arrest = document.getElementById("arrest");
const complexdsg = document.getElementById("complexdsg");
const burn_care = document.getElementById("burn-care");
const transport = document.getElementById("transport");
const unplanned = document.getElementById("unplanned");

const summaryElement = document.getElementById('summary');



/////////////////////// Pop up menu////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menu-icon");
  const menuPopup = document.getElementById("menu-popup");

  const hidePopup = () => {
    menuPopup.style.display = "none";

    // Remove the event listener from the body to listen for clicks outisde the Popup
    document.body.removeEventListener('click', event => clickOutsidePopup(event))
  }

  const clickOutsidePopup = event => {
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


///////////////////Adds  Current Date////////////////////////////////////////
function updateDate() {
  const currentDateElement = document.getElementById('current-date');
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  currentDateElement.textContent = formattedDate;
}

updateDate();


///////////////////////Shift Toggle///////////////////////////////////////////
const shiftSelect = document.getElementById("shift-select");

shiftSelect.addEventListener("change", () => {
  const selectedOption = shiftSelect.options[shiftSelect.selectedIndex];
  const selectedValue = selectedOption.value;
  const shiftText = selectedValue === "day" ? "Day" : "Night";
  selectedOption.textContent = shiftText;
});


////////////////////Adds functionality to Bed links///////////////////////////////
document.addEventListener("DOMContentLoaded", function () {

  bedLinks.forEach(function (bedLink) {
    bedLink.addEventListener("click", function () {
      // Remove the "active" class from all bed links
      bedLinks.forEach(function (link) {
        link.classList.remove("active");
      });

      if (thankYouMessage.style.display === 'block') {
        showForm();
        // TODO: Show form submission summary for current bed if already submitted
      }
      // Add the "active" class to the clicked bed link
      bedLink.classList.add("active");
    });
  });
});


////////////////////// Adds functionality to form tabs//////////////////////////////
const allFormTabs = [
  assess_collab_link,
  basic_care_link,
  monitor_eval_link,
  nurse_int_link,
  other_int_link
]

// Grabs all form sections based on a shared classname
const allFormSections = Array.from(document.getElementsByClassName('fieldset'));

// Generic callback for showing discrete form sections based on the tab being clicked
const showFormSection = (formSectionToShow, tabElement) => {

  if (!formSectionToShow || !tabElement) throw Error('Invalid HTML element provided as input')

  // Hides all form sections to start with
  allFormSections.forEach(formSection => {
    formSection.classList.add('hidden')
  });

  // show only the form section specified as input
  formSectionToShow.classList.remove('hidden');

  allFormTabs.forEach(
    (formTabElement) => {
      formTabElement.classList.remove('active-tab')
      if (formTabElement === tabElement) {
        formTabElement.classList.add('active-tab')
      }
    });
}

document.addEventListener('DOMContentLoaded', showFormSection(fieldsetAssessCollab, assess_collab_link))

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

// Get the assess-collab-form fieldset
const assessCollabForm = document.getElementById('assess-collab-form');
// Function to populate assess-collab-form based on the clicked link
function populateAssessCollabForm(index) {
  bedLinks.forEach((bedLink, index) => {
    bedLink.addEventListener('click', () => {
      populateAssessCollabForm(index);
    });
  });
}


////////////////////// Value Extractions //////////////////////////
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


// combine all unique fields into an array so we can operate on them all as a group with the generic callback function above
const unique_fields_array = [
  meetings,
  arrest,
  complexdsg,
  burn_care,
  transport,
  unplanned
];

let workload_point_total = 0;
letsubmittedFieldsets = 0;

// Function to update the total workload tally in HTML
function updateTotalWorkloadTally() {
  const totalTallyParagraph = document.querySelector("#points-total");
  totalTallyParagraph.textContent = `Total Tally: ${workload_point_total}`;
}

// Function to calculate total workload points
function calculateWorkloadPoints() {
  // Reset total workload points
  workload_point_total = 0;

  // Checks all checkbox elements with a 'workload-value' attribute
  const checkboxes = document.querySelectorAll('[workload-value]');

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const workloadValue = Number(checkbox.getAttribute('workload-value'));
      workload_point_total += workloadValue;
    }
  });
  // Totalize the inputs of all free form number input fields in the unique fields array
  unique_fields_array.forEach(field_element => {
    const workload_value = handleExtractUniqueValue(field_element);
    if (workload_value) workload_point_total += workload_value;
  });
  updateTotalWorkloadTally();

  console.log('The form has a total score of: ', workload_point_total);
}

// Function to show message container
function showMessageContainer() {
  messageContainer.style.display = "block";
  formElement.style.display = "none";

  // Display Total workload points in message
  const totalWorkloadElement = document.getElementById("total-workload");
  totalWorkloadElement.textContent = `${workload_point_total}`;
}

////////////////////// Summary /////////////////////////////////////////////////
function summarizeFormInputs() {
    // Initialize variables to store the summary and total workload
    let summary = "";
    let totalWorkload = 0;

    // Iterate through each fieldset (assuming each fieldset corresponds to a tab)
    fieldsets.forEach(fieldset => {
        // Iterate through each input element within the fieldset
        const inputs = fieldset.querySelectorAll('input[type="checkbox"]:checked, input[type="number"]');
        inputs.forEach(input => {
            // Guard cluase to prevent rendering of empty number inputs
            if (input.type === 'number' && !input.value ) return null

            const workloadValue = parseInt(input.getAttribute('workload-value')) || 0;
            totalWorkload += workloadValue;

            const labelText = fieldset.querySelector(`label[for="${input.id}"]`).textContent;
            let inputValue = "";

            if (input.type === "checkbox") {
                inputValue = `${workloadValue} points`;
            } else if (input.type === "number") {
                inputValue = `${input.value} points`;
            }

       // Check if the inputValue is not empty before appending it to the summary
       if (inputValue !== "") {
        // Append the input summary to the summary variable
        summary += `<li>${labelText}: ${inputValue}</li>`;
    }
});
});
    // Create the title for the summary
    const title = "Input Summary";

    // Update the summary div with the generated summary text and title
    summaryElement.innerHTML = `<h2>${title}</h2><ul>${summary}</ul>`;
}

//Function show form and hide message container
function showForm() {
  messageContainer.style.display = "none";

  const formElement = document.getElementById("workload-form");
  formElement.style.display = "block";
}

//Function hide form and show message container
function hideForm() {
  messageContainer.style.display = "block";

  const formElement = document.getElementById("workload-form");
  formElement.style.display = "none";
}

// Function to hide the  message container
function hideMessageContainer() {
  if (messageContainer) {
    messageContainer.classList.add('hidden');
  }
}

// ====================================================================================================
// Click Handlers
// ====================================================================================================

//Allows submit button to flow user into next fieldset
let submittedFieldsets = 0;
let meetingsValue = 0
let arrestValue = 0
let complexdsgValue = 0
let burnCareValue = 0
let transportValue = 0
let unplannedValue = 0

// Global variable for tracking the array index of the current form tab
let currentFieldsetIndex = 0;

// const allFormTabs = document.querySelectorAll('.form-tabs');

// Checks current fieldset index and jumps to next section
function nextFieldset() {
  if (currentFieldsetIndex < 4) {
    fieldsets[currentFieldsetIndex].classList.add('hidden');
    allFormTabs.forEach(element => element.classList.remove('active-tab'))
    currentFieldsetIndex++;
    fieldsets[currentFieldsetIndex].classList.remove('hidden');
    allFormTabs[currentFieldsetIndex]?.classList.add('active-tab');
  }
  else {
    fieldsets[currentFieldsetIndex].classList.remove('hidden');
  }
}

document.getElementById('submit-button').addEventListener(
  'click',
  (event) => handleButtonClick(event)
)

//Callback handler to determine whether to submit the form or show the next section
const handleButtonClick = (event) => 
{
  // Prevent default form subission behaviour from DOM
  event.preventDefault();

  console.log('submit clicked')

  // check current fieldset from querySelector, sets the index if a match is found
  allFormTabs.find(
    (formTabElement, index) => {
      if (formTabElement?.classList.contains('active-tab')) {
        currentFieldsetIndex = index
        return formTabElement;
      }
    }
  )

  // Check current fieldset and either submit form OR cycle to next field set
  if (currentFieldsetIndex == 4) {
    //handle submission
    console.log('handle submission')

    // Checks entire form object for any required fields that are missing or invalid
    // Stops function execution and returns error message if any issues found
    if (document.querySelector('#workload-form')?.checkValidity() === false) {
      event.stopPropagation();
      const errorMessage = document.getElementById('error-handler');
      errorMessage.textContent = 'Nurse entry is invalid, please check entry and try again'
      errorMessage.style.display = 'block';
      console.log('form invalid!')
      return;
    }

    // If no issues found, submit form and show thank you message
    console.log('form valid!')
    saveDataToLocalStorage()
    calculateWorkloadPoints();
    summarizeFormInputs();
    showMessageContainer();
   

    // If on the last fieldset, submit the form
    writeFormDataToLS()
    
  } else {
    // Cycle to next fieldset
    console.log('cycle to next fieldset')
    nextFieldset();
  }
}


bedLinks.forEach(bedLink => {
    bedLink.addEventListener("click", function (event) {
      // Get the bed ID
      const bedId = bedLink.getAttribute("id");
  
      // Check if data exists for this bed ID in local storage
      const bedData = localStorage.getItem(`bed_${bedId}`);
  
      if (!bedData) {
        // If does not exist, show the form
        currentFieldsetIndex = 0;
        fieldsets.forEach((fieldset, index) => {
          if (index === 0) {
            fieldset.classList.remove('hidden');
          } else {
            fieldset.classList.add('hidden');
          }
        });
        allFormTabs.forEach((element, index) => {
          if (index === 0) {
            element.classList.add('active-tab');
          } else {
            element.classList.remove('active-tab');  }
        });
        console.log("Showing form for bed ID:", bedId)
        event.preventDefault();
        hideMessageContainer();
        showForm();
      } else {
        console.log("Data found for bed ID:", bedId)
        console.log("bedData:", bedData)
        // If data exists, show the message container with saved data
        showMessageContainer();
        hideForm();
        // populate form with LS data, then populate message container with saved data
        injectLSDataIntoForm(bedId)
        summarizeFormInputs()
      }
    });
  });
  

// ====================================================================================================
// Submission Handlers
// ====================================================================================================

// Grabs the current form data and stores it to LS on submit
const writeFormDataToLS = () => {
  const current_link = document.querySelector('.bed-link.active');
  if (!current_link) {
    console.error("No active bed link found");
    return;
  }
  const current_link_id = current_link.getAttribute("id");

  // create a new object to store our form data in
  const data_to_store = {
    bed_id: current_link_id,
    assessment_form_values: {}
  };

  // Iterate through all the fields and extract the relevant info from each
  // NOTE: map and forEach are nearly identical, except map MUST explicitly return a value
// Use map to extract data from each form section (fieldset)
const fieldsets = Array.from(document.querySelectorAll('.workload-form'));
  const bedDataArray = fieldsets.map(fieldset => {
    // grab all the inputs in the current form section
    const inputs = Array.from(fieldset.querySelectorAll('input[type="checkbox"]:checked, input[type="number"]'));

    // Create an object to store data for this form section
    const sectionData = {};

    // Iterate through all the fields and extract the relevant info from each
    inputs.forEach(input => {
      // if we have a checkbox, extract the checked state into a boolean value
      if (input.type === 'checkbox') {
        sectionData[input.name] = {
          value: input.checked,
          type: 'checkbox'
        };
      }
      // if we have a text field, force the value into a Number type.
      else if (input.type === 'number') {
        sectionData[input.name] = {
          value: Number(input.value) || 0,
          type: 'number'
        };
      }});

      return { [fieldset.id]: sectionData };
    });
  
    // Combine the data for each form section into a single object
    bedDataArray.forEach(sectionData => {
      data_to_store.assessment_form_values = { ...data_to_store.assessment_form_values, ...sectionData };
    });
  
    // Generate a unique key for this data entry using the bed_id
    const localStorageKey = `bed_${current_link_id}`;
    
    // Save the data to Local Storage under the unique key
    localStorage.setItem(localStorageKey, JSON.stringify(data_to_store));
  };


// Prepopulate Field Data when a particular bed link is clicked
const injectLSDataIntoForm = (bed_id) => {
  // handle error if no id argument is passed
  if (!bed_id) throw new Error('no bed id provided to Form Population Method')
  // check if the bed_id exists in LS
  const localStorageKey = `bed_${bed_id}`;
  const bed_data = localStorage.getItem(localStorageKey);
  // handle error if the LS key doesn't exist
  if (!bed_data){
   console.log(`No form data exists for bed id ${bed_id}`);
   return;
  }
  // extracts form data from LS after we verify that exists above
  const current_form_data = JSON.parse(bed_data);

  if (current_form_data && current_form_data.form_values) {
    // Grab all the inputs in a specific form section
    const inputs = Array.from(fieldset.querySelectorAll('input'));
  
    // Iterate through our form inputs and populate each one with its corresponding LS value
    inputs.forEach((input) => {
      const ls_data = current_form_data.form_values[input.name] || null;
      if (ls_data) {
        if (input.type === 'checkbox') {
          input.checked = ls_data.value;
        }
        if (input.type === 'text') {
          input.value = ls_data.value;
        }
      }
    });
  } else {
    console.log(`No form data exists for bed id ${bed_id}`);
  }
}

// This will only work if you already have data for 'bed_1' 
// stored in Localstorage from the writeFormDataToLS method above
// injectLSDataIntoForm('bed_1');

////////////////////////////////////////////////////////////////////////////////
//LOCAL STORAGE
function saveDataToLocalStorage(bed_id) {
  // Get the selected bed, shift, and nurses
  const selectedBed = document.querySelector('.bed-link.active').textContent;
  const selectedShift = document.getElementById('shift-select').value;
  const numberOfNurses = parseFloat(document.getElementById('nurses').value);
  //const bed_data = localStorage.getItem(`bed_${bed_id}`);


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
  const localStorageKey = `bed_${bed_id}`
  //const localStorageKey = `${selectedBed}-${selectedShift}-${new Date().getTime()}`;

  // Save the data to Local Storage
  localStorage.setItem(localStorageKey, JSON.stringify(dataToSave))
  //localStorage.setItem(`bed_${bed_id}`, JSON.stringify(dataToSave));
}



/////////write form to LS piece
  // // convert NodeList to array so we can use Prototype methods
  // const bedLinksArray = Array.from(bedLinks);

  // // determine the current bed_id from bedlinks
  // const current_link_id = bedLinksArray.find(
  //   (link) => {
  //     if (link.classList.contains('active')) {
  //       const bed_id = link.getAttribute("id");
  //       return link;
  //     }
  //     else return null
  //   }
  // )?.getAttribute('id')

  // set the objects bed_id property to the correct value
  //data_to_store.bed_id = current_link_id;



////////////// Function to update the total workload tally in HTML/////////////
// // Initialize an array to store bed space data
// const bedLink = [];

// // Function to calculate total workload points
// function calculateWorkloadPoints() {
//   // Reset total workload points
//   let totalWorkloadPoints = 0;

//   // Iterate through each bed space
//   bedSpaces.forEach(bedSpace => {
//     // Calculate the workload points for this bed space
//     let bedSpacePoints = 0;

//     // Calculate workload points for checkboxes in this bed space
//     const checkboxes = bedSpace.querySelectorAll('[workload-value]');
//     checkboxes.forEach(checkbox => {
//       if (checkbox.checked) {
//         const workloadValue = Number(checkbox.getAttribute('workload-value'));
//         bedSpacePoints += workloadValue;
//       }
//     });// Totalize the inputs of all free form number input fields in this bed space
//     const uniqueFields = bedSpace.querySelectorAll('[unique-field]');
//     uniqueFields.forEach(field_element => {
//       const workloadValue = handleExtractUniqueValue(field_element);
//       if (workloadValue) bedSpacePoints += workloadValue;
//     });

//     // Update the total workload points for this bed space
//     bedSpace.dataset.workloadPoints = bedSpacePoints;

//     // Add the bed space's workload points to the total
//     totalWorkloadPoints += bedSpacePoints;
//   });// Update the total workload tally
//   updateTotalWorkloadTally(totalWorkloadPoints);
// }

// // Function to update the total workload tally in HTML
// function updateTotalWorkloadTally(totalWorkloadPoints) {
//   const totalTallyParagraph = document.querySelector("#points-total");
//   totalTallyParagraph.textContent = `Total Tally: ${totalWorkloadPoints}`;
// }




// // Grabs the current form data and stores it to LS on submit
// const writeFormDataToLS = () => {
//     // create a new object to store our form data in
//     const data_to_store = {
//       bed_id: undefined,
//       assessment_form_values: {}
//     };
  
//     // convert NodeList to array so we can use Prototype methods
//     const bedLinksArray = Array.from(bedLinks);
  
//     // determine the current bed_id from bedlinks
//     const current_link_id = bedLinksArray.find(
//       (link) => {
//         if (link.classList.contains('active')) {
//           const bed_id = link.getAttribute("id");
//           return link;
//         }
//         else return null
//       }
//     )?.getAttribute('id')
  
//     // set the objects bed_id property to the correct value
//     data_to_store.bed_id = current_link_id;
  
//     // grab all the inputs in a specific form section
//     const assessment_inputs = Array.from(assessCollabForm.querySelectorAll('input'))
  
//     // Iterate through all the fields and extract the relevant info from each
//     // NOTE: map and forEach are nearly identical, except map MUST explicitly return a value
//     assessment_inputs.map(
//       input => {
//         // if we have a checkbox, extract the checked state into a boolean value
//         if (input.type === 'checkbox') {
//           return data_to_store.assessment_form_values[input.name] = {
//             value: input.checked ? true : false,
//             type: 'checkbox'
//           }
//         }
//         // if we have a text field, force the value into a Number type.
//         else if (input.type === 'text') {
//           return data_to_store.assessment_form_values[input.name] = {
//             value: Number(input.value) ?? 0,
//             type: 'number'
//           }
//         }
//         else return console.log(`Error extracting data from ${input.name}`)
//       }
//     )
  
//     localStorage.setItem(current_link_id, JSON.stringify(data_to_store))
//   };
  
  
//   // Prepopulate Field Data when a particular bed link is clicked
//   const injectLSDataIntoForm = (bed_id) => {
//     // handle error if no id argument is passed
//     if (!bed_id) throw new Error('no bed id provided to Form Population Method')
  
//     // check if the bed_id exists in LS
//     const bed_data = localStorage.getItem(bed_id);
  
//     // handle error if the LS key doesn't exist
//     if (!bed_data) return console.log(`No form data exists for bed id ${bed_id}`);
  
//     // extracts form data from LS after we verify that exists above
//     const current_form_data = JSON.parse(bed_data);
  
//     // checks if a particualr form section exists in our LS data
//     if (current_form_data.assessment_form_values) {
//       // grab all the inputs in a specific form section
//       const assessment_inputs = Array.from(assessCollabForm.querySelectorAll('input'))
  
//       // Iterate through our form inputs and populate each one with it's corresponding LS value
//       assessment_inputs.forEach(
//         input => {
//           const ls_data = current_form_data.assessment_form_values[input.name] ?? null
//           if (ls_data) {
//             if (input.type === 'checkbox') {
//               input.checked = ls_data.value
//             }
//             if (input.type === 'text') {
//               input.value = ls_data.value
//             }
//           }
//         }
//       )
//     }
//   }
  
//   // This will only work if you already have data for 'bed_1' 
//   // stored in Localstorage from the writeFormDataToLS method above
//   // injectLSDataIntoForm('bed_1');
  
//   ////////////////////////////////////////////////////////////////////////////////
//   //LOCAL STORAGE
//   function saveDataToLocalStorage() {
//     // Get the selected bed, shift, and nurses
//     const selectedBed = document.querySelector('.bed-link.active').textContent;
//     const selectedShift = document.getElementById('shift-select').value;
//     const numberOfNurses = parseFloat(document.getElementById('nurses').value);
  
//     //Get value from checkboxes
//     const checkboxes = document.querySelectorAll('[workload-value]');
//     const workloadValues = {};
//     checkboxes.forEach(checkbox => {
//       const name = checkbox.getAttribute('workload-value');
//       const value = checkbox.checked;
//       workloadValues[name] = value;
//     });
  
//     //Create array
//     const dataToSave = {
//       date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
//       shift: selectedShift,
//       bed: selectedBed,
//       workloadValues: workloadValues,
//       numberOfNurses: numberOfNurses,
//       meetings: meetingsValue,
//       arrest: arrestValue,
//       complexdsg: complexdsgValue,
//       burnCare: burnCareValue,
//       transport: transportValue,
//       unplanned: unplannedValue,
//     };
//     // Generate a unique key for this data entry
//     const localStorageKey = `${selectedBed}-${selectedShift}-${new Date().getTime()}`;
  
//     // Save the data to Local Storage
//     localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
//   }