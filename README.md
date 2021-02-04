![Game of Life in 3D](public/GameOfLife3d.PNG)

This project is a recreation of John Conway's famous cellular automaton ruleset, the Game of Life, in 2D and 3D. On the left is a standard 2D visualization of the Game of Life and on the right is a 3D visualization in which the top most layer is the most recent generation reflected on the left and the lower layers are comprised of previous generations of cells stacked on top of each other.

Here's a "Fun" video describing the motivations behind the project as well as a demonstration and overview of the mechanics:
https://www.youtube.com/watch?v=9w_ILpm1P0g&feature=youtu.be

The main technologies used in this project are:
![React Logo](https://miro.medium.com/max/3600/1*HSisLuifMO6KbLfPOKtLow.jpeg)

React is used to render the standard Game of Life in 2D along with the button interface and the ability to click and alter an individual cell's state.

![Redux Logo](https://daqxzxzy8xq3u.cloudfront.net/wp-content/uploads/2019/04/21032431/redux-cover-imgage-1024x768.jpg)

Redux is used as state management to store the state of each individual cell, whether they are dead or alive.

![Three.js Logo](https://ucarecdn.com/22a0a69b-689f-46c9-866b-57650f31fde9/)

Three.js is used to render the Game of Life in 3D.

To deploy locally:

1. npm install
2. npm run start-server
3. open locally on port 5500

Functionality:

- Play button starts simulation
- Pause button pauses simulation
- Clear button clears simulation
- Random button clears simulation and initializes a random first generation of cells
- Click on cells to alter whether they are dead or alive (First generation)
- Camera controls by clicking and dragging the mouse to rotate the 3D grid and using the mousewheel to zoom in/out
