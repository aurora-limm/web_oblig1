document.addEventListener('DOMContentLoaded', function() {
    const post_container = document.getElementById('post-container'); 
    let page = 1; 
    let is_loading = false; // Flag to prevent multiple simultaneous requests

    function load_posts() {
        if (is_loading) return; // Prevent loading if already in progress
        is_loading = true; 

        // Create a new request
        const xhr = new XMLHttpRequest();
        const url = `https://jsonplaceholder.typicode.com/photos?_page=${page}`;

        // Open a GET request
        xhr.open('GET', url, true);

        // Define what happens when the response is loaded
        xhr.onload = function() {
            if (xhr.status === 200) {
                const posts = JSON.parse(xhr.responseText); // Parse the JSON response

                // Iterate over each post and add it to the container
                posts.forEach(post => {
                    const post_element = document.createElement('div');
                    post_element.classList.add('post');
                    post_element.style.backgroundImage = `url(${post.url})`;

                    post_element.innerHTML = `
                        <h2>${post.title}</h2>
                    `;

                    post_container.appendChild(post_element); // Add each post to the container
                });

                // Increment page number for the next request
                page++;
                is_loading = false;

            } else {
                console.error('Error fetching posts');
                is_loading = false;
            }
        };

        // Error notice
        xhr.onerror = function() {
            console.error('Error fetching data from the API');
            is_loading = false;
        };

        xhr.send();
    }

    load_posts();

    // Load more posts when scrolled to the bottom
    window.addEventListener('scroll', function() {
        // Check if the user has scrolled near the bottom of the page
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
            load_posts(); 
        }
    });
});
