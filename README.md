# Vision Controls
> Gesture Recognition Software.

## Table of contents
* [General info](#general-info)
* [Showcase](#screenshots)
* [Tech Stack](#tech-stack)
* [Setup](#setup)
* [Features](#features)
* [Extra](#extra)

## General info
<p align="center">
    <img src="./assets/readme/logo.png" width="259.4" height="200" />
</p>

Vision Controls is a desktop application that allows the user to control various applications through hand gestures.


## Showcase
![ss1](./assets/readme/main2.png)

## Screenshots
<!-- <img src="./oldAssets/readme/ss1.png" width="713.25" height="456.75" /> -->
![ss1](./assets/readme/ss1.png)

<!-- <img src="./oldAssets/readme/ss2.png" width="713.25" height="462" /> -->
![ss1](./assets/readme/ss2.png)

<!-- <img src="./oldAssets/readme/ss3.png" width="713.25" height="459.75" /> -->
![ss1](./assets/readme/ss3.png)

<!-- <img src="./oldAssets/readme/ss4.png" width="516" height="432.75" /> -->
![ss1](./assets/readme/ss4.png)

## Tech Stack
**Frontend**

* JS
* React
* Electron

**Backend**

* Python
* Flask
* OpenCV

## Setup
General
```
git clone https://github.com/aggie-coding-club/Vision-Controls
cd Vision-Controls
npm install --global yarn
yarn install
```

Frontend
```
cd frontend
yarn start
npm run electron-start
```
Backend
```
pip install -r requirements.txt
python recognition/app.py
```

## Features
* Full Desktop UI Using React and Electron
* Gesture Recognition / mouse movement through Python with OpenCV 
* Settings page to change application preference / gestures

## Extra

This project is managed by Aggie Coding Club.

