# Carpool Platform

The Carpool Platform is an effective web application built to streamline carpooling services. It utilizes a web scraper, based on the Selenium WebDriver, to draw out trip costs, which are then accessed by an AWS Lambda function when triggered through an AWS API Gateway by nExtsjs frontend code. The scraper is locally hosted on a MacBook server and made available with ngrok, while the frontend is hosted on Vercel. Additionally, the platform takes advantage of well-regarded technologies and services such as AWS API Gateway, FastAPI, BeautifulSoup, JSON, among others.

This repo contains only the front end code. Refer to the README file in the general repo @ https://github.com/SamIron0/cruiseo for the full project links.

## Key Features

-**AWS Lambda Function Integration**: The script is designed to interact with AWS Lambda Functions, enabling seamless automation of serverless backend processes.

-**AWS API Gateway compatibility**: The script can be called via AWS API Gateway, facilitating ease in constructing, deploying, and managing APIs.

-**Real-time Price Fetching**: The function efficiently pulls out price details from a script running locally, enabling real-time data retrieval.

-**Geocoding feature**: It uses Google's Map Geocoding API to converts addresses into geocode.

-**Replicability**: The function can be used in diverse locales by merely replacing the ngrok link and the relevant endpoint in the script.


