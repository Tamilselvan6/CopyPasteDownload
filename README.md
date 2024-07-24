# Copy Paste Download

Copy Paste Download is a web application that allows users to save images by pasting them, dragging and dropping them, or clicking on the upload area to select an image file. The application uses the File System Access API to save images to a user-specified directory and provides visual feedback when an image is successfully saved.

## Features

- **Paste Image**: Paste an image from your clipboard using `CTRL+V`.
- **Drag and Drop**: Drag and drop an image onto the designated upload area.
- **Click to Upload**: Click on the upload area to select an image file.
- **Save to Directory**: Save images to a user-specified directory using the File System Access API.
- **Visual Feedback**: Display a success message when an image is successfully saved.

## Getting Started

### Prerequisites

To run this project, you'll need a web browser that supports the File System Access API. As of now, Google Chrome and Edge provide this support.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/copypaste-download.git
    ```

2. Navigate to the project directory:
    ```bash
    cd copypaste-download
    ```

3. Open `index.html` in your web browser to view the application.

## Usage

1. Open the web application in a supported browser.
2. Click "Select Folder" to choose a directory where images will be saved.
3. Paste an image using `CTRL+V`, drag and drop an image, or click on the upload area to select an image file.
4. The application will save the image to the selected directory and display a success message.

## File Structure

```plaintext
copypaste-download/
├── index.html
├── script.js
├── styles.css
└── README.md
