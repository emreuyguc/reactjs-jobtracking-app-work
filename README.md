# Job Tracking App Work

###  Stack
* Fw : React
* Syntax : TypeScript
* State Manager : Redux Toolkit
* UI Kit : Antd
* Persistent Store : LocalStorage

### Features
* JobForm custom Validator
* JobList custom filter component
* JobList default sort with antd table
* Dynamic Job Priorities
* Retry every 2 seconds in case of error getting job priorities from backend
* JobList row actions ( only priority edit and confirmed delete)
* Responsive support
* Keeping data on localStorage at the same time with middleware defined in JobStorage
