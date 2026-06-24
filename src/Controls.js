import nipplejs from 'nipplejs';

export function createJoystick() {
    // 1. Ensure the container exists in the DOM
    let zone = document.getElementById('joystick-zone');
    
    // If it doesn't exist, create it programmatically
    if (!zone) {
        zone = document.createElement('div');
        zone.id = 'joystick-zone';
        document.body.appendChild(zone);
    }

    // 2. Initialize the joystick specifically within that zone
    const manager = nipplejs.create({
        zone: zone, // Use the specific div instead of document.body
        mode: 'static',
        position: { left: '15%', bottom: '15%' },
        color: 'white',
        size: 100
    });

    return manager;
}