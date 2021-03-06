# CS360 Final Project: Save the Bees

## Project Overview
A Data Visualization Project on the loss of bee colonies and the stressors triggering colony loss throughout the United States.

## Table of Contents
- [Features](#Features)
- [Website Link](#Website-Link)
- [User Manual](#User-Manual)
- [Tech Stack](#Tech-Stack)
- [Dependencies](#Dependencies)

## Features
- US Hex Heat Map for bee colony population across states in the US for 2015-2021. 
- Parallel Coordinate Chart for the 5 regions of the US (Northeast, Southeast, Midwest, Southwest, West) that maps bee colony population, bee colony losses, bee colonies added, and bee colonies renovated for 2015-2021.
- Line charts for amount of colonies lost and added from 2015-2021.
- Bee swarm that plots the effectiveness of bee colony stressors from 2015-2021. 

## Website Link
[Save the Bees](https://amrubal.github.io/cs360proj/)

## User Manual
- Clone repository by running 
    ```git clone https://github.com/amrubal/cs360proj.git ```
- Navigate to folder path/to/cs360proj and open folder in your chosen IDE/editor (I recommend webStorm or VScode)
    - You can also commit and push via your chosen IDE
- Create a new branch by running 
     ```git checkout -b <NAME_OF_NEW_BRANCH> ```
- Run index.html locally to see what the project currently looks like 
- Add any additions/changes of your choosing 
- Commit new changes by running 
    ```git add <NEW_FILES> to add the new files``` and then ```git commit -m <COMMIT_MESSAGE>``` 
- Push the newly committed changes to github by running 
    ```git push origin <NAME_OF_NEW_BRANCH>```

## Tech Stack
- [D3](https://d3js.org)   
- [Version of D3 Used](https://d3js.org/d3.v4.js) 
- [d3-svg-legend](https://d3-legend.susielu.com)
- [JavaScript](https://www.javascript.com)

## Dependencies 
- The data for each visualization is in its respective folder 
    - ex. the data for the parallel coordinates chart for the year of 2015 is in the "pCoordinates" folder and the data file for 2015 is called "data_2015.csv"
- It is important(!) to use this data and not edit it for the visualizations already made as I edited the data for each visualization
   - For more data on bee colonies in the US, visit [Bee Colony Data Repository](https://github.com/rfordatascience/tidytuesday/tree/master/data/2022/2022-01-11)





