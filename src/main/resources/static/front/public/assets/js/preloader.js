// Create the preloader element
var preloader = document.createElement("div");
preloader.innerHTML = '<div class="loader-wrapper"><div class="loader">Loading...</div></div>';
document.body.insertBefore(preloader, document.body.firstChild);

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    // Add 'loaded' class to the body, triggering the CSS to hide the loader
    document.body.classList.add("loaded");

    // Optionally, you could remove the preloader from the DOM after hiding it
    setTimeout(function() {
        preloader.remove();  // Clean up the preloader after it fades out
    }, 500);  // Match the CSS transition duration
});
