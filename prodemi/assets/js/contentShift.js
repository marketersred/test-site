document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  const articles = document.querySelectorAll(".article-box");

  links.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const targetId = link.getAttribute("data-target");

      articles.forEach(article => article.classList.remove("active"));

      const targetArticle = document.getElementById(targetId);
      if (targetArticle) {
        targetArticle.classList.add("active");
      }
    });
  });
});    