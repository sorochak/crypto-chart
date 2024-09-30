# Crypto-Viz

Crypto-Viz is a cryptocurrency volume visualization application built with React, MUI, and Observable Plot. The application visualizes cryptocurrency data such as volume and quarter-over-quarter (QoQ) changes for popular cryptocurrencies like Bitcoin, Ethereum, Solana, and USDC. The project is deployed to GitHub Pages.

## Live Demo

You can view the live demo of the project at:  
[Crypto-Viz Demo](https://sorochak.github.io/crypto-chart)

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Running the Project Locally](#running-the-project-locally)
- [Deployment](#deployment)

## Project Overview

Crypto-Viz fetches cryptocurrency volume data and visualizes it using an area chart. Users can see the average volume for each cryptocurrency in Q2'23 and how it changed compared to Q1'23. The app uses Material-UI (MUI) components for styling and layout and Observable Plot for charting.

The project is deployed via GitHub Pages using the `gh-pages` branch.

## Technologies Used

- **React**
- **Material-UI (MUI)**
- **Observable Plot**

## Features

- Area chart visualizing the volume of Bitcoin, Ethereum, Solana, and USDC.
- Displays average volume for Q2'23 and quarter-over-quarter (QoQ) percentage changes.
- Automated deployment to GitHub Pages using the `gh-pages` branch.

## Installation

To install and run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sorochak/crypto-chart.git
   cd crypto-viz
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Project Locally

1. **Start the development server:**
   ```bash
    npm start
   ```
2. **View the app:** Open your browser and go to `http://localhost:3000` to view the app.

## Deployment

This project is deployed to GitHub Pages using the gh-pages branch. The deployment process is automated via npm scripts.

### Steps to Deploy

1. **Build the Project:**

   ```bash
   npm run build
   ```

2. **Deploy the build to Github Pages:**
   ```bash
   npm run deploy
   ```
   This command will build the project and push the build files to the gh-pages branch, making the site available at https://sorochak.github.io/crypto-chart.
