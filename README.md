# SaaSite - No-Code Website Builder

Welcome to **SaaSite**, an intuitive, AI-powered, no-code website builder that empowers you to create stunning, professional websites with ease. SaaSite is built with a modern tech stack and provides a seamless experience, making website creation accessible to everyone, regardless of technical skill.

This document serves as a comprehensive guide to the project's architecture, features, and how to get started with development.

## ✨ Key Features

*   **AI-Powered Template Recommendations**: Describe your business or idea, and our AI will suggest the perfect starting template for your website.
*   **AI Content Generation**: Automatically generate engaging content for various sections of your website, such as headers, descriptions, and feature lists.
*   **Intuitive Visual Editor**: A clean and modern editor that allows you to customize your site with a live preview for both desktop and mobile views.
*   **Component-Based Architecture**: Build your site using a library of pre-built, customizable blocks like Headers, Hero Sections, Image Galleries, and more.
*   **Style Management**: Easily manage your site's visual identity by adjusting the color palette and typography from a centralized style panel.
*   **Project Dashboard**: A central hub to manage all your website projects, view their status, and access quick actions like editing, viewing, and deleting.
*   **Built-in Analytics**: Monitor your website's performance with a dedicated analytics page showing key metrics like visitors, page views, and top referrers.

## 🚀 Tech Stack

SaaSite is built on a robust and modern technology stack:

*   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/) - A collection of beautifully designed, accessible, and customizable components.
*   **Generative AI**: [OpenRouter](https://openrouter.ai/) for accessing various Large Language Models.
*   **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation.
*   **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
*   **Charts**: [Recharts](https://recharts.org/)

## 🏁 Getting Started

To get the project up and running, follow these steps:

1.  **Install Dependencies**: The project comes with all necessary dependencies listed in `package.json`. They will be installed automatically.
2.  **Environment Variables**:
    *   Create a `.env.local` file in the root of the project.
    *   Add your OpenRouter API key to this file:
        ```
        OPENROUTER_API_KEY=your-api-key-here
        ```
3.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 📂 Project Structure

The project follows a standard Next.js App Router structure:

```
src
├── ai
│   └── flows         # Contains AI-powered serverless functions
├── app
│   ├── (main)        # Main application routes (dashboard, analytics, settings)
│   ├── editor        # The website editor interface
│   └── layout.tsx    # Root layout
│   └── page.tsx      # Main dashboard page
├── components
│   ├── analytics     # Components for the analytics page
│   ├── editor        # Components for the website editor
│   ├── icons         # Custom SVG icon components
│   ├── layout        # Layout components (Dashboard, Header, etc.)
│   └── ui            # Reusable ShadCN UI components
├── hooks             # Custom React hooks (e.g., use-toast)
└── lib               # Utility functions
```

## 🧠 AI-Powered Features

The AI capabilities are defined in the `src/ai/flows/` directory. These are server-side functions that interact with the OpenRouter API.

*   `template-recommendation.ts`: Takes a user's industry or idea as input and returns a recommended website template, including a name, description, and image URL.
*   `content-generation.ts`: Generates text content for specific website blocks (e.g., a hero section tagline) based on a given theme or topic.

These flows are called from the client-side components to provide a dynamic and intelligent user experience.

## 🎨 Customization and Styling

*   **Theming**: Colors and styles are managed via CSS variables in `src/app/globals.css`. You can easily change the entire look and feel of the application by modifying the HSL color values for `light` and `dark` modes.
*   **Fonts**: The primary fonts are Poppins (for headlines) and PT Sans (for body text), imported from Google Fonts in the root `layout.tsx`.
*   **Components**: The UI is built with ShadCN components, which are highly composable and customizable. You can find their source in `src/components/ui` and modify them as needed.

Thank you for using SaaSite! We hope you enjoy building your next website.
