$(document).ready(function() {
  // Function to update the selected date display
  function updateSelectedDate() {
    const selectedDay = $(".date__number--true").text();
    const selectedMonth = $(".month option:selected").attr("name");
    const selectedYear = $(".year option:selected").text();
    $(".choosen").text(selectedDay + '.' + selectedMonth + '.' + selectedYear);
  }

  // Event listener for clicking on date numbers
  $(".date__number").click(function() {
    $(".date__number").removeClass("date__number--true");
    $(this).addClass("date__number--true");
    updateSelectedDate(); // Update the selected date display
  });

  // Get the current date
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months start from 0
  const day = date.getDate();

  // Set the selected year and month in the dropdowns
  $(".year option").each(function() {
    if (Number($(this).text()) === year) {
      $(this).prop("selected", true);
    }
  });

  $(".month option").each(function() {
    if ($(this).attr("name") === String(month)) {
      $(this).prop("selected", true);
    }
  });

  // Set the initially selected date in the display
  updateSelectedDate();

  // Event listener for date container click
  $(".date").click(function() {
    // Update selected date when the container is clicked
    updateSelectedDate();
  });
});
