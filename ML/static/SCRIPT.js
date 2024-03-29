document.addEventListener("DOMContentLoaded", function () {
    const urlForm = document.getElementById("url-form");
    const urlInput = document.getElementById("url-input");
    const safetyStatus = document.getElementById("safety-status");
    const scanDetails = document.getElementById("scan-details");
  
    urlForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const url = urlInput.value;
  
        // Make an AJAX request to check the URL and get the result.
        fetch("/check_url", {
            method: "POST",
            body: new URLSearchParams({ url }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((response) => response.json())
        .then((result) => {
            // Update the UI with safety status.
            if (result.positives === 0) {
                safetyStatus.textContent = "Safe";
                safetyStatus.style.color = "green";
            } else {
                safetyStatus.textContent = "Unsafe";
                safetyStatus.style.color = "red";
            }
  
            // Update the UI with scan details.
            scanDetails.innerHTML = "";
            for (const scan in result.scans) {
                const listItem = document.createElement("li");
                listItem.textContent = `${scan}: ${result.scans[scan].result}`;
                scanDetails.appendChild(listItem);
            }
        })
        .catch((error) => {
            console.error(error);
            safetyStatus.textContent = "Error occurred during the check.";
            safetyStatus.style.color = "red";
            scanDetails.innerHTML = "";
        });
    });
  });
  