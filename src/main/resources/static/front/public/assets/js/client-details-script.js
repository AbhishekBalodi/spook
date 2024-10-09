// Function to initialize client profile page when document is ready
export function initializeClientProfilePage() {
    document.addEventListener('DOMContentLoaded', () => {
        companyGetClientProfileById();
    });
}

// Helper function to fetch data from the server
const fetchData = async (url, targetElementId) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.text();
        document.getElementById(targetElementId).innerHTML = data;
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
};

// Fetch client profile by client ID
export function companyGetClientProfileById() {
    const clientId = document.getElementById('companyIdForDetailsPage').value;
    const url = `/companyGetClientProfileById?companyId=${clientId}`;
    fetchData(url, 'companyClientDetailsPageRightDiv');
}

// Fetch client user profile list
export function companyGetClientUserProfile() {
    fetchData('/companyGetClientUserProfileList', 'companyClientDetailsPageRightDiv');
}

// Fetch client project list
export function companyGetClientProject() {
    fetchData('/companyGetClientProjectList', 'companyClientDetailsPageRightDiv');
}

// Fetch client task list
export function companyGetClientTask() {
    fetchData('/companyGetClientTaskList', 'companyClientDetailsPageRightDiv');
}
