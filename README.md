# Bagan Trip

Interactive map exploration tool for the historical site of Bagan, Myanmar, built with Blazor WebAssembly.

## Overview

Bagan Maps v7 is a modern web application designed for tourists and history enthusiasts to explore the vast archaeological site of Bagan. It offers an interactive map interface, curated travel routes, and detailed information about hundreds of pagodas and landmarks.

## Key Features

- **📍 Interactive Map**: Explore pagodas and historical sites with a smooth, responsive map interface.
- **🛣️ Curated Travel Routes**: Follow predefined itineraries (e.g., Day 2 Adventure) to make the most of your visit.
- **ℹ️ Rich Detail Panels**: Get in-depth information, history, and metadata for each landmark via a sliding UI panel.
- **📶 Offline Support**: Built as a Progressive Web App (PWA) with service workers and local JSON data storage for seamless offline use.
- **🎨 Modern UI/UX**: Premium design using Tailwind CSS with support for dark and light modes.

## Technical Stack

- **Framework**: [Blazor WebAssembly](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor) (ASP.NET Core 8.0)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **JSON Processing**: [Newtonsoft.Json](https://www.newtonsoft.com/json)
- **Deployment**: [GitHub Actions](https://github.com/features/actions) & [Vercel](https://vercel.com/)

## Project Structure

- `BlazorWasm.MapsV2/`: Main application project.
  - `Components/`: Reusable Razor components (e.g., `PagodaDetail`).
  - `Services/`: Business logic for map data (`MapService`) and theming (`ThemeService`).
  - `wwwroot/data/`: Static JSON files containing map coordinates and route information.
  - `wwwroot/css/`: Tailwind CSS input and generated output.

## Getting Started

### Prerequisites
- .NET 8.0 SDK
- Node.js & npm (for Tailwind CSS)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/sannlynnhtun-coding/BlazorWasm.BaganMaps.v7.git
   ```
2. Navigate to the project directory:
   ```bash
   cd BlazorWasm.MapsV2
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the CSS:
   ```bash
   npm run build
   ```
5. Run the application:
   ```bash
   dotnet watch run
   ```

## Deployment

The project is automatically deployed to Vercel via GitHub Actions whenever changes are pushed to the `master` branch.
