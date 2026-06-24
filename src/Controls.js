import nipplejs from 'nipplejs';

export function createJoystick() {
    // Create the joystick in the bottom-left corner
    const manager = nipplejs.create({
        zone: document.body,
        mode: 'static',
        position: { left: '15%', bottom: '15%' },
        color: 'white',
        size: 100
    });

    return manager;
}