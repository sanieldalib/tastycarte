$("#get-started-form").submit(function (event) {
  event.preventDefault();

  const form = document.forms[0];
  const formData = new FormData(form);
  const formContainer = document.getElementById("form-container");
  const formStatus = document.getElementById("status");

  formStatus.innerHTML = "";
  $("body").addClass("busy");

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    phone: formData.get("phone"),
    message: formData.get("message") || "None",
  };

  // Create the AJAX request
  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "https://f0e7rqetv5.execute-api.us-east-2.amazonaws.com/Prod/submitForm",
    true
  );
  xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  // Send the collected data as JSON
  xhr.send(JSON.stringify(data));

  xhr.onloadend = (response) => {
    $("body").removeClass("busy");
    if (response.target.status === 200) {
      form.reset();
      formStatus.innerHTML = `<div class="alert alert-success" role="alert" data-success-message>
          Thanks, a member of our team will be in touch shortly.
        </div>`;
    } else {
      alert(
        `An error occurred when submitting your request. (${response.target.status})`
      );
    }
  };
});
