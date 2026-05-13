# **💻Login–Register System using PHP, MySQL, MongoDB & Redis**

This is a full-stack authentication system that supports user registration, login, profile management, and session handling using multiple databases and modern web technologies.
__________________________________
## 🔁System Flow

Register → Login → Redis Session → Profile View → Profile Update → Logout
__________________________________
## 🛠️Tech Stack

### Frontend 
* HTML
* CSS
* Bootstrap
* JavaScript
* jQuery AJAX

### Backend

* PHP

### Databases

  * MySQL → Authentication data
  * MongoDB → User profile data
### Cache / Session 

  * Redis (Memurai)

### Client Storage 

  * LocalStorage

__________________________________

## 📁Folder Structure

```
my-project/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── login.js
│   │   ├── register.js
│   │   └── profile.js
│
├── php/
│   ├── db.php
│   ├── login.php
│   ├── register.php
│   ├── profile.php
│   └── logout.php
│
├── index.html
├── login.html
├── register.html
└── profile.html
```
____________________________________
## 🚀Project Workflow

###  Registration

* User enters details like name, email, password, contact, etc.
* Password is securely hashed using PHP password_hash()
* Data is stored in:

    * MySQL → Authentication data
    * MongoDB → Profile details
##
###  Login

* User logs in using email and password
* Password is verified using password_verify ()
* On success:

     * A Redis session ID is created
     * Session stored in Redis
     * Email stored in LocalStorage
##
###  Profile Page

* User data is fetched from:
  * MongoDB (profile data)

* Data is displayed dynamically using AJAX
* User can click Update Details to edit information
##
###  Profile Update

* Updated data is sent using AJAX to PHP backend
* MySQL + MongoDB both are updated
* Ul switches back to normal view after save
##
###  Logout

* Redis session is deleted
* LocalStorage cleared
* User redirected to login page
________________________________________  
## 🔐Security Features

* Password hashing using password_hash()
* Prepared statements (prevents SQL injection)
* Redis-based session handling
* No PHP session usage (as per requirement)
* AJAX-only communication (no form submission)
___________________________________________
## ⚙️Installation & Setup Guide

### Requirements

* XAMPP (Apache + MySQL)
* PHP 7+
* MongoDB installed
* Redis server (Memurai for Windows)
* Composer
##
### Clone the repository
    git clone https://github.com/SAMAR-A17/my-project.git
##
### Move to XAMPP folder
    C:\xampp\htdocs\my-project
##
### Start servers
Start in XAMPP:
* Apache
* MySQL

Start
* MongoDB sever
* Redis (Memurai)
##
### Create MySQL database
* Open phpMyAdmin
* Create database
   * test
* Import users table
##
### Install MongoDB PHP driver
    composer require mongodb/mongodb
##
### Run Project
    http://localhost/my-project/
____________________________________________
## ⚡Learning Highlights

This project helped in understanding:

### Authentication System

* Secure login & registration flow
* Password hashing techniques
##
### Database Integration

* MySQL for structured authentication data
* MongoDB for flexible profile storage
* Multi-database synchronization
##
### Session Management

* Redis-based session handling
* Token-style session storage
* Secure session validation
##
### AJAX Communication

* Fully asynchronous frontend-backend communication
* No page reload system
* Smooth UX updates
##

### Frontend Development

* Bootstrap responsive UI
* jQuery DOM manipulation
* Dynamic profile editing system
##

### System Design Thinking

* Separation of concerns (frontend/backend)
* Scalable architecture using multiple databases
* Real-world login system simulation
_______________________________________
## 🧑‍💻Developed By
### MOHAMED SAMARULLAH S

