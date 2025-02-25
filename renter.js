
* {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

body {
    background-color: #f4f4f4;
    color: #333;
    border-right: 10px solid rgb(181, 172, 255);
    border-left: 10px solid rgb(181, 172, 255);
    overflow-x: hidden;
}

body main {
    padding: 20px;
    height: auto;
min-height:89vh;

}

#brandphoto {
    width: 5%;
    height: auto;
    float: left;
    position: relative;
    left: 5vw;
}

header {
    background-color: #B5ACFF;
    width: 100%;
    height: 4vw;
    color: #fff;
    padding: 20px;
    text-align: center;
    position: fixed;
    z-index: 1000;
}

header h1 {
    margin: 0;
    font-size: 2.5vw;
    position: relative;
    right: 35%;
    color: #000000;
}

header h2 {
    margin: 0;
    font-size: 2vw;
    position: relative;
    right: 35vw;
    color: #000000;
    text-align: center;
    margin-bottom: 20px;
}

nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

nav ul li {
    display: inline-flex;
    margin: 0 15px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: large;
    position: relative;
    left: 20vw;
    bottom: 4vw;
}

nav ul li a {
    color: black;
    text-decoration: none;
}

#filter-button{
    font-size: large;
    text-decoration: none;
    background-color: #B5ACFF;
}

.modal {
    display: none;
    position: fixed;
    z-index: 9999;
    right: 69vw; /* Adjust based on your layout */
    top: 1vw;
    width: 30%; /* Adjust to your preferred width */
    height: 90%; /* Keeps the height at 90% of the viewport */
    overflow-y: auto; /* Enables vertical scrolling when content overflows */
    padding: 20px; /* Optional, for some spacing inside the modal */
    box-sizing: border-box; /* Ensure padding is included in the width and height */
    background-color: white; /* Background color for better contrast */
    border-radius: 10px; /* Optional, adds rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional, adds a shadow effect */
}


.modal-content {
    background-color: #fefefe;
   
    padding: 20px;
    border: 1px solid #888;
   
    width: 90%;
   
    padding: 20px;
    background-color: #dedbe3;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
#filterModel{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    background-color: #fff;
    position:fixed;
    background-color: #9e0c0c;
}
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover {
    color: black;
}

#filterForm label {
    display: block;
    margin-top: 10px;
}

#filterForm input, #filterForm select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
}

#filterForm button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: green;
    color: white;
    border: none;
    cursor: pointer;
}

#filterForm button:hover {
    background-color: darkgreen;
}

/* Footer */
footer {
    background-color: rgb(181, 172, 255);
    color: white;
    text-align: center;
    padding: 10px 0;
    width: 100%;
}

footer p {
    margin: 0;
    font-size: 14px;
}

footer strong {
    color: #04AA6D;
}


#search{
    position: relative;
    top: 6.5vw;
    
}

.search-container {
    position: relative;
    display: inline-block;
    width: 100%;
    left: 25%;
  
}

/* Styling for the search box */
#search-box {
    padding: 10px;
    width: 50%;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 16px;
   
   
}


/* Popup Modal */
.popup-modal {
    display: hidden; /* Keeps it hidden initially */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    justify-content: center;
    align-items: center;
}

/* Popup Content */
.popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 600px;
    width: 90%;
    max-height: 90%;
    overflow-y: auto; /* Enables scrolling if content overflows */
    text-align: center;
    position: relative;
    border: 5px solid rgb(181, 172, 255); /* Reduced border size for better aesthetics */
    position: relative;
left: 25vw;
}

/* Close Button */
.close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 35px;
    cursor: pointer;
    color: black;
}

.close-btn:hover {
    color: #9e0c0c;
}

/* Popup Image */
.popup-content img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
    border-radius: 10px;
    margin-bottom: 15px;
}

/* Table Styling */
.popup-content table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
}

.popup-content th, .popup-content td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.popup-content th {
    background-color: #f4f4f4;
    width: 40%;
}

/* Contact Information */
#contactInformation {
    text-align: left;
    margin-top: 15px;
}

#contactInformation p {
    font-size: 1.1em;
    color: #333;
    font-weight: bold;
}
