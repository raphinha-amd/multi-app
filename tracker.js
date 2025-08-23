// store activities to local storage
let activities = JSON.parse(localStorage.getItem("activities")) || [];

// fun save to local
const saveActivities = () => {
  localStorage.setItem("activities", JSON.stringify(activities));
};

// add new act
const addActivity = (text, type) => {
  const newAct = {
    text: text,
    type: type,
    doneDate: [],
  };
  activities.unshift(newAct);
  saveActivities();
  renderAct(); // refresh UI
};

// toggle done
const toggleAct = (i) => {
  const today = new Date().toISOString().split("T")[0];
  const act = activities[i];

  if (!act.doneDate.includes(today)) {
    act.doneDate.push(today);
  } else {
    act.doneDate = act.doneDate.filter((d) => d !== today);
  }

  saveActivities();
  renderAct(); // refresh UI
};

// delete acts
const delActivity = (i) => {
  activities.splice(i, 1);
  saveActivities();
  renderAct(); // biar tampilan langsung update
};

// add act lists
const renderAct = () => {
  const actList = document.getElementById("listActivities");
  actList.innerHTML = "";

  activities.forEach((act, i) => {
    const li = document.createElement("li");
    li.className = `list-group-item d-flex justify-content-between align-items-start`;

    const today = new Date().toISOString().split("T")[0];
    const isDoneToday = act.doneDate.includes(today);

    li.innerHTML = `
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" ${
          isDoneToday ? "checked" : ""
        }/>
      </div>
      <div class="ms-2 me-auto">
        <div class="fw-bold ${
          isDoneToday ? "text-decoration-line-through" : ""
        }">${act.text}</div>
        ${act.type}
        <span class="badge text-bg-primary rounded-pill ms-3">
          ${act.doneDate.length} activities
        </span>
      </div>
      <button class="btn btn-outline-danger btn-sm">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;

    li.querySelector("input").addEventListener("change", () => toggleAct(i));
    li.querySelector("button").addEventListener("click", () => delActivity(i));

    actList.appendChild(li);
  });
};

// event save activity → harus diluar renderAct()
document.getElementById("saveActivity").addEventListener("click", () => {
  const inputAct = document.getElementById("inputAct");
  const emptyInput = inputAct.value.trim();
  const actType = document.querySelector('input[name="actType"]:checked').value;

  if (emptyInput === "" || !actType) {
    alert("activity input and type should not be empty");
    return;
  }
  addActivity(emptyInput, actType);
  inputAct.value = "";
});

// pertama kali render
renderAct();
