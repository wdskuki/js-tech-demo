function toggleTooltip() {
  var tooltip = document.getElementById("tooltip");
  if (tooltip.style.display === "none" || tooltip.style.display === "") {
      tooltip.style.display = "block";
  } else {
      tooltip.style.display = "none";
  }
}

// Optional: Hide tooltip when clicking outside of it
document.addEventListener('click', function(event) {
  var tooltip = document.getElementById("tooltip");
  var icon = document.querySelector('.tooltip-icon');
  if (!icon.contains(event.target) && !tooltip.contains(event.target)) {
      tooltip.style.display = 'none';
  }
});
