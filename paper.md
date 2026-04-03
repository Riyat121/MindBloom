---
title: 'MindBloom: An Open-Source AI-Driven Digital Mental Health and Psychological Support Platform'
tags:
  - mental health
  - artificial intelligence
  - React
  - TypeScript
  - Firebase
  - sentiment analysis
  - student wellness
  - large language models
authors:
  - name: Raman Gupta
    orcid: 0009-0002-1598-5642
    affiliation: 1
  - name: Riya Kumari
    orcid: 0009-0005-7647-0791
    affiliation: 1
  - name: Anushal Gupta
    orcid: 0009-0005-7805-0176
    affiliation: 1
  - name: Tusshar Kumar
    orcid: 0009-0005-3322-3694
    affiliation: 1
affiliations:
  - name: Department of Computer Science and Engineering, KCC Institute of Technology and Management, Greater Noida, India (Dr. A.P.J. Abdul Kalam Technical University)
    index: 1
date: 2026-04-03
bibliography: paper.bib
---

# Summary

MindBloom is an open-source, full-stack digital mental health platform designed to provide accessible, stigma-free psychological support to undergraduate students in higher education. The software integrates a 24×7 AI Companion powered by the Google Gemini 2.5 Flash large language model (LLM), a Natural Language Processing (NLP)-driven journal sentiment analysis engine, gamified wellness micro-tools, and a longitudinal mood analytics dashboard within a unified, data-secure web application. It is implemented in React 18 with TypeScript on a Vite build toolchain, backed by Firebase Authentication and Firestore, and is deployable as a zero-installation browser-based application. MindBloom is live at [https://mindbloom-gemini.vercel.app](https://mindbloom-gemini.vercel.app) and its source code is publicly available under the MIT License.

# Statement of Need

Mental health disorders among university students represent a critical and growing public health challenge. The World Health Organization estimates that approximately one in seven individuals aged 15–29 experiences a diagnosable mental health condition, with the vast majority remaining undiagnosed and untreated [@who2021]. In India specifically, the National Mental Health Survey revealed that 70–80% of individuals with identifiable mental health disorders receive no treatment, driven by social stigma, resource limitations, and chronic underfunding of institutional counseling infrastructure [@nmhs2016].

Existing digital mental health tools such as Woebot, Wysa, and Youper address this gap partially, but operate as isolated commercial applications disconnected from institutional counseling systems and lacking transparent, reproducible NLP pipeline documentation [@torous2020]. Furthermore, these platforms are not architected for the distinct psychosocial pressures of students in Indian higher education contexts, including academic competition, socioeconomic stress, and cultural stigma around psychological help-seeking [@patra2021].

MindBloom addresses these limitations by providing:

1. A freely deployable, open-source platform that institutions can self-host without per-user licensing costs.
2. A unified architecture integrating AI-driven immediate support, structured NLP journal analysis, secure counseling channels, and wellness tools within a single data-consistent system.
3. A transparent, documented NLP pipeline performing tokenization, stop-word removal, and multi-class sentiment classification via the Gemini API, enabling academic reproducibility and extension.
4. Role-Based Access Control (RBAC) enabling student–counselor interaction within the same platform, bridging the gap between AI-mediated first contact and professional human care.

# Software Architecture and Key Features

MindBloom is structured as a Single Page Application (SPA) implementing a component-based architecture with clear separation across presentation, logic, and data layers. The application consists of seven primary functional modules:

**AI Companion**: A conversational agent powered by Google Gemini 2.5 Flash, configured with a system prompt emphasizing empathetic, non-judgmental engagement consistent with psychologically informed interaction design. The companion maintains session context to enable coherent multi-turn dialogue.

**Journal & Sentiment Analysis Engine**: Users submit free-text journal entries which are processed through a client-side NLP pipeline — tokenization, stop-word removal, feature extraction — before being submitted to the Gemini API for multi-class sentiment classification (positive, neutral, negative, anxious, distressed). Classification outputs are persisted to Firestore and rendered in the analytics dashboard.

**Wellness Micro-Tools**: Four gamified behavioral intervention tools — a customizable Pomodoro focus timer, a guided 4-7-8 breathing exercise module, a hydration tracker, and a gratitude journaling module — addressing evidence-based behavioral components of student stress management [@cao2020].

**Longitudinal Analytics Dashboard**: A Recharts-powered visualization layer rendering mood trend lines, sleep quality patterns, sentiment distribution charts, and engagement streaks across user-defined time windows.

**Secure Counseling Channel**: A Firebase Firestore-backed messaging system with RBAC differentiating student and counselor roles, enabling authenticated asynchronous communication within the platform.

**Authentication & Data Security**: Firebase Authentication provides JWT-based session management. Firestore security rules enforce per-user data isolation, ensuring that no student's mental health data is accessible to other students.

**Deployment**: The application is deployed on Vercel with CI/CD integration to the GitHub main branch, enabling zero-downtime updates.

# Target Audience

MindBloom is designed for:

- **University counseling centers** seeking a deployable, customizable digital support layer to extend limited counselor capacity.
- **Researchers** studying AI-mediated mental health intervention, NLP-based sentiment analysis in clinical contexts, or digital behavioral health tools, who require a reproducible, open-source reference implementation.
- **Software developers** building mental health applications, who can use MindBloom's architecture as a reference for integrating LLMs with Firebase and implementing RBAC in psychologically sensitive contexts.
- **Students** at institutions that deploy the platform as an accessible, stigma-free first contact for psychological support.

# Acknowledgements

The authors thank Mr. Chand Babu (Faculty Supervisor, KCC Institute of Technology and Management) for guidance during the development and evaluation of this project.

# References
