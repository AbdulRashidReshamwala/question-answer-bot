let model = null;

$(document).ready(function () {
  $("#load-btn").click(async function () {
    $(this).prop("disabled", true);
    $(this).html(
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`
    );
    model = await qna.load();
    console.log("model Loaded");
    $(this).css("display", "none");
    $("#question-btn").css("display", "inline");
  });

  $("#question-btn").click(async function () {
    const data = $.trim($("#text").val());
    const question = $.trim($("#question").val());
    document.getElementById("ans").innerHTML = "";
    if (data === "") {
      alert("Enter Text in the text area");
    }
    if (question === "") {
      alert("Enter text in question box");
    } else {
      const answers = await model.findAnswers(question, data);
      if (answers === []) {
        alert("No answers found");
      } else {
        answers.forEach((a) => {
          const node = document.createElement("tr");
          const ar = document.createElement("td");
          const pr = document.createElement("td");
          ar.textContent = a.text;
          pr.textContent = a.score;
          node.appendChild(ar);
          node.appendChild(pr);
          document.getElementById("ans").appendChild(node);
        });
        $("#temp").css("display", "block");
      }
    }
  });
});
