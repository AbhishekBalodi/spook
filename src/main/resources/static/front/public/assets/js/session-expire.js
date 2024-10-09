// Declare variables for timers
let warningTimeout;  // Timer for showing warning message
let logoutTimeout;   // Timer for auto logout

// Constants for session timeouts
const sessionTimeoutInSeconds = 1800;  // Example: 30 minutes (1800 seconds)
const warningTimeInSeconds = 300;      // Show warning 5 minutes before timeout

// Function to start session timers
const startSessionTimers = () => {
    // Start the warning timer
    warningTimeout = setTimeout(showTimeoutWarning, (sessionTimeoutInSeconds - warningTimeInSeconds) * 1000);

    // Start the logout timer
    logoutTimeout = setTimeout(autoLogout, sessionTimeoutInSeconds * 1000);
};

// Function to reset the session timers
const resetSessionTimers = () => {
    // Clear existing timers
    clearTimeout(warningTimeout);
    clearTimeout(logoutTimeout);

    // Restart the timers
    startSessionTimers();
};

// Function to show the session timeout warning
const showTimeoutWarning = () => {
    // Uncomment this line if you want to show a warning message
    // alert("Your session will expire in 5 minutes. Please save your work or continue browsing to stay logged in.");
};

// Function to handle auto logout
const autoLogout = () => {
    window.location.href = '/login?sessionExpired=true';  // Redirect to login page
};

// Add event listeners to reset session timers on user interaction
window.addEventListener('load', startSessionTimers); // Start session timers when the page loads
window.addEventListener('mousemove', resetSessionTimers); // Reset timers on mouse movement
window.addEventListener('keypress', resetSessionTimers); // Reset timers on keypress
window.addEventListener('click', resetSessionTimers); // Reset timers on mouse click

// If necessary, export the functions (optional depending on where you'll use this module)
// export { startSessionTimers, resetSessionTimers, showTimeoutWarning, autoLogout };
