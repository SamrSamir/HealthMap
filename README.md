# HealthMap
1- Install AngularJS, Cordova, and Ionic

2- Download the project

3- Run on the terminal the following commands:

> $ cd HealthMap 

# To run on android platform
> $ ionic run android

#To run on android platform
> $ ionic run ios

4- Visit our visualisation web portal at: 
> http://ece.adu.ac.ae/HealthMap

=====================================================================

# About the project
“HealthMap” is a multi platform mobile application that crowd-sources information to compare environmental factors and occurrence of 
symptoms of allergies and respiratory diseases. Reporting of this data is simple, efficient, and intuitive. First off, users can learn 
about the names and the exact description of their allergy or respiratory disease symptoms through the media library in “HealthMap”. 
Next, our interactive wizard walks the user through various inquisitions to collect data such as type, frequency and intensity of the 
cough, personal stats, colour of the phlegm, symptoms experienced such as shortness of breath, wheezing, sneezing, nasal obstruction, or 
itchy eyes, diagnosis of the doctor, if available, and graphical selection of the latest locations that the user has been in. Automatic 
detection of the user’s current location, and collection of the corresponding environmental factors are also performed.

Our database is updated with user-filled data in realtime for a seamless system user interaction experience. The user can visualise all of the crowd-sourced data collected throughout the globe using either our mobile application, or our dedicated web portal. Each marker on our world map interface, a symptom map with NASA provided data, represents a report instance. Upon a simple click of such a marker, the user is shown a comprehensive and visually rich report of the health and environmental factors information to better conceptualise the relationship between them.

Know more about the app at: 
> https://www.youtube.com/watch?v=gDcVby2cAR4

=====================================================================

# About the mobile application
<span style='align: center;'><img align="center" src="/../master/readmeScreenshots/mobileApp/main.png?raw=true" alt="Main Menu"></span>

<!--![Main Menu](/../master/readmeScreenshots/mobileApp/main.png?raw=true "Main Menu")-->

Our mobile application’s main menu is shown above. There are three items for the user to choose from. By clicking on “Know Your Symptoms”, the user is directed to a symptoms media library. This includes videos about the various respiratory symptoms that users may be suffering from with details about how to identify them and what feelings the user might have during the symptom duration. The interface of this media library is shown below.

<img align="center" src="/../master/readmeScreenshots/mobileApp/tab11.png?raw=true" alt="Know Your Symptoms"><img align="center" src="/../master/readmeScreenshots/mobileApp/tab11.png?raw=true" alt="Know Your Symptoms">

<!--![Know Your Symptoms](/../master/readmeScreenshots/mobileApp/tab11.png?raw=true "Know Your Symptoms") ![Know Your Symptoms](/../master/readmeScreenshots/mobileApp/tab12.png?raw=true "Know Your Symptoms")-->

For the users to map their symptoms, they can use our simple interface to input all data about their health condition in relation to respiratory diseases. Moreover, environmental factors data is automatically retrieved from NASA open data sources to correlate to the users' crowd-sourced health data. Samples of a user's journey to map their symptoms are shown below.

![Map Your Symptoms](/../master/readmeScreenshots/mobileApp/tab21.png?raw=true "Map Your Symptoms") ![Map Your Symptoms](/../master/readmeScreenshots/mobileApp/tab22.png?raw=true "Map Your Symptoms") ![Map Your Symptoms](/../master/readmeScreenshots/mobileApp/tab23.png?raw=true "Map Your Symptoms") ![Map Your Symptoms](/../master/readmeScreenshots/mobileApp/tab24.png?raw=true "Map Your Symptoms")![Map Your Symptoms](/../master/readmeScreenshots/mobileApp/tab25.png?raw=true "Map Your Symptoms") ![Map Your Symptoms](/../master/readmeScreenshots/mobileApp/tab26.png?raw=true "Map Your Symptoms")
In the first view, users are presented with a view to choose their cough type, which they are now familiar with after they have viewed all the information about them in our media library. Next the users are shown a histogram of the frequency and the intensity of their cough. This is accomplished through the easy utilisation of a press of the button corresponding to the intensity of the cough every time they do for an hour. For the purposes of this demo, the time of both of the first two views is limited to 10 seconds after which the users are automatically directed to the next view. However, this can be easily changed to the original intended sampling period of an hour. The users are then required to choose the colour of their phlegm though colour coded buttons. Next, the users write down their allergies if any, and select their age group. The app then moves to the next view where users are required to fill information about their personal stats such as gender, weight, height, and smoking frequency, if they smoke. Users are then directed to select all of the symptoms that apply to their case from an extensive list through a simple check. The users are then presented with a yes/no question at the end of the list; whether they have been to a doctor or not. If yes, the users are directed to a similar interface to choose their doctor's initial diagnosis from a list of respiratory diseases. If the users have not been to a doctor, they immediately move to a Google map interface where they can easily choose all the locations that they have been to recently. The map is automatically zoomed in to the user's current location for ease of use. At the same instance, NASA climate data is being automatically collected using the coordinates of the user's current location. A submit button appears to the user only after the data request has been sent to assure maximum efficiency. In case of both success or failure of the data delivery, in case that location does not have all the data that we are requesting for, the submit button appears to the user to allow him/her to finish up their report.


To view all of the crowdsourced and climate data collected, users can select to view our health map with markers to denote each and every report submitted. Upon a click of a marker, users can then view a visually detailed report of the information as shown below.

![View Health Map](/../master/readmeScreenshots/mobileApp/tab31.png?raw=true "View Health Map") 
![View Health Map](/../master/readmeScreenshots/mobileApp/tab32.png?raw=true "View Health Map")
![View Health Map](/../master/readmeScreenshots/mobileApp/tab33.png?raw=true "View Health Map") 
![View Health Map](/../master/readmeScreenshots/mobileApp/tab34.png?raw=true "View Health Map")

=====================================================================

# About the web portal

The HealthMap web portal is a dedicated symptom visualization map, allowing the users to interact with the worldwide crowd-sourced data of health symptoms and related environmental factors. 

![Web Portal 1](/../master/readmeScreenshots/websiteMainPageScreenshot.png?raw=true "Main page")

A simple map interface represents all report instances provided by users on a global scale with localized markers. Interactive aspects of the map permit users to easily zoom in and view all of reports from a certain region or city. The user can view each report separately by simply clicking on the dedicated marker, which directs him/her to a visually rich report representing all collected data and statistics.

![Web Portal 2](/../master/readmeScreenshots/webPortal2.png?raw=true "Symptom map")

Each report depicts comprehensive information related to health and environmental factors to better conceptualise the relationship between them. Each report focuses on respiratory diseases, as environmental factors and air quality information largely influence the development of such diseases. As such, each report serves as a promising tool to analyze and study the connections between health and environmental factors on a global scale. This has a direct impact on the study of how the global climate change influences the global health status. 

![Web Portal 3](/../master/readmeScreenshots/webPortal3.png?raw=true "Generated report")


