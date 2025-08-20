const input = document.getElementById("input");
const btnAdd = document.getElementById("btnAdd");
const listTask = document.getElementById("listTask");

let todo = JSON.parse(localStorage.getItem("todo")) || [];

const save = () => {
  listTask.innerHTML = "";
  todo.forEach((t, i) => {
    const li = document.createElement("li");
    li.className = `list-group-item d-flex justify-content-between align-items-start`;
    li.innerHTML = `<input type="checkbox" class="form-check-input me-2" ${
      t.done ? "checked" : ""
    }>
        <div class="ms-2 me-auto">
          <div class="fw-bolder ${
            t.done ? "text-decoration-line-through" : ""
          }">${t.text}</div>
          <small class="fw-lighter">${t.date}</small>
        </div>
        <button class="btn btn-outline-danger btn-sm"><i class="fa-solid fa-trash-can"></i></button>`;

    li.querySelector("input").addEventListener("change", () => {
      todo[i].done = !todo[i].done;
      saveTask();
    });

    li.querySelector("button").addEventListener("click", () => {
      todo.splice(i, 1);
      saveTask();
    });
    listTask.appendChild(li);
  });
};
const saveTask = () => {
  localStorage.setItem("todo", JSON.stringify(todo));
  save();
};

btnAdd.addEventListener("click", () => {
  if (input.value.trim() === "") return;
  const newTask = {
    text: input.value,
    date: new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    done: false,
  };
  todo.unshift(newTask);
  input.value = "";
  saveTask();
});
save();
