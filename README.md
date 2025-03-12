# Postal Form Generator (Generator Potwierdzenia Nadania)

A modern, user-friendly web application for generating Polish postal forms (Potwierdzenie Nadania). Built with React and TypeScript, this application allows users to create, save, and print postal forms with a clean and intuitive interface.

## Features

- 📝 Create postal forms with sender and recipient information
- 💾 Save sender information locally for future use
- 📄 Print forms in a standardized format
- 🇵🇱 Full Polish language support
- 📱 Responsive design for all devices
- 🔍 No data sent to external servers - all processing is done locally

## Technologies Used

- **React 19**: Modern UI library for building user interfaces
- **TypeScript**: For type-safe code and better developer experience
- **Vite**: Next-generation frontend tooling for fast development and building
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **LocalStorage API**: For persistent storage of sender information

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd postal-form-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Build for production:
   ```bash
   npm run build
   # or
   yarn build
   ```

## Usage

1. Fill in the sender information (Dane nadawcy)
2. Optionally save the sender information for future use
3. Fill in the recipient information (Dane adresata)
4. Select additional options like delivery confirmation or priority shipping
5. Click "Drukuj formularz" to print the form

## Project Structure

```
src/
├── components/     # Reusable UI components
├── lib/           # Utility functions
└── PostalFormApp.tsx # Main application component
```

## Features in Detail

### Sender Information Storage

- Save sender details for future use
- Automatically load saved sender information
- Clear saved information when needed
- Visual confirmation of save actions

### Form Fields

- Name and address fields for both sender and recipient
- Postal code and city inputs
- Optional additional address line
- Country field for international shipping
- SMS/Email notification options

### Print Functionality

- Clean, professional print layout
- Proper formatting for official use
- Preview before printing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
