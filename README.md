# API documentation 
## Tasks
>**POST /tasks/**
>- **description**: creates a new task;
>- **security**: none;
>- **body**: 
>  - title: string (validation: string, min 3, max 30, required);
>  - description: string (validation: string, min 3, max 150, required);

>**GET /tasks/**
>- **description**: gets all users tasks;
>- **security**: bearerAuth;

>**GET /tasks/:taskId**
>- **description**: gets one users task by task id;
>- **security**: bearerAuth;
>- **parameters**:
>  - taskId: string (validation: number, integer, required)

>**PUT /tasks/:taskId**
>- **description**: updates one users task by task id;
>- **security**: bearerAuth;
>- **parameters**:
>  - taskId: string (validation: number, integer, required)
>- **body**:
>  - title: string (validation: string, min 3, max 30);
>  - description: string (validation: string, min 3, max 150);
>  - status: boolean (validation: boolean);

>**DELETE /tasks/:taskId**
>- **description**: delete one users task by task id;
>- **security**: bearerAuth;
>- **parameters**:
>  - taskId: string (validation: number, integer, required)
## Auth
>**POST auth/register**
>- **description**: register a new user;
>- **security**: none;
>- **body**:
>  - email: string (validation: string, min 3, max 30, required);
>  - password: string (validation: string, RegExp *^[a-zA-Z0-9]{3,30}$*, required);

>**POST auth/login**
>- **description**: authorises a user;
>- **security**: none;
>- **body**:
>  - email: string (validation: string, required);
>  - password: string (validation: string, required);


>**POST auth/logout**
>- **description**: users logout;
>- **security**: bearerAuth;


>**GET auth/refresh**
>- **description**: updates accessToken if refreshToken has not expired;
>- **security**: none;
>- **body**:
   >  - refreshToken: string (validation: string, required);
