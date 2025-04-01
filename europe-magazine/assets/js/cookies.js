document.addEventListener("DOMContentLoaded", function () {
    const banner = document.querySelector(".cmplz-cookiebanner");
    const acceptButton = document.querySelector(".cmplz-btn.cmplz-accept");
    const denyButton = document.querySelector(".cmplz-btn.cmplz-deny");

    if (document.cookie.includes("cookieBannerDismissed=true")) {
        banner.style.display = "none";
    }

    function dismissBanner() {
        banner.style.display = "none";
        document.cookie = "cookieBannerDismissed=true; path=/; max-age=" + 60 * 60 * 24;
    }

    acceptButton.addEventListener("click", dismissBanner);
    denyButton.addEventListener("click", dismissBanner);
});