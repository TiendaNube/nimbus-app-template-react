# Nimbus App Template

## Introduction
This is a template for creating apps for Nuvemshop/Tiendanube ecosystem using Nimbus Design System and the Nuvemshop/Tiendanube API. It functions as a monorepo, as it includes all the necessary code to start and maintain the front-end and back-end of the application.

This template provides a starter project for building standalone apps using the follwing technologies:
 - [React for the frontend, with Vite as a framework](https://github.com/TiendaNube/nimbus-app-template-react/blob/main/packages/app-template-vite/README.md)
 - [Node.js for backend, with Typescript](https://github.com/TiendaNube/nimbus-app-template-react/blob/main/packages/app-template-node/README.md)

## Prerequisites
Before getting started, make sure you have the following dependencies installed in your development environment:

- Node.js (version 14 or higher)
- This project runs with <a href="https://yarnpkg.com/getting-started/migration#step-by-step" target="_blank">yarn modern</a> (v3+)
- The application on the Partner Portal is required to have `Write products` permission. (<a href="https://tiendanube.github.io/api-documentation/authentication#scopes" target="_blank">Learn more about permissions</a>)
![image](https://github.com/TiendaNube/nimbus-app-template-react/assets/68255205/80f0bf4e-c55e-4288-b64c-eafce5816cb1)

## Limitations and Considerations
- If you install the app in a demo store, it will only be possible to add a maximum of 10 products.
- Webehooks have not been implemented.
- The `packages/app-template-node/config.json` file simply stores the credentials of a store, and when the installation process is repeated, the old object is replaced by the new one.
- If you don't change the redirect URL in the Partners Portal to the port where the project is running, it won't be possible to authenticate the app or access the Product API.
- For the Product API to work, the app must have `Write products` permission.

## App Template Flow
- To help you better understand the process, refer to the following <a href="https://miro.com/app/board/uXjVMGmp9Zs=/?share_link_id=535177540410" target="_blank">App Template Flow</a>.

## How to use the App Template
### 1. Create a partner's account
- Please visit <a href="https://partners.nuvemshop.com.br" target="_blank">Partners Portal - Portuguese</a> or <a href="https://partners.tiendanube.com" target="_blank">Partners Portal - Spanish</a>, access  to create an account in case you haven't done so already. (<a href="https://atendimento.nuvemshop.com.br/pt_BR/parceiros-tecnologicos/guia-detalhes-do-programa-de-parceiros-tecnologicos">Learn how to create an account - Portuguese</a> or <a href="https://ayuda.tiendanube.com/es_ES/socios-tecnologicos/en-que-consiste-el-programa-de-socios-tecnologicos-de-tiendanube">Learn how to create an account - Spanish</a>)
![image](https://github.com/TiendaNube/nimbus-app-template-react/assets/68255205/3f92d269-0209-4eba-ae9f-1d13d6d91644)


### 2. Create an app
- If you haven't created an app on the Partners Portal yet, create one. (<a href="https://atendimento.nuvemshop.com.br/pt_BR/parceiros-tecnologicos/como-fazer-um-aplicativo-para-a-loja-de-aplicativos-nuvemshop">Learn how to create an app - Portuguese</a> or <a href="https://ayuda.tiendanube.com/socios-tecnologicos/como-creo-una-aplicacion-para-tiendanube">Learn how to create an app - Spanish</a>)
![image](https://github.com/TiendaNube/nimbus-app-template-react/assets/68255205/36b6a6d8-e74c-4521-b452-f7f6aa034c96)


### 3. Clone this repository
- Clone this repository:
  ```bash
  git clone git@github.com:TiendaNube/nimbus-app-template-react.git
  ```
- Open the project in your code editor (e.g., Visual Studio Code, Eclipse, etc.).


### 4. Check yarn version
- In the terminal, check yarn version using the following command:
  ```bash
  yarn --version
  ```
  ![image](https://github.com/TiendaNube/nimbus-app-template-react/assets/68255205/92bd3803-d6af-4c95-9997-70d840f4c88b)


### 5. Install dependencies
- In the terminal, install the project dependencies using the following command:
  ```bash
  yarn install
  ```
### 5. Install dependencies at node project
- Go to the `packages/app-template-node` file and in the terminal, install the project dependencies using the following command:
  ```bash
  yarn install
  ```
### 6. Install dependencies at vite project
- Go to the `packages/app-template-vite` file and in the terminal, install the project dependencies using the following command:
  ```bash
  yarn install
  ```
### 7. Get credentials from the Partners Portal
- Go back to the Partners Portal and navigate to the details page of your app.
![image](https://github.com/TiendaNube/nimbus-app-template-react/assets/68255205/b0a9ab0f-8a74-4df1-be30-5b4663375680)
- Then, copy the `App ID` and `Client Secret`, which are the authorization keys, in order to install your app on the stores.


### 8. Rename .env-example to .env and set environment variables
- Go back to your code editor:
  - Rename the `.env-example` file to `.env`.
  - Paste the credentials copied in the previous step into the `.env` file:
    - PORT=3400 (Port where the backend will run)
    - CLIENT_ID="App ID"
    - CLIENT_SECRET="Client Secret"
    - USER_EMAIL="Your Partners Portal account email"
    - APP_NAME="Your app name"
    - VITE_APP_TEMPLATE_API="http://localhost:3400"

### 9. Run applications
- At the root of the project to start both `app-template-vite` and `app-template-node`, run the following command:
  ```bash
  yarn dev
  ```
  ![image](https://github.com/TiendaNube/nimbus-app-template-react/assets/68255205/b8f55eb1-f487-4111-af8a-5be24ed7619a)

### 10. Change redirect URL at the Partners Portal
- After install app at store, go back to the Partner Portal and navigate to the update page of your app
![image](https://github.com/TiendaNube/nimbus-app-template-react/assets/68255205/d687d3d0-ef40-4a3f-ae29-03786d9cc3fd)
- Change the `Redirect URL` to `http://localhost:8000`.

### 11. Access the store and install the app
- Log in to your store (if you're not already logged in).
![image](https://github.com/TiendaNube/nimbus-app-template-react/assets/68255205/51fa8cfa-7bee-4a7b-a61d-69d277f0e314)
- Then install the app by adding `/apps/:app-id/authorize` to your store URL and confirm the installation.
![image](https://github.com/TiendaNube/nimbus-app-template-react/assets/68255205/328ac0b6-2890-4568-9a4d-a3ed367ff39f)


### 12. Test the app
- Now, your app is ready to be used.


### 13. Support & Help

We are here to provide you with the support and assistance you need. If you have any questions or require further assistance, please don't hesitate to reach out to us. Here are a few ways you can get in touch:

- **Help Section:** Visit Partners Portal help section for comprehensive resources and guidance.

- **Issue Tracker:** If you encounter any issues or bugs related to our project, you can create a new issue on our GitHub repository. 
- Visit [this link](https://github.com/TiendaNube/nimbus-app-template-react/issues) to access the issue tracker and provide detailed information about the problem you're facing.

- **Contact by Email:** For any additional feedback, inquiries, or specific concerns, feel free to contact us via email. You can reach us at either ecosystem-feedback@nuvemshop.com.br or ecosystem-feedback@tiendanube.com.
