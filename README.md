# Arabic Transcript Corrector

This Node.js script uses the Google Gemini Pro model to correct errors in Arabic transcripts. It processes transcripts in batches, leveraging the model's advanced language understanding capabilities to provide accurate corrections.

## Features

* **Batch Processing:** Improves efficiency by processing multiple transcripts in a single request to the Google Gemini Pro model.
* **Contextual Corrections:** Utilizes previous transcript lines to enhance the accuracy of corrections.
* **Error Handling:** Includes retry mechanisms to handle potential errors during the correction process.
* **Rate Limit Handling:** Implements a wait mechanism to avoid exceeding the API's rate limits.

## Prerequisites

* **Node.js and npm:** Make sure you have Node.js and npm installed on your system.
* **Google Cloud Project:** Create a Google Cloud project and enable the Gemini Pro API.
* **API Key:** Obtain an API key for the Gemini Pro API and store it in a `.env` file.
* **Input File:** Prepare a JSON file named `in.json` containing an array of transcripts, each with a `text` property holding the Arabic text to be corrected.

## Installation

1. Clone this repository.
2. Navigate to the project directory: `cd arabic-transcript-corrector`
3. Install the dependencies: `npm install`

## Configuration

1. Create a `.env` file in the project root directory.
2. Add your Gemini Pro API key to the `.env` file:

## Usage

1. Place your `in.json` file in the project directory.
2. Run the script: `node index.js`
3. The corrected transcripts will be saved in a new file named `out.json`.

## Important Notes

* The script assumes the input transcripts are in Arabic.
* The effectiveness of the corrections depends on the quality of the Google Gemini Pro model.
* Make sure to handle your API key securely and avoid exposing it in public repositories.
* Be mindful of the API usage limits and adjust the batch size if necessary.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the   
 MIT License.