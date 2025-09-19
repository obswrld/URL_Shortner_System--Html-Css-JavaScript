document.addEventListener("DOMContentLoaded", ()=>{

    const form = document.getElementById("shorten-form");
    const input = document.getElementById("original-url");
    const resultDiv = document.getElementById("short-url-result");


    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const originalUrl = input.value.trim();
        if(!originalUrl || !originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")){
            showMessage("Please enter a valid URL (must start with http:// or http://)", true);
            return;
        }

        try{
            const response = await fetch("http://127.0.0.1:5000/shorten", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({original_url: originalUrl}),
            });

            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || "Failed to shorten URL");
            }

            showMessage(`Shortened URL: <a href="${data.shortened_url}" target="_blank">${data.shortened_url}</a>`)
            input.value = "";
        }   catch (error) {
            showMessage(`${error.message}`, true);
        }
    });

    function showMessage(message, isError = false) {
        resultDiv.innerHTML = message;
        resultDiv.style.color = isError ? "red": "green";
    }
});