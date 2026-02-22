# SonicAuto-AI: Intelligent Vehicle Diagnostics

<img width="1919" height="971" alt="Screenshot 2026-02-22 182147" src="https://github.com/user-attachments/assets/ff6bff6f-3986-44ec-ae10-95bf4e74e507" />



[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

> SonicAuto AI is an experimental, AI-powered diagnostic tool intended for educational and informational purposes only. The acoustic analysis and predictions provided by this application are not guaranteed to be accurate and should never replace the professional judgment, diagnosis, or services of a certified automotive technician. Always consult a qualified mechanic before making any mechanical, structural, or safety-critical repairs to a vehicle. The creators of SonicAuto AI assume no liability for any damages, injuries, or losses resulting from the use of this tool. Use entirely at your own risk.



---

## Problem Statement

- *Difficult Diagnosis:* dentifying the precise cause of mechanical issues based solely on sound is challenging and subjective, often leading to misdiagnosis by vehicle owners and inexperienced mechanics.

- *High Costs & Delays:* Trial-and-error diagnostic methods result in unnecessary parts replacement, excessive labor costs, and extended vehicle downtime.

- *Lack of Accessible Tools:* Professional automotive diagnostic equipment is expensive and complex, making objective, acoustic-driven analysis inaccessible to everyday drivers.

- *Missed Early Warning Signs:* Subtle engine or mechanical noises that indicate impending failure are frequently missed, leading to complete breakdowns and potential safety hazards on the road.

---

## Project Objective

*Develop an Accessible Diagnostic Tool:* Create a user-friendly, AI-powered system that easily analyzes vehicle sounds to assist everyday drivers and mechanics in identifying mechanical issues without requiring expensive hardware.
*Enhance Diagnostic Accuracy:* Leverage advanced audio classification models to reduce guesswork, providing objective insights that complement traditional mechanical inspections and reduce misdiagnosis.



## Proposed Solution

 *SonicAuto AI* is an intelligent web application that functions as a virtual mechanic. Users can upload recordings of anomalous vehicle sounds (e.g., engine knocking, squealing belts) for analysis. A machine learning model identifies the acoustic signatures of specific mechanical failures and presents a diagnosis via an interactive dashboard. The system then guides users through tailored repair insights, parts recommendations, and clear next steps, providing a fast and accessible first-pass diagnostic tool.



## 🛠️ Technologies Used

### *Frontend Stack*
- *React*: Used as the primary JavaScript library for building the dynamic user interface.
- *Vite*: Acts as the fast build tool and development server.
- *Tailwind CSS*: A utility-first CSS framework utilized for rapid and responsive UI styling.
- *Lucide React*: A library providing the clean, modern icons used throughout the dashboard (e.g., Car, Settings, Upload).

### *Audio Processing & Machine Learning:*
- (You will need to fill this in based on your specific implementation. Examples could be: TensorFlow.js, Web Audio API, or a specific Python backend model depending on how you handle the audio classification.)

### *Backend & Data*
- Node.js
- express.js
- supabase
- firebase

---

## 📸 System Visuals

### 1. Login with user credentials
Using the registerd email and password, user can login.

<img width="1914" height="967" alt="Screenshot 2026-02-22 181850" src="https://github.com/user-attachments/assets/67c17a47-3308-40a9-be2c-6b0501a94968" />

### 2. Selecting Brand
User can select which brand they are  using.

<img width="1917" height="968" alt="Screenshot 2026-02-22 185811" src="https://github.com/user-attachments/assets/e9fff4f3-1498-4f73-bbbd-de8b86385b45" />


### 3. Selecting Model
User can select which model they are using.

<img width="1916" height="969" alt="Screenshot 2026-02-22 182054" src="https://github.com/user-attachments/assets/f8d9438d-c07d-4b14-a5bf-8d5c5d653763" />


### 4.Selecting Which part giving Different sound
User can select which part of the car is giving different sound.

<img width="1917" height="969" alt="Screenshot 2026-02-22 182107" src="https://github.com/user-attachments/assets/40b9bef0-26cf-4aa9-819f-b5e7765bfe40" />


### 5.Diagonostic

<img width="1919" height="963" alt="Screenshot 2026-02-22 182133" src="https://github.com/user-attachments/assets/388d9eae-f7f9-4edd-beeb-70ace0743bc5" />


### 6. Showroom recommandation

<img width="1919" height="969" alt="Screenshot 2026-02-22 182204" src="https://github.com/user-attachments/assets/8d57f871-3e40-44e0-be50-798025733998" />

---


## 🎯 Key Features

- ✅ *Acoustic Diagnostic Engine:* Upload and analyze audio recordings of vehicle noises to receive AI-driven predictions of potential mechanical issues.
- ✅ *PIntuitive Dashboard Interface:*  A modern, glassmorphism-styled React dashboard provides a central hub for all diagnostic activities, recent scans, and vehicle alerts.
- ✅ *RGuided Diagnostic Workflow:* Step-by-step guidance, including vehicle selection (Make, Model, Year) and symptom categorization, to ensure accurate context for audio analysis.
- ✅ *Interactive Part Selection Visualization:* A visual interface for identifying and selecting specific car parts related to the diagnosed issue, aiding in repair planning.
- ✅ *Actionable Repair Insights:* Generates actionable next steps, recommendations for parts replacement, and safety warnings based on the diagnostic results.


---

<p align="center">
  <strong>Empowering Healthcare Through Intelligent Systems</strong><br>
