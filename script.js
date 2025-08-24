window.addEventListener("DOMContentLoaded", () => {
  let size = localStorage.length;
  let i = 1;
  let n = null;
  let count = 0;
  while (count < size) {
    let data = localStorage.getItem(i);
    if (data) {
      createuitasks(data, i);
      console.log(data);
      count++;
    }
    else {
      
    }

    i++;
  }
  if (size === 0) {
    const btndiv = document.querySelector(".btndiv");
    btndiv.style.display = "none";
  }
})


// Elements पकड़ लो
const input = document.getElementById("input");
const addBtn = document.getElementById("button");
const entertask = document.querySelector(".tasks");
const card = document.querySelector(".card");
const btndiv = document.querySelector(".btndiv");


function addtask() {

  btndiv.style.display = "block";

  const tasktext = input.value.trim();
  let key = Number(localStorage.length);
  key++;

  if (tasktext === "") return;

  localStorage.setItem(key, tasktext);

  createuitasks(tasktext, key);

  input.value = '';
}

function createuitasks(tasktext, key) {
  const taskdiv = document.createElement("div");
  taskdiv.setAttribute("data-key", key);
  taskdiv.classList.add("tasklist");

  const headingdiv = document.createElement("div");
  headingdiv.classList.add("heading");
  const p = document.createElement("p");

  p.textContent = tasktext;
  headingdiv.appendChild(p);

  const btn = document.createElement("div");
  btn.classList.add("btn");

  const btn1 = document.createElement("button");
  btn1.classList.add("button", "completebtn");
  btn1.textContent = "✅";

  btn1.addEventListener("click", () => {
    const parentele = btn1.parentElement;
    const mainEle = parentele.parentElement;
    mainEle.style.backgroundColor = "green";
  })

  const btn2 = document.createElement("button");
  btn2.classList.add("button", "endbtn");
  btn2.textContent = "❌";

  btn2.addEventListener("click", () => {
    const parentele = btn2.parentElement;
    const mainEle = parentele.parentElement;
    mainEle.remove();
    const key = taskdiv.getAttribute("data-key");
    localStorage.removeItem(key);

    const size = localStorage.length;
    if (size === 0) {
      btndiv.style.display = "none";
    }

  })

  btn.appendChild(btn1);
  btn.appendChild(btn2);

  taskdiv.appendChild(headingdiv);
  taskdiv.appendChild(btn);

  entertask.insertAdjacentElement("afterbegin", taskdiv);
}



// जब Add button दबे

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addtask();
  }
});

addBtn.addEventListener("click", () => { addtask() });

btndiv.addEventListener("click", () => {
  localStorage.clear();
  entertask.innerHTML = `<div class="btndiv"><button class="clearallbtn">Clear All</button></div>`;
  let size = localStorage.length;

  if (size === 0) {
    const btndiv = document.querySelector(".btndiv");
    btndiv.style.display = "none";
  }
});