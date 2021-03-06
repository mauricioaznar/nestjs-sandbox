<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## TODO

### Currently implementing



* redesign home page
* add validation for file types in react (maybe in server too?)
* new pagination system
* re do notes
  * rename notes to logs
* Text field (custom yup function)
  * telephone8
  
  
### Improvements


* filtering by public all and user todos
* (bug) deleting a todo: when having multiple pages and when the last todo on the page is being deleted, breaks pagination.


### Issues

* errors on console [month picker bug](https://github.com/mui-org/material-ui/issues/28352)
* animation issue/enhancement [Enter and leave overlapping](https://github.com/pmndrs/react-spring/issues/1064)

## Done

### 15-02-2022

* offset pagination

### 14-02-2022

* session expired
* allow console.error on react
* move every error to global message system

### 13-02-2022

* string sorting
* improve ux of expired token 
* create global message system (react)
* preserve file end line character when committing to github

### 12-02-2022

* include Route Groups
* complex next formik form
  * nested inputs (reduced boilerplate)
  * related inputs
  * improved typing
* typescript inference when using functions
  * [Infer arguments](https://catchts.com/infer-arguments)
  * [dot notation vs array indexing](https://stackoverflow.com/questions/48535201/why-does-typescript-not-give-an-error-when-indexing-into-non-indexable-types-an)
  * [subtype](https://stackoverflow.com/questions/56505560/how-to-fix-ts2322-could-be-instantiated-with-a-different-subtype-of-constraint)

### 11-02-2022

* clean grupo inopack database
* nest js deprecated error (@Injectable class not allowed on imports for the next major version)
* dialog form validation
  * error identified on the clearing of cache
* improve ux network error
* installed sandbox-server on the production server

### 10-02-2022

* optimize nestjs-server scripts (too much repetion)
* sx not working in intellij
* redo ui-engineering
* redo programs


### 08-01-2022

* start pipeline only when commit on master branch


### 06-01-2022

* add code snippet to personal portfolio
  * delete user linux
* continuous integration
  * add jenkinsfile to project
* add a program to each grouping
* change app-variant to another program
* Main.tsx to AuthorizationWrapper.tsx
  * Separate auth from providers.
* move app configuration into one file -> index.ts
* App.tsx to ProgramHandler.tsx
* group folders inside (templates)? according to their similarity
  * renamed to programs


### 03-01-2022 

* added ui engineering problems

### 31/12/2021

* save md files in postgres
* update md files
* delete md files
* only allow author to update and delete md file


### 28/12/2021

* Changed layout permanent sidebar
* Added remaining ui engineer challenges


### < 11/12/2021

* Array item need to display an error when no item has been specified.


### < 08/12/2021

* file upload
  * delete file if exists
* username must be unique
* refactor custom rules on MauTextField
* refactor useAppVariant
* todo check with react router typescript (history.location.state?.todo as GetTodosQuery ["todos"] [number] || undefined)

### < 29/11/2021

* user admin
* user edit and delete when user admin is true

### < 27/11/2021

* Text field custom rules
  * email
* improve menu
  * dry code
* improve todo cards
  * dry code
  * beautify card layout


### < 26/11/2021

* menu with filter properties
* add layout to cards
* code organization
    * organize theming functionality (separate logic inside one file)
* add icons to themes
* (bug) todos filtering by year-month is not filtering correctly when todo is first day of the month.

### < 25/11/2021

* New coloring schema

### < 24/11/2021

* improve mongoose filtering
* date picker wrapper

### < 10/11/2021

* remember pagination on react
* order by _id

### < 09/11/2021

* filter by date
* create MauCheckInput
* toaster when todo query fails

### < 08/11/2021

* pagination mechanism
    * [Cursor pagination graphql mongodb](https://slingshotlabs.io/blog/cursor-pagination-graphql-mongodb/)

### < 07/11/2021

* archive property on todos
* query by archive

### < 05/11/2021

* lock property on todos
* dark mode
* login leaking memory in front
* server validation for properties (required, date, email)
* client validation for properties (required, date, email)

### < 04/11/2021

* validate that the user is correct on update and delete (currentUser === todo.user)
* react animations
* todo move this to currentUser decorator
* todo maybe add some sort of validation to args { connectionParams:  { authorization: string; }}
* todo erase cache when logged out of application
* make a proper intersection for CatInputType
* date formatting react

## Resources

* [Graphql example](https://github.com/EricKit/nest-user-auth/tree/master/src/auth)
* [restart nginx without sudo](https://stackoverflow.com/questions/3011067/restart-nginx-without-sudo)