document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll("button[id^='question']");

  questions.forEach((question) => {
    question.addEventListener("click", function () {
      const questionId = this.id;
      const answerId = `answer${questionId.replace('question', '')}`;
      const arrowId = `arrow${questionId.replace('question', '')}`;

      const answerElement = document.getElementById(answerId);
      const arrowElement = document.getElementById(arrowId);

      const isClosed = this.getAttribute("data-state") === "closed";

      questions.forEach((q) => {
        const currentAnswerId = `answer${q.id.replace('question', '')}`;
        const currentArrowId = `arrow${q.id.replace('question', '')}`;

        document.getElementById(currentAnswerId).style.display = "none";
        document.getElementById(currentArrowId).style.transform = "rotate(0deg)";
        q.setAttribute("data-state", "closed");
      });

      if (isClosed) {
        answerElement.style.display = "block";
        arrowElement.style.transform = "rotate(180deg)";
        this.setAttribute("data-state", "open");
      }
    });
  });
});
