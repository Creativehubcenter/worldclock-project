const timezones = [
  "Europe/London",
  "America/New_York",
  "Asia/Tokyo",
  "Africa/Johannesburg",
  "Australia/Sydney"
];

function getUserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function populateTimezoneSelect() {
  const select = document.getElementById("timezoneSelect");
  const userTz = getUserTimezone();

  // Add user's timezone first
  const userOption = document.createElement("option");
  userOption.value = userTz;
  userOption.textContent = `Your Location (${userTz.replace(/_/g, ' ')})`;
  select.appendChild(userOption);

  // Add predefined timezones
  timezones.forEach(tz => {
    if (tz !== userTz) {
      const option = document.createElement("option");
      option.value = tz;
      option.textContent = tz.replace(/_/g, ' ');
      select.appendChild(option);
    }
  });
}

function addClock(timezone) {
  const clockDiv = document.createElement("div");
  clockDiv.className = "clock";
  clockDiv.setAttribute("data-tz", timezone);

  const cityDiv = document.createElement("div");
  cityDiv.className = "city";
  cityDiv.textContent = timezone.replace(/_/g, ' ');

  const timeDiv = document.createElement("div");
  timeDiv.className = "time";
  timeDiv.textContent = "Loading...";

  clockDiv.appendChild(cityDiv);
  clockDiv.appendChild(timeDiv);
  document.getElementById("clockGrid").appendChild(clockDiv);
}

function updateClocks() {
  const clocks = document.querySelectorAll(".clock");
  clocks.forEach(clock => {
    const tz = clock.getAttribute("data-tz");
    const timeDiv = clock.querySelector(".time");
    const now = new Date().toLocaleTimeString("en-US", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    timeDiv.textContent = now;
  });
}

document.getElementById("addClockBtn").addEventListener("click", () => {
  const selectedTz = document.getElementById("timezoneSelect").value;
  addClock(selectedTz);
});

populateTimezoneSelect();
setInterval(updateClocks, 1000);