Lawn Mower Game
A 3D lawn-mowing simulator built with Three.js. Navigate your mower through various stages, cut the grass to clear the level, and upgrade your mower in the shop using earned coins!

🎮 Gameplay Features
Dynamic Environments: Experience a transition between day and night cycles.

Weather System:

Morning Stages: Drifting clouds across the sky.

Night Stages: A massive celestial moon and realistic randomized rain particle effects.

Progression: Complete stages to earn coins and unlock the ability to customize your mower's appearance in the shop.

Responsive Controls: Built-in joystick support for smooth mobile and desktop navigation.

🏗️ Technical Architecture
Core Systems
Three.js: Powers the 3D rendering engine.

WeatherSystem: A dedicated system that manages environmental entities (Moon, Rain, Clouds).

SceneManager: Handles the scene lifecycle, lighting, and theme transitions (Day/Night).

GameStateManager: Tracks progress and detects when the lawn is fully mowed.

Key Implementation Details
Massive Moon: Implemented as a large-scale SphereGeometry (radius 45) pinned to the camera's perspective at an astronomical distance (-850 on the Z-axis) to maintain a realistic horizon scale.

Randomized Rain: Uses THREE.Points with per-particle velocity and randomized jitter to prevent the "looping" look common in simple particle systems.

Camera Frustum: The camera's far clipping plane was extended to 3000 to allow for deep-space object rendering.

📂 Project Structure
Plaintext
src/
├── core/
│   ├── Game.js           # Main game loop and system integration
│   ├── Camera.js         # Camera configuration and far-plane settings
│   └── SceneManager.js   # Background, lighting, and stage clearing
├── entities/
│   ├── LawnMower.js      # Player-controlled entity
│   ├── Moon.js           # Celestial moon entity
│   ├── Rain.js           # Particle-based rain system
│   └── Cloud.js          # Moving sky entities
├── systems/
│   ├── WeatherSystem.js  # Orchestrates environmental transitions
│   ├── CoinSystem.js     # Currency management
│   └── ... (Collision, GrassCutting, etc.)
🚀 How to Run
Clone the repository: git clone <repository-url>

Install dependencies: Ensure you have a modern browser environment.

Serve the files: Use a local development server (like Live Server in VS Code or npx serve) to ensure Three.js modules load correctly.

Open in Browser: Navigate to index.html.

🛠️ Customization
To modify the environmental feel:

Moon Size/Position: Edit src/entities/Moon.js to change the radius or distance.

Rain Intensity: Update the count property in src/entities/Rain.js.

Weather Timing: The theme toggles automatically in Game.js via the setupStage() method.

💡 Rendering Logic
The game relies on a specialized rendering pipeline to ensure that environment objects are correctly layered.

Built with passion for Three.js development.
