# Workload Assessment Tool for ICU Nurses

# https://mgr514.github.io/Workload-Assessment-Tool/

## Project Description

This project is aimed at creating a digital tool to replace the paper forms currently used by ICU nurses in St. John's, Newfoundland, for assessing and quantifying their workload per patient and per shift. These paper forms are traditionally sent to the government to aid in analyzing unit acuity and determining appropriate staffing levels. The Workload Assessment Tool for ICU Nurses is designed to streamline this process and make it more efficient.

The tool is implemented as a web application, utilizing HTML, CSS, and JavaScript to provide an interactive and user-friendly interface. ICU nurses can easily input relevant data for each bed space, and the tool stores this data along with information about the number of nurses, the date, and the shift. As a proof of concept, the tool currently stores data per bed space once, but hopefully can be expanded to accommodate more comprehensive data storage.

## Challenges

During the development of the Workload Assessment Tool, several challenges were encountered, including:

- **Local Storage Implementation**: The primary challenge was implementing local storage to store all selected inputs correctly. It was important to ensure that the data is saved accurately and can be retrieved when needed.

- **Data Recall**: Ensuring that the tool correctly recalls the data from local storage for previously completed bed spaces. It's crucial that the tool displays a data recap accurately to help indicate when a form has already been completed.

- **Form Navigation and Interactivity**: Making the JavaScript code iterate through the form sections smoothly and manage the hide/show functionality for form sections and summary messages. A seamless user experience is vital.

## Future Features

In the future, I aim to enhance the Workload Assessment Tool by adding more features to make it even more robust:

- **Advanced Data Storage Structure**: Expanding the data storage capabilities to accommodate more data handling.

- **Data Visualization**: Adding a dedicated page to represent the data collected over time in tables and graphs. This will enable better analysis and visualization of workload trends and patterns.

## Acknowledgements

Thanks to Clark Oake through Get Coding for all his guidance and support in getting me through this project!
