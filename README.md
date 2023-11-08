![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/319cf622-4b01-4338-8a9c-9dd84007d924)
# CANDIDATES MANAGEMENT APP

This App uses a **Mongo** database, an **Express** server and a **React** App.\
You will need [Docker](https://www.docker.com/products/personal/) installed to run this app.\
Or you will have to run each app separately.

## Available Scripts

### `docker-compose up`
1. Creates `mongo`, `candidates-management-app-candidates-api`, and `candidates-managment-app-candidates-web` images.
2. Creates `mongo_candidates_db`, `candidates-api`, and `candidates-web` containers.
3. Creates and populates (if they don't exist yet) Candidates and Rejected Reasons schemas on Mongo.
4. Starts app on http://localhost:3000.

Make sure you have the ports `27017`, `4000`, and `3000` available

![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/a2455c28-aaac-40fb-bf11-64b1fd926116)

## About the App
### Lobby
- When you first enter the app you will be asked for your name.
- Your name will be stored on the browser's local storage, so you don't have to enter it again at least you want to.
- Your name will be used to update the Candidates and to save your columns filter
  ![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/31a34673-db46-49b1-a1e6-f4ca44de927b)

### Management page
- Once you enter your name you will see the management page:
![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/85342722-ab20-4e04-afb6-0fb77f401f39)

### Candidates table
- Here you will see the candidates paginated to 10 items per page.
- The row in red means that the candidate is currently rejected, and in green that is currently approved.
![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/9ce47580-7b8f-4f57-99e5-8587f8d42005)

### Candidate management
- If you expand the row of a candidate you will see the rejected reasons loaded for that candidate.
- You can save more than one rejected reason for a candidate.
- When you save the rejected reasons, your recruiter name will be saved too as the last one that modified that candidate (this is for filtering propose, explaining that below).
- If you, for example, delete all the rejected reasons of a candidate and save, you will have the row color updated once you close the expanded component.\
![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/077c81bd-b047-4146-a04c-027b1c3be922)

### Hide Columns
- You can select the columns you want to hide.
- The list of hidden columns is also stored on your local storage along with your recruiter name.
- This means that if you re-enter the app later or if you change to another recruiter name and then go back to the first one, you will see the hidden columns saved for each recruiter name.\
  ![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/fb5c5c59-050d-4460-8a1c-fadbe1a1a65c)

### Filters
There are a couple of filters that you can apply (you can apply more than one):
![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/caaca555-4982-4515-b4f6-c08dcd54d05a)

`ALL / Only Me`: 'Only Me' will show only the candidates that your recruiter's name is the last one that saved a rejected reasons update.\
`Rejected & Approved / Rejected / Approved`: It will show only Approved/Rejected candidates or both.\
`Search text`: It will search the input text on the applicable columns.\

### Change Recruiter Name
- You can change your recruiter name, it will redirect you to the lobby page.
- Your hidden columns list will not be deleted, if you re-enter with the same candidate name in the future you will see them again.
- A list of hidden columns is stored with each recruiter's name.\
![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/f46f7f0e-8328-441c-96fd-c5caa98e641b)

### Technical Annotations:
- The recruiter name entered is not case sensitive.
- Search text will be applied to boolean and URL columns.
- Searching and filtering have a debounce of 500ms, preventing sending multiple requests.
- A cancel token logic is applied when sending a request, this means that if a previous request is pending and a new one is sent, the previous one is canceled.
- An item is set on the local storage for each recruiter's name once it hides a column.
- Redux is configured to easily be expanded.
- Nothing is hardcoded, you have config files on `candidates-api\src\data\configData.js` and `candidates-web\src\utils\configData.js`
- Both, `candidates-api` and `candidate-web` have Jest and React tests that can be run by `npm test`
