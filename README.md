# 🌸 Mindbloom - AI Mental Health Companion

Mindbloom is a comprehensive mental health and wellness application designed to help users track their mood, manage stress, and build healthy habits. It features an AI-powered empathetic chatbot, detailed analytics, and interactive wellness tools.

![Dashboard Demo](assests/demo.png)

## ✨ Features

-   **Mood Tracking**: Log daily moods, emotions, and journal entries.
-   **AI Companion**: Chat with "Mindbloom," an empathetic AI assistant powered by Google Gemini, offering support and coping strategies.
-   **Weekly Insights**: AI-generated reports analyzing mood trends, sleep patterns, and emotional triggers.
-   **Wellness Tools**:
    -   **Focus Timer**: Customizable Pomodoro timer for productivity.
    -   **Breathing Exercise**: Guided 4-7-8 breathing for relaxation.
    -   **Hydration Tracker**: Log water intake.
    -   **Gratitude Journal**: Save daily gratitude notes.
-   **Personal Profile**: Track streaks, total focus hours, and customize the app theme.
-   **Secure Data**: All user data is securely stored using Firebase Firestore.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), TypeScript
-   **Styling**: Tailwind CSS, Shadcn UI, Lucide React (Icons)
-   **Backend/Database**: Firebase (Authentication & Firestore)
-   **AI Integration**: Google Gemini API (`gemini-1.5-flash`)
-   **Charts**: Recharts

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/mindbloom.git
    cd mindbloom
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add your keys:
    ```env
    VITE_GEMINI_API_KEY=your_google_gemini_api_key
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open in Browser:**
    Navigate to `http://localhost:5173` to view the app.

## 📸 Screenshots

| Dashboard | Chatbot |
| :---: | :---: |
| ![Dashboard](assests/dashboard.png) | ![Chatbot](assests/chatbot.png) |


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
