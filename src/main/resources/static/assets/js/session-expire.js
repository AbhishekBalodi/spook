 let warningTimeout;  // Timer for showing warning message
        let logoutTimeout;   // Timer for auto logout

        const sessionTimeoutInSeconds = 1800;  // Example: 30 minutes (1800 seconds)
        const warningTimeInSeconds = 300;      // Show warning 5 minutes before timeout

        function startSessionTimers() {
            // Start the warning timer
            warningTimeout = setTimeout(showTimeoutWarning, (sessionTimeoutInSeconds - warningTimeInSeconds) * 1000);

            // Start the logout timer
            logoutTimeout = setTimeout(autoLogout, sessionTimeoutInSeconds * 1000);
        }

        function resetSessionTimers() {
            // Clear existing timers
            clearTimeout(warningTimeout);
            clearTimeout(logoutTimeout);

            // Restart the timers
            startSessionTimers();
        }

        function showTimeoutWarning() {
            //alert("Your session will expire in 2 minutes. Please save your work or continue browsing to stay logged in.");
        }

        function autoLogout() {
            window.location.href = '/login?sessionExpired=true';  // Redirect to login page
        }

        // Start session timers when the page loads
        window.onload = startSessionTimers;

        // Reset session timers on any user interaction
        window.onmousemove = resetSessionTimers;
        window.onkeypress = resetSessionTimers;
        window.onclick = resetSessionTimers;