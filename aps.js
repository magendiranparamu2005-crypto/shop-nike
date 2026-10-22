
document.addEventListener("DOMContentLoaded", function () {

    // MOBILE HAMBURGER MENU
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navMenu.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close the menu when a navigation link is selected
        navMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });
        });

        // Close the menu when switching to desktop width
        window.addEventListener("resize", function () {
            if (window.innerWidth > 760) {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // LIVE PRODUCT SEARCH
    const searchInput = document.getElementById("productSearch");
    const clearButton = document.getElementById("clearSearch");
    const resetButton = document.getElementById("resetSearch");
    const searchMessage = document.getElementById("searchMessage");
    const noResults = document.getElementById("noResults");

    const productCards = Array.from(
        document.querySelectorAll("#products .product-card")
    );

    function searchProducts() {
        const query = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        productCards.forEach(function (card) {
            const name =
                card.querySelector("h3")?.textContent.toLowerCase() || "";

            const description =
                card.querySelector(".product-info p")
                    ?.textContent.toLowerCase() || "";

            const category =
                card.querySelector(".product-number")
                    ?.textContent.toLowerCase() || "";

            const searchText = name + " " + description + " " + category;
            const matches = searchText.includes(query);

            card.hidden = !matches;

            if (matches) {
                visibleCount++;
            }
        });

        if (noResults) {
            noResults.hidden = query === "" || visibleCount > 0;
        }

        if (query === "") {
            searchMessage.textContent = "Explore our featured products.";
        } else if (visibleCount === 0) {
            searchMessage.textContent =
                `No products found for "${searchInput.value}".`;
        } else {
            searchMessage.textContent =
                `${visibleCount} product${visibleCount === 1 ? "" : "s"} found.`;
        }
    }

    if (searchInput && clearButton && searchMessage) {
        searchInput.addEventListener("input", searchProducts);

        clearButton.addEventListener("click", function () {
            searchInput.value = "";
            searchProducts();
            searchInput.focus();
        });

        if (resetButton) {
            resetButton.addEventListener("click", function () {
                searchInput.value = "";
                searchProducts();
                searchInput.focus();
            });
        }
    }

    // SIGNUP FORM DEMO
    const signupForm = document.getElementById("signup");
    const emailInput = document.getElementById("email");
    const formMessage = document.getElementById("formMessage");

    if (signupForm && emailInput && formMessage) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = emailInput.value.trim();

            if (!emailInput.checkValidity()) {
                emailInput.reportValidity();
                return;
            }

            formMessage.textContent =
                `Thanks! ${email} was entered successfully for this demo.`;

            signupForm.reset();
        });
    }

});
