![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/319cf622-4b01-4338-8a9c-9dd84007d924)
# CANDIDATES MANAGEMENT APP


This App uses a **Mongo** database, an **Express** server and a **React** App.\
You will need [Docker](https://www.docker.com/products/personal/) installed to run this app.\
Or you will have to run each app separately.

## Published Sandbox
http://ec2-54-146-200-77.compute-1.amazonaws.com:3000/

## Available Scripts

### `docker-compose up`
1. Creates `mongo`, `candidates-management-app-candidates-api`, and `candidates-managment-app-candidates-web` images.
2. Creates `mongo_candidates_db`, `candidates-api`, and `candidates-web` containers.
3. Creates and populates (if they don't exist yet) Candidates and Rejected Reasons schemas on Mongo.
4. Starts app on http://localhost:3000.

Make sure you have the ports `27017`, `4000`, and `3000` available

![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/594dc938-c2ef-4cf1-bc89-10583dbab901)


## About the App
### Lobby
- When you first enter the app you will be asked for your name.
- Your name will be stored on the browser's local storage, so you don't have to enter it again at least you want to.
- Your name will be used to update the Candidates and to save your columns filter
 ![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/c2786436-3824-46ff-8209-151353a9e759)


### Management page
- Once you enter your name you will see the management page:
![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/d60b858d-c131-4f88-8b5a-0a11b1e54c62)


### Candidates table
- Here you will see the candidates paginated to 10 items per page.
- The row in red means that the candidate is currently rejected, and in green that is currently approved.
![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/abecb1c7-812a-46d7-9e66-16a54d411096)


### Candidate management
- If you expand the row of a candidate you will see the rejected reasons loaded for that candidate.
- You can save more than one rejected reason for a candidate.
- When you save the rejected reasons, your recruiter name will be saved too as the last one that modified that candidate (this is for filtering propose, explaining that below).
- If you, for example, delete all the rejected reasons of a candidate and save, you will have the row color updated once you close the expanded component.\
![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/fd4dca0e-e29b-4b77-a931-929c0b6fb31f)


### Hide Columns
- You can select the columns you want to hide.
- The list of hidden columns is also stored on your local storage along with your recruiter name.
- This means that if you re-enter the app later or if you change to another recruiter name and then go back to the first one, you will see the hidden columns saved for each recruiter name.\
![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/50bf0d1a-9a04-4208-8ab5-8896221655c4)


### Filters
There are a couple of filters that you can apply (you can apply more than one):
![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/1efe66e4-8006-43e3-af5d-974031e9de3b)


`ALL / Only Me`: 'Only Me' will show only the candidates that your recruiter's name is the last one that saved a rejected reasons update.\
`Rejected & Approved / Rejected / Approved`: It will show only Approved/Rejected candidates or both.\
`Search text`: It will search the input text on the applicable columns.

### Change Recruiter Name
- You can change your recruiter name, it will redirect you to the lobby page.
- Your hidden columns list will not be deleted, if you re-enter with the same candidate name in the future you will see them again.
- A list of hidden columns is stored with each recruiter's name.\
![image](https://github.com/nicolas-logo/candidates-management-app/assets/26005281/d4058f7b-2c8c-4051-baaf-d071a78689f3)


### Technical Annotations:
- The recruiter name entered is not case sensitive.
- Search text will not be applied to boolean and URL columns.
- Searching and filtering have a debounce of 500ms, preventing sending multiple requests.
- A cancel token logic is applied when sending a request, this means that if a previous request is pending and a new one is sent, the previous one is canceled.
- An item is set on the local storage for each recruiter's name once it hides a column.
- Redux is configured to easily be expanded.
- Nothing is hardcoded, you have config files on `candidates-api\src\data\configData.js` and `candidates-web\src\utils\configData.js`
- Both, `candidates-api` and `candidate-web` have Jest and React tests that can be run by `npm test`
