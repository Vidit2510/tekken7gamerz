document.addEventListener("DOMContentLoaded", () => {
    const videos = [
        {
            title: "Real Cricket 20 mod apk 5.5|| real cricket 20 mod apk latest version",
            url: "https://www.youtube.com/embed/b4mlZKRwUpI"
        },
        {
            title: "Real Cricket 20 mod apk 5.1|| real cricket 20 mod apk latest version",
            url: "https://www.youtube.com/embed/SDLT2CTbOEw"
        },
        {
            title: "Real Cricket 20 mod apk 5.3|| real cricket 20 mod apk latest version",
            url: "https://www.youtube.com/embed/tEBEcj18BWs"
        },
        {
            title: "Download Real Cricket 20 (Mod, Unlimited Money) 3.7 free on android",
            url: "https://www.youtube.com/embed/cn7lpQTwO1U"
        },
        {
            title: "Unlock real cricket 20|| Unlock kitbag|| Tournaments|| and everything in real cricket 20",
            url: "https://www.youtube.com/embed/CxFZwRlMFlA"
        }
    ];

    const container = document.getElementById("videos-container");

    // Ensure videos only render once
    if (container.children.length === 0) {
        videos.forEach(video => {
            const videoItem = document.createElement("div");
            videoItem.className = "video-item";

            videoItem.innerHTML = `
        <h3>${video.title}</h3>
        <iframe width="560" height="315" src="${video.url}" frameborder="0" allowfullscreen></iframe>
      `;

            container.appendChild(videoItem);
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim(),
        };

        formStatus.textContent = "Sending...";
        formStatus.style.color = "#ffaa00";

        try {
            const response = await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                formStatus.textContent = "";
                form.reset();
                showPopup("Message sent successfully!", true);
            } else {
                throw new Error("Failed");
            }
        } catch (err) {
            showPopup("Something went wrong. Please try again.", false);
        }
    });

    function showPopup(message, success = true) {
        const popup = document.createElement("div");
        popup.className = `popup ${success ? "popup-success" : "popup-error"}`;
        popup.textContent = message;

        document.body.appendChild(popup);
        setTimeout(() => {
            popup.classList.add("show");
        }, 50);

        setTimeout(() => {
            popup.classList.remove("show");
            setTimeout(() => popup.remove(), 400);
        }, 4000);
    }
});
