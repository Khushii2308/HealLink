# HealLink - Your AI Health Assistant

## Overview

HealLink is a React-based web application designed to provide general health advice and facilitate remote doctor consultations, particularly for underserved communities. It leverages the Google Gemini AI to offer health assessments based on user input.

## Features

***AI-Powered Health Advice:** Provides health assessments and actionable advice using the Google Gemini API.
***Remote Doctor Consultations:** Connects users with doctors for remote consultations.
***Health Tips:** Offers daily health tips to promote healthy living.
***Multi-Language Support:** Supports multiple languages, including English, Hindi, and Spanish.
***User-Friendly Interface:** A clean and intuitive interface built with Material UI.

## Technologies Used

***React:** A JavaScript library for building user interfaces.
***Material UI (MUI):** A popular React UI framework for creating a consistent and visually appealing design.
***React Router:** For navigation and routing within the application.
***Google Gemini API:** For AI-powered health assessments.
***Vite:** A fast build tool for modern web development.

## Setup Instructions

1.**Clone the repository:**

    ```bash
    git clone <repository-url>
    cd HealLink
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure the environment variables:**

    *   Create a `.env` file in the root directory.
    *   Add your Google Gemini API key:

        ```
        VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
        ```

4.  **Run the application:**

    ```bash
    npm run dev
    ```

    The application will be accessible at `http://localhost:3000`.

## API Rate Limiting

To ensure fair usage and prevent abuse, the application implements rate limiting for the Google Gemini API. A minimum delay of 1 second is enforced between API calls.

## Error Handling

The application includes comprehensive error handling to gracefully manage potential issues such as API errors, network problems, and invalid responses. User-friendly error messages are displayed to guide users in case of any issues.

## Future Enhancements

***Voice Input:** Implement voice input functionality for hands-free question input.
***Translation Services:** Integrate translation services to support a wider range of languages.
***Video Call/Chat Functionality:** Implement actual video call and chat features for remote doctor consultations.
***User Authentication:** Add user authentication for personalized experiences and data privacy.
***More Health Tips:** Add more health tips to provide users with more information.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or report bugs.
