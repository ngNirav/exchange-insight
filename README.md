# Exchange Insight 📈

A modern Angular application for tracking and comparing currency exchange rates. Built with Angular 19 and Material Design, this application provides an intuitive interface for monitoring currency exchange rates over time.

## 🌐 Live Demo

Check out the live demo: [Exchange Insight](https://exchangeinsight.netlify.app/)

## ✨ Features

- 📅 Select a date (up to 90 days in the past)
- 🔄 View exchange rates over the last 7 days
- 💷 Default base currency: GBP (editable)
- 🌐 Compare against up to 7 currencies (minimum 3)
- 📦 Fetches real-time and historical data from public API
- 🎨 Built with Angular Material + SCSS

## 🚀 Tech Stack

- Angular 19
- Angular Material
- TypeScript
- RxJS
- SCSS
- Angular Signals for State Management

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ngNirav/exchange-insight.git
   cd exchange-insight
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── layout/            # Main layout component
│   │   └── shared/            # Reusable components
│   ├── models/                # TypeScript interfaces
│   ├── services/              # API services
│   └── utils/                 # Utility functions
├── environments/              # Environment configurations
└── assets/                    # Static assets
```

## 💡 Usage

1. Select a date using the date picker (up to 90 days in the past)
2. Choose your base currency from the dropdown
3. Add or remove comparison currencies (3-7 currencies)
4. View the exchange rate trends in the table below

## 🔧 Configuration

The application uses Angular's environment files for configuration. You can modify the following in `src/environments/environment.ts`:

- API base URL
- Other environment-specific settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🧪 Testing

- Unit tests have been added for the `CurrencyListTableComponent`, `DatePickerComponent` and `BaseCurrencySelectorComponent` to ensure robust input handling and dynamic rendering logic.
- Run tests using:

  ```bash
  ng test
  ```
