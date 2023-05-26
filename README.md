<p align="center">
  <a href="https://barterbetter.ca">
    <img src="src/img/logo.png" alt="barter-better-logo" style="margin-top: 2rem;">
  </a>
</p>

# What is Barter Better?

Barter Better is a cashless trading system that enables users to exchange goods and services without the need for cash transactions. We believe that "one person's trash is another person's treasure," and Barter Better aims to bring this philosophy to life by helping reduce the growing waste problem in our world. The system is built with React and offers an intuitive interface that simplifies and streamlines the trading process.

## Installation:

To install Barter Better, follow these steps:

- Clone the repository to your local machine.
- Run npm install to install all dependencies.
- Run npm start to start the development server.
- Add your database environment files to .env.
- You're done!

# Technologies utilized

<p>
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/firebase/firebase-plain-wordmark.svg" title="Firebase" alt="Firebase" width="40" height="40"/>&nbsp;
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/nodejs/nodejs-original.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/npm/npm-original-wordmark.svg" title="npm" **alt="npm" width="40" height="40"/>&nbsp;
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/git/git-original.svg" title="Git" **alt="Git" width="40" height="40"/>&nbsp;
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/github/github-original-wordmark.svg" title="GitHub" **alt="GitHub" width="40" height="40"/>&nbsp;
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/sourcetree/sourcetree-original-wordmark.svg" title="SourceTree" **alt="SourceTree" width="40" height="40"/>&nbsp;
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/vscode/vscode-original-wordmark.svg" title="VSCode" **alt="VSCode" width="40" height="40"/>&nbsp;
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/figma/figma-original.svg" title="Figma" **alt="Figma" width="40" height="40"/>&nbsp;
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/trello/trello-plain-wordmark.svg" title="Trello" **alt="Trello" width="40" height="40"/>&nbsp;
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/canva/canva-original.svg" title="Canva" **alt="Canva" width="40" height="40"/>&nbsp;
</p>

## Usage:

Barter Better is easy to use. Simply create an account, log in, and start trading. You can browse listings and when you find something you want, make an offer! Chat and ask questions, once your offer is accepted, you can arrange to meet up and exchange your goods.

## Features:

- User authentication and authorization.
- Item and service listings with descriptions and images.
- Private messaging between users to negotiate trades and plan meet-ups.
- Notification system for new messages and trade offers.

## Features for Future Implementation:

- Search functionality with filters by category and location.
- Rating system to leave feedback about the trading experience.
- Community listings, ability to trade with a specific group of people pertaining to common interests.

# Contents of Folders

```
 Top level of project folder:
├── node_modules           # This folder is automatically populated when you install the project dependencies.
├── public                 # The entry point of the application.
├── src                    # Contains all the source code in subfolders to better organize.
├── .env                   # Environmental files to access the database.
├── .gitignore             # Specifies which files and directories should be ignored by Git.
├── package-lock.json      # This file is generated automatically when you install dependencies using npm.
├── package.json           # This file is a crucial part of any Node.js project, including React apps.
└── README.md              # The README.md file provides essential information about the project.
────────────────────────────────
 The public folder has the following files:
├── favicon.ico            # Favicon for Barter Better.
├── index.html             # Main HTML file (index.html) where the React app is injected.
└── manifest.json          # Provides metadata and configuration information.
 ────────────────────────────────
 The src folder has the following subfolders and files:
├── components             # Functionality that can be reused across different parts of the application.
      /AddingItem.js
      /ChatMessage.js
      /Confirmation.js
      /ConversationCard.js
      /EditTradeModal.js
      /Footer.js
      /index.js
      /InventoryItem.js
      /MarketplaceCard.js
      /MessageInput.js
      /Navbar.js
      /PreviewCard.js
      /Tab.js
      /TradeCard.js
────────────────────────────────
├── config                 # Configuration files used throughout the application.
      /firebase.js
────────────────────────────────
├── hooks                  # Custom hooks to abstract away complex logic and make it easily reusable.
      /index.js
      /useConditionalFetch.js
      /useFetch.js
      /useReadStorage.js
────────────────────────────────
├── img                    # Stores image assets used within the application.
      /back_arrow.png
      /chat.png
      /exchanging_active.png
      /gear.png
      /home_active.png
      /home.png
      /index.js
      /logo_large.png
      /logo.png
      /more_active.png
      /people_active.png
      /people.png
      /placeholder_image.png
      /placeholder_profile_picture.png
      /search.png
      /up_arrow.png
      /user_active.png
      /user.png
────────────────────────────────
├── pages                  # Represents different pages within the application and contains the components.
      /AddItem.js
      /Chat.js
      /Conversations.js
      /Error404.js
      /Groups.js
      /Home.js
      /index.js
      /Item.js
      /Loading.js
      /Login.js
      /OG.js
      /Preview.js
      /PrivateWrapper.js
      /Profile.js
      /ResetPassword.js
      /Settings.js
      /SignUp.js
      /Trades.js
      /Trading.js
────────────────────────────────
├── styles                 # Folder is used for storing CSS files.
      /addingItem.css
      /chat.css
      /conversations.css
      /footer.css
      /index.css
      /index.js
      /inventoryItem.css
      /inventoryModal.css
      /item.css
      /loading.css
      /login.css
      /marketplace.css
      /messageInput.css
      /navbar.css
      /og.css
      /profile.css
      /settings.css
      /trades.css
      /trading.css
────────────────────────────────
├── App.js                 # Central component defining the main structure and behavior of the application.
└── index.js               # Renders the React components into the DOM.
────────────────────────────────
```

# Names of Contributors

<table align="center" style="margin-bottom: 2.5rem;" >
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/JDMCK"><img src="https://avatars.githubusercontent.com/u/76506664?v=4" width="100px;" alt="Jesse McKenzie"/><br /><sub><b>Jesse McKenzie</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lukechung1020"><img src="https://avatars.githubusercontent.com/u/122319630?v=4" width="100px;" alt="Luke Chung"/><br /><sub><b>Luke Chung</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/karisturgeon"><img src="https://avatars.githubusercontent.com/u/122186990?v=4" width="100px;" alt="Kari Sturgeon"/><br /><sub><b>Kari Sturgeon</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ChauEric"><img src="https://avatars.githubusercontent.com/u/10472303?v=4" width="100px;" alt="Eric Chau"/><br /><sub><b>Eric Chau</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

## Resources and Acknowledgements

- <a href="https://www.canva.com/">Logo created with Canva!</a>
- <a href="https://chat.openai.com/">ChatGPT in assisting with the process.</a>
- <a href="https://fonts.google.com/">Google Fonts for styling our fonts.</a>
- <a href="https://github.com/devicons">Icon's used for README.md.</a>
